// org/play.html + play.js 이식 (나의 공연 보관함)
import { AppShell } from '../../components/layout/AppShell'
import { LogoHeader } from '../../components/layout/LogoHeader'
import { Footer } from '../../components/layout/Footer'
import { Icon } from '../../components/common/icon'
import { useNoliData } from '../../hooks/useNoliData'
import { PlaylistCard } from './components/PlaylistCard'
import { RecentScroll } from './components/RecentScroll'
import {
  FabAdd,
  MoreLink,
  PlayPageWrap,
  PlayTitle,
  PlaylistList,
  RecentEmptyState,
  RecentSection,
  SectionHeader,
} from './styles'

export function PlayPage() {
  const { getPlaylists, getRecentlyViewed, isPlaylistSaved, togglePlaylistSaved, createPlaylist } = useNoliData()
  const recentlyViewed = getRecentlyViewed()

  function handleCreatePlaylist() {
    const title = window.prompt('새 플레이리스트 이름을 입력해주세요')
    if (title && title.trim()) {
      createPlaylist(title)
    }
  }

  return (
    <AppShell>
      <PlayPageWrap>
        <LogoHeader left="hamburger" right="bell" onRightClick={() => {}} onLeftClick={() => {}} />

        <PlayTitle>
          <h2>나의 공연 보관함</h2>
          <p>소중한 추억과 보고 싶은 무대들을 모았어요 ✨</p>
        </PlayTitle>

        <PlaylistList>
          {getPlaylists().map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              playlist={playlist}
              saved={isPlaylistSaved(playlist.id)}
              onToggleSave={togglePlaylistSaved}
            />
          ))}
        </PlaylistList>

        <RecentSection>
          <SectionHeader>
            <h3>최근 본 공연 🎨</h3>
            <MoreLink href="#">모두 보기</MoreLink>
          </SectionHeader>
          {recentlyViewed.length > 0 ? (
            <RecentScroll items={recentlyViewed} />
          ) : (
            <RecentEmptyState>아직 본 공연이 없어요. 공연 상세 페이지를 둘러보면 여기에 기록돼요.</RecentEmptyState>
          )}
          <FabAdd type="button" aria-label="새 플레이리스트 만들기" onClick={handleCreatePlaylist}>
            <Icon name="plus" strokeWidth={2.4} />
          </FabAdd>
        </RecentSection>

        <Footer />
      </PlayPageWrap>
    </AppShell>
  )
}
