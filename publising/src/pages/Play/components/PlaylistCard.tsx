import { Icon, ICONS } from '../../../components/common/icon'
import type { Playlist } from '../../../types'
import {
  AvatarDot,
  AvatarStack,
  FooterActions,
  LikeBadge,
  PlaylistBody,
  PlaylistCardTitle,
  PlaylistCardWrap,
  PlaylistCover,
  PlaylistCoverImg,
  PlaylistFooter,
  PlaylistTagline,
  SaveBtn,
  ShareBtn,
} from '../styles'

interface PlaylistCardProps {
  playlist: Playlist
  saved: boolean
  onToggleSave: (id: string) => void
}

export function PlaylistCard({ playlist, saved, onToggleSave }: PlaylistCardProps) {
  return (
    <PlaylistCardWrap>
      <PlaylistCover $gradient={playlist.coverGradient}>
        {playlist.coverImageUrl && <PlaylistCoverImg src={playlist.coverImageUrl} alt={playlist.title} />}
        <LikeBadge
          dangerouslySetInnerHTML={{
            __html: `<svg viewBox="0 0 24 24">${ICONS.heart.markup}</svg><span>${playlist.likeCount}</span>`,
          }}
        />
      </PlaylistCover>
      <PlaylistBody>
        <PlaylistCardTitle $color={playlist.accentColor}>{playlist.title}</PlaylistCardTitle>
        <PlaylistTagline>{playlist.tagline}</PlaylistTagline>
        <PlaylistFooter>
          <AvatarStack>
            {playlist.collaboratorPhotos && playlist.collaboratorPhotos.length > 0
              ? playlist.collaboratorPhotos.map((url, i) => (
                  <AvatarDot key={i}>
                    <img src={url} alt="" />
                  </AvatarDot>
                ))
              : playlist.collaboratorColors.map((color, i) => (
                  <AvatarDot key={i} style={{ background: color }} />
                ))}
          </AvatarStack>
          <FooterActions>
            <ShareBtn type="button" aria-label="공유">
              <Icon name="share" size={16} />
            </ShareBtn>
            <SaveBtn
              type="button"
              $bg={playlist.buttonBg}
              $saved={saved}
              onClick={() => onToggleSave(playlist.id)}
            >
              {saved ? '담김' : '담기'}
            </SaveBtn>
          </FooterActions>
        </PlaylistFooter>
      </PlaylistBody>
    </PlaylistCardWrap>
  )
}
