import { useState } from 'react'
import { Icon } from '../../../components/common/icon'
import type { Artist } from '../../../types'
import {
  ArtistCard,
  ArtistEmptyState,
  ArtistGridWrap,
  ArtistName,
  ArtistPhoto,
  ArtistPhotoWrap,
  CheckBadge,
} from '../styles'

const AVATAR_COLORS = ['#A78BFA', '#F0A6B8', '#8B8BFA', '#D9A6E0', '#7ED6A5', '#F6C9C0']

function ArtistAvatar({ artist, color, selected }: { artist: Artist; color: string; selected: boolean }) {
  const [imgError, setImgError] = useState(false)

  return (
    <ArtistPhoto $bg={color} $selected={selected}>
      {!imgError ? (
        <img src={artist.photoUrl} alt={artist.name} onError={() => setImgError(true)} />
      ) : (
        artist.name.charAt(0)
      )}
    </ArtistPhoto>
  )
}

interface ArtistGridProps {
  artists: Artist[]
  selectedIds: string[]
  onToggle: (id: string) => void
}

export function ArtistGrid({ artists, selectedIds, onToggle }: ArtistGridProps) {
  if (artists.length === 0) {
    return (
      <ArtistGridWrap>
        <ArtistEmptyState>검색 결과가 없어요.</ArtistEmptyState>
      </ArtistGridWrap>
    )
  }

  return (
    <ArtistGridWrap>
      {artists.map((artist, idx) => {
        const isSelected = selectedIds.includes(artist.id)
        const color = AVATAR_COLORS[idx % AVATAR_COLORS.length]
        return (
          <ArtistCard key={artist.id} type="button" onClick={() => onToggle(artist.id)}>
            <ArtistPhotoWrap>
              <ArtistAvatar artist={artist} color={color} selected={isSelected} />
              <CheckBadge $selected={isSelected}>
                <Icon name="check" strokeWidth={3} size={12} />
              </CheckBadge>
            </ArtistPhotoWrap>
            <ArtistName>{artist.name}</ArtistName>
          </ArtistCard>
        )
      })}
    </ArtistGridWrap>
  )
}
