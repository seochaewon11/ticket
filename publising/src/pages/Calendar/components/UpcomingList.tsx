import { useState } from 'react'
import { Icon } from '../../../components/common/icon'
import type { UpcomingPerformance } from '../../../types'
import {
  GenreTag,
  UpcomingCard,
  UpcomingDate,
  UpcomingMetaRow,
  UpcomingThumb,
  UpcomingTitle,
  UpcomingVenue,
} from '../styles'

const GENRE_TAG_VARIANT: Record<string, 'classic' | 'indie'> = {
  클래식: 'classic',
  인디: 'indie',
}

function UpcomingThumbImg({ upcoming }: { upcoming: UpcomingPerformance }) {
  const [imgError, setImgError] = useState(false)

  return (
    <UpcomingThumb
      style={imgError ? { background: 'linear-gradient(160deg, #2A2140 0%, #7C5CFC 60%, #F7F0EC 100%)' } : undefined}
    >
      {!imgError && (
        <img src={upcoming.posterUrl} alt={upcoming.title} onError={() => setImgError(true)} />
      )}
    </UpcomingThumb>
  )
}

export function UpcomingList({ list }: { list: UpcomingPerformance[] }) {
  return (
    <>
      {list.map((u) => (
        <UpcomingCard key={u.id}>
          <UpcomingThumbImg upcoming={u} />
          <div>
            <UpcomingMetaRow>
              <GenreTag $variant={GENRE_TAG_VARIANT[u.genreTag] || 'classic'}>{u.genreTag}</GenreTag>
              <UpcomingDate>{u.dateText}</UpcomingDate>
            </UpcomingMetaRow>
            <UpcomingTitle>{u.title}</UpcomingTitle>
            <UpcomingVenue>
              <Icon name="pin" size={12} />
              <span>{u.venue}</span>
            </UpcomingVenue>
          </div>
        </UpcomingCard>
      ))}
    </>
  )
}
