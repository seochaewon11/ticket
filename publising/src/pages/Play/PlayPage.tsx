// org/play.html + play.js 이식 (나의 공연 보관함)
import { AppShell } from '../../components/layout/AppShell'
import { LogoHeader } from '../../components/layout/LogoHeader'
import { Footer } from '../../components/layout/Footer'
import { Icon } from '../../components/common/icon'
import { useNoliData } from '../../hooks/useNoliData'
import { PlaylistCard } from './components/PlaylistCard'
import { FabAdd, PlayPageWrap, PlayTitle, PlaylistList } from './styles'

export function PlayPage() {
  const { getPlaylists, isPlaylistSaved, togglePlaylistSaved, createPlaylist } = useNoliData()

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

        <FabAdd type="button" aria-label="새 플레이리스트 만들기" onClick={handleCreatePlaylist}>
          <Icon name="plus" strokeWidth={2.4} />
        </FabAdd>

        <Footer />
      </PlayPageWrap>
    </AppShell>
  )
}
