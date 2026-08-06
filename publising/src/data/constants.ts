// add.html/artist.html에서 사용하는 정적 선택 옵션 (localStorage와 무관한 고정 데이터)
import type { Artist, GenreOption, MoodKey } from '../types'

export const GENRE_OPTIONS: GenreOption[] = [
  { key: '콘서트', icon: '🎤', color: 'purple' },
  { key: '뮤지컬', icon: '🎭', color: 'pink' },
  { key: '밴드', icon: '💿', color: 'tan' },
  { key: '댄스', icon: '🕺', color: 'purple' },
  { key: '클래식', icon: '🎵', color: 'tan' },
]

export const MOOD_OPTIONS: MoodKey[] = [
  '에너지 넘치는',
  '감성적인',
  '유쾌한',
  '몰입되는',
  '잔잔한',
  '웅장한',
  '로맨틱한',
  '몽환적인',
  '힐링되는',
  '트렌디한',
]

// complete.html의 TASTE ANALYSIS 해시태그 매핑
export const MOOD_TAG_MAP: Record<string, string> = {
  '에너지 넘치는': '#에너지충만',
  감성적인: '#감성적인',
  유쾌한: '#유쾌한',
  몰입되는: '#몰입감최고',
  잔잔한: '#잔잔한감성',
  웅장한: '#웅장함',
  로맨틱한: '#로맨틱',
  몽환적인: '#몽환적인',
  힐링되는: '#힐링타임',
  트렌디한: '#트렌디',
}

export const GENRE_TAG_MAP: Record<string, string> = {
  콘서트: '#라이브공연',
  뮤지컬: '#뮤지컬덕후',
  밴드: '#밴드홀릭',
  댄스: '#댄스러버',
  클래식: '#클래식애호가',
}

export const DEFAULT_TASTE_TAGS = ['#감성적인', '#뮤지컬덕후', '#라이브공연']

// artist.html에서 사용하는 관심 아티스트 후보 목록
export const ARTISTS: Artist[] = [
  { id: 'artist_001', name: '조승우', photoUrl: 'assets/images/artists/josw.jpg' },
  { id: 'artist_002', name: '홍광호', photoUrl: 'assets/images/artists/honggh.jpg' },
  { id: 'artist_003', name: '박지연', photoUrl: 'assets/images/artists/parkjy.jpg' },
  { id: 'artist_004', name: '김준수', photoUrl: 'assets/images/artists/kimjs.jpg' },
  { id: 'artist_005', name: '옥주현', photoUrl: 'assets/images/artists/okjh.jpg' },
  { id: 'artist_006', name: '정선아', photoUrl: 'assets/images/artists/jungsa.jpg' },
]
