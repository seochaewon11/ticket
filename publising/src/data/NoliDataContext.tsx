// org/data.js의 localStorage 연동 데이터 레이어를 Context + Provider로 이식
import { createContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type {
  AlertReminders,
  AppData,
  ArtistRankingItem,
  CalendarEventDate,
  GenreDistributionItem,
  MemoryPerformance,
  Performance,
  Playlist,
  RecentlyViewed,
  TasteDashboard,
  TicketOpenAlert,
  UpcomingPerformance,
  UserPreference,
  ViewingTrend,
} from '../types'
import { DEFAULT_TASTE_TAGS, GENRE_TAG_MAP, MOOD_TAG_MAP } from './constants'
import {
  CALENDAR_EVENT_DATES,
  DEFAULT_DATA,
  GENRE_DISTRIBUTION,
  MEMORY_PERFORMANCES,
  TASTE_DASHBOARD,
  TICKET_OPEN_ALERTS,
  TOP_ARTISTS_RANKING,
  UPCOMING_PERFORMANCES,
  VIEWING_TREND,
} from './mockData'

// 새 플레이리스트에 순환 적용할 강조색 팔레트
const NEW_PLAYLIST_COLORS = [
  { accentColor: '#5B3E9E', buttonBg: '#7C5CFC' },
  { accentColor: '#8B4A1F', buttonBg: '#7A4B2A' },
  { accentColor: '#3A3A45', buttonBg: '#3A3A45' },
]

const MAX_RECENTLY_VIEWED = 10

// v3: posterUrl 등 이미지 경로를 절대경로(/img/...)로 바꾸면서 이전 캐시를 무효화
const STORAGE_KEY = 'noli_app_data_v3'

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}

function loadFromStorage(): AppData | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as AppData
  } catch (e) {
    console.warn('[NOLI data] localStorage 읽기 실패:', e)
    return null
  }
}

// 이전 버전 저장 데이터에 새 필드가 없을 경우를 대비한 방어적 병합 (원본 init()과 동일한 로직)
function withDefensiveMerge(stored: AppData | null): AppData {
  const state: AppData = stored ? clone(stored) : clone(DEFAULT_DATA)

  if (!state.baseCounts) state.baseCounts = clone(DEFAULT_DATA.baseCounts)
  if (!state.savedPlaylistIds) state.savedPlaylistIds = []
  if (!state.userPreference) state.userPreference = clone(DEFAULT_DATA.userPreference)
  if (!state.user) state.user = clone(DEFAULT_DATA.user)
  ;(Object.keys(DEFAULT_DATA.user) as (keyof AppData['user'])[]).forEach((key) => {
    if (state.user[key] === undefined) {
      // @ts-expect-error DEFAULT_DATA.user[key]의 타입이 key별로 달라 일괄 대입 시 좁혀지지 않음
      state.user[key] = clone(DEFAULT_DATA.user[key])
    }
  })
  if (!state.user.avatarUrl) state.user.avatarUrl = DEFAULT_DATA.user.avatarUrl
  if (!state.alertReminders) state.alertReminders = {}
  if (!state.playlists) state.playlists = clone(DEFAULT_DATA.playlists)
  if (!state.recentlyViewedIds) state.recentlyViewedIds = []

  // 저장된 공연 데이터에 상세 화면용 신규 필드(synopsis, cast 등)가 없으면 최신 기본값으로 보강
  state.performances = (state.performances || []).map((p) => {
    const def = DEFAULT_DATA.performances.find((d) => d.id === p.id)
    if (!def) return p
    const merged = { ...p }
    ;(Object.keys(def) as (keyof Performance)[]).forEach((key) => {
      if (merged[key] === undefined) {
        // @ts-expect-error Performance 필드별 타입이 달라 일괄 대입 시 좁혀지지 않음
        merged[key] = clone(def[key])
      }
    })
    return merged
  })

  return state
}

function recalculateMatchRates(performances: Performance[], preference: UserPreference): Performance[] {
  const genres = preference.favoriteGenres || []
  const moods = preference.favoriteMoods || []
  if (genres.length === 0 && moods.length === 0) return performances // 취향 미설정 시 기존 matchRate 유지

  return performances.map((p) => {
    let score = 45 // 기본 하한선
    if (genres.indexOf(p.genre) !== -1) score += 40
    const overlap = p.mood.filter((m) => moods.indexOf(m) !== -1).length
    score += Math.min(overlap, 3) * 13
    return { ...p, matchRate: Math.max(45, Math.min(99, score)) }
  })
}

export interface NoliDataValue {
  // ---- 상태 (localStorage 연동) ----
  user: AppData['user']
  performances: Performance[]
  userPreference: UserPreference
  wishCount: number
  watchedCount: number

  // ---- 조회 ----
  getPerformanceById: (id: string) => Performance | null
  getRecommendedPerformances: () => Performance[]
  getPlaylists: () => Playlist[]
  getRecentlyViewed: () => RecentlyViewed[]
  isPlaylistSaved: (playlistId: string) => boolean
  getCalendarEventDates: () => CalendarEventDate[]
  getTicketOpenAlerts: () => TicketOpenAlert[]
  getUpcomingPerformances: () => UpcomingPerformance[]
  getAlertById: (alertId: string) => TicketOpenAlert | null
  getAlertWithReminderState: (alertId: string) => TicketOpenAlert | null
  getViewingTrend: () => ViewingTrend
  getGenreDistribution: () => GenreDistributionItem[]
  getTopArtistsRanking: () => ArtistRankingItem[]
  getTasteDashboard: () => TasteDashboard
  getMemoryPerformances: () => MemoryPerformance[]

  // ---- 액션 ----
  toggleLike: (id: string) => void
  addToWishlist: (id: string) => void
  markAsWatched: (id: string) => void
  updatePreference: (favoriteGenres: string[], favoriteMoods: string[]) => void
  updateFavoriteArtists: (artistIds: string[]) => void
  generateTasteTags: () => string[]
  togglePlaylistSaved: (playlistId: string) => void
  toggleAlertReminder: (alertId: string, optionKey: string) => void
  createPlaylist: (title: string) => void
  recordView: (performanceId: string) => void
}

// eslint-disable-next-line react-refresh/only-export-components
export const NoliDataContext = createContext<NoliDataValue | null>(null)

export function NoliDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData>(() => withDefensiveMerge(loadFromStorage()))

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch (e) {
      console.warn('[NOLI data] localStorage 저장 실패:', e)
    }
  }, [data])

  const value = useMemo<NoliDataValue>(() => {
    const wishCount = data.baseCounts.wish + data.performances.filter((p) => p.status === 'wish').length
    const watchedCount =
      data.baseCounts.watched + data.performances.filter((p) => p.status === 'watched').length

    return {
      user: data.user,
      performances: data.performances,
      userPreference: data.userPreference,
      wishCount,
      watchedCount,

      getPerformanceById: (id) => data.performances.find((p) => p.id === id) || null,
      getRecommendedPerformances: () => [...data.performances].sort((a, b) => b.matchRate - a.matchRate),
      getPlaylists: () => data.playlists,
      getRecentlyViewed: () =>
        data.recentlyViewedIds
          .map((id) => data.performances.find((p) => p.id === id))
          .filter((p): p is Performance => !!p)
          .map((p) => ({ id: p.id, title: p.title, venue: p.venue, posterUrl: p.posterUrl })),
      isPlaylistSaved: (playlistId) => data.savedPlaylistIds.indexOf(playlistId) !== -1,
      getCalendarEventDates: () => CALENDAR_EVENT_DATES,
      getTicketOpenAlerts: () => TICKET_OPEN_ALERTS,
      getUpcomingPerformances: () => UPCOMING_PERFORMANCES,
      getAlertById: (alertId) => TICKET_OPEN_ALERTS.find((a) => a.id === alertId) || null,
      getAlertWithReminderState: (alertId) => {
        const base = TICKET_OPEN_ALERTS.find((a) => a.id === alertId)
        if (!base) return null
        const saved = data.alertReminders[alertId] || {}
        return {
          ...base,
          reminderOptions: base.reminderOptions.map((opt) => ({
            key: opt.key,
            label: opt.label,
            enabled: Object.prototype.hasOwnProperty.call(saved, opt.key) ? saved[opt.key] : opt.enabled,
          })),
        }
      },
      getViewingTrend: () => VIEWING_TREND,
      getGenreDistribution: () => GENRE_DISTRIBUTION,
      getTopArtistsRanking: () => TOP_ARTISTS_RANKING,
      getTasteDashboard: () => TASTE_DASHBOARD,
      getMemoryPerformances: () => MEMORY_PERFORMANCES,

      toggleLike: (id) => {
        setData((prev) => ({
          ...prev,
          performances: prev.performances.map((p) => (p.id === id ? { ...p, liked: !p.liked } : p)),
        }))
      },
      addToWishlist: (id) => {
        setData((prev) => ({
          ...prev,
          performances: prev.performances.map((p) => (p.id === id ? { ...p, status: 'wish' } : p)),
        }))
      },
      markAsWatched: (id) => {
        setData((prev) => ({
          ...prev,
          performances: prev.performances.map((p) => (p.id === id ? { ...p, status: 'watched' } : p)),
        }))
      },
      updatePreference: (favoriteGenres, favoriteMoods) => {
        setData((prev) => {
          const userPreference: UserPreference = {
            favoriteGenres: favoriteGenres || [],
            favoriteMoods: favoriteMoods || [],
            favoriteArtistIds: prev.userPreference.favoriteArtistIds || [],
            updatedAt: new Date().toISOString(),
          }
          return {
            ...prev,
            userPreference,
            performances: recalculateMatchRates(prev.performances, userPreference),
          }
        })
      },
      updateFavoriteArtists: (artistIds) => {
        setData((prev) => ({
          ...prev,
          userPreference: { ...prev.userPreference, favoriteArtistIds: artistIds || [] },
        }))
      },
      generateTasteTags: () => {
        const pref = data.userPreference
        const tags: string[] = []

        ;(pref.favoriteMoods || []).forEach((m) => {
          const tag = MOOD_TAG_MAP[m]
          if (tag && tags.indexOf(tag) === -1) tags.push(tag)
        })
        ;(pref.favoriteGenres || []).forEach((g) => {
          const tag = GENRE_TAG_MAP[g]
          if (tag && tags.indexOf(tag) === -1) tags.push(tag)
        })

        let i = 0
        while (tags.length < 3 && i < DEFAULT_TASTE_TAGS.length) {
          if (tags.indexOf(DEFAULT_TASTE_TAGS[i]) === -1) tags.push(DEFAULT_TASTE_TAGS[i])
          i += 1
        }
        const finalTags = tags.slice(0, 3)
        finalTags.push('#취향저격') // 항상 마지막에 붙는 고정 태그
        return finalTags
      },
      togglePlaylistSaved: (playlistId) => {
        setData((prev) => {
          const idx = prev.savedPlaylistIds.indexOf(playlistId)
          const savedPlaylistIds =
            idx === -1
              ? [...prev.savedPlaylistIds, playlistId]
              : prev.savedPlaylistIds.filter((id) => id !== playlistId)
          return { ...prev, savedPlaylistIds }
        })
      },
      createPlaylist: (title) => {
        const trimmed = title.trim()
        if (!trimmed) return
        setData((prev) => {
          const palette = NEW_PLAYLIST_COLORS[prev.playlists.length % NEW_PLAYLIST_COLORS.length]
          const newPlaylist: Playlist = {
            id: `playlist_${Date.now()}`,
            title: trimmed,
            tagline: '"방금 만든 나만의 플레이리스트!"',
            likeCount: 0,
            accentColor: palette.accentColor,
            buttonBg: palette.buttonBg,
            coverImageUrl: '',
            collaboratorPhotos: [],
            collaboratorColors: [],
            coverGradient: 'linear-gradient(160deg, #2A2140 0%, #7C5CFC 60%, #F7F0EC 100%)',
          }
          return { ...prev, playlists: [...prev.playlists, newPlaylist] }
        })
      },
      recordView: (performanceId) => {
        setData((prev) => {
          const withoutCurrent = prev.recentlyViewedIds.filter((id) => id !== performanceId)
          const recentlyViewedIds = [performanceId, ...withoutCurrent].slice(0, MAX_RECENTLY_VIEWED)
          return { ...prev, recentlyViewedIds }
        })
      },
      toggleAlertReminder: (alertId, optionKey) => {
        setData((prev) => {
          const base = TICKET_OPEN_ALERTS.find((a) => a.id === alertId)
          if (!base) return prev
          const savedForAlert = prev.alertReminders[alertId] || {}
          const baseOption = base.reminderOptions.find((o) => o.key === optionKey)
          const currentValue = Object.prototype.hasOwnProperty.call(savedForAlert, optionKey)
            ? savedForAlert[optionKey]
            : baseOption
              ? baseOption.enabled
              : false

          const alertReminders: AlertReminders = {
            ...prev.alertReminders,
            [alertId]: { ...savedForAlert, [optionKey]: !currentValue },
          }
          return { ...prev, alertReminders }
        })
      },
    }
  }, [data])

  return <NoliDataContext.Provider value={value}>{children}</NoliDataContext.Provider>
}
