import { useState } from 'react'
import type { Performance } from '../../../types'
import { TastePoster, TastePosterItem, TastePosterRow, TastePosterTitle } from '../styles'

function PosterImg({ performance }: { performance: Performance }) {
  const [imgError, setImgError] = useState(false)

  return (
    <TastePoster
      style={imgError ? { background: 'linear-gradient(160deg, #2A2140 0%, #7C5CFC 60%, #F7F0EC 100%)' } : undefined}
    >
      {!imgError && (
        <img src={performance.posterUrl} alt={`${performance.title} 포스터`} onError={() => setImgError(true)} />
      )}
    </TastePoster>
  )
}

export function RecommendedPosters({ performances }: { performances: Performance[] }) {
  return (
    <TastePosterRow>
      {performances.map((p) => (
        <TastePosterItem key={p.id}>
          <PosterImg performance={p} />
          <TastePosterTitle>{p.title}</TastePosterTitle>
        </TastePosterItem>
      ))}
    </TastePosterRow>
  )
}
