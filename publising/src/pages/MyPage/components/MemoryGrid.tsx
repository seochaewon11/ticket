import { useState } from 'react'
import type { MemoryPerformance } from '../../../types'
import { MemoryCard, MemoryDateBadge, MemoryGridWrap, MemoryPoster, MemoryTitle, MemoryVenue } from '../styles'

function MemoryPosterImg({ memory }: { memory: MemoryPerformance }) {
  const [imgError, setImgError] = useState(false)

  return (
    <MemoryPoster
      style={imgError ? { background: 'linear-gradient(160deg, #2A2140 0%, #7C5CFC 60%, #F7F0EC 100%)' } : undefined}
    >
      <MemoryDateBadge>{memory.viewedDateLabel}</MemoryDateBadge>
      {!imgError && (
        <img src={memory.posterUrl} alt={memory.title} onError={() => setImgError(true)} />
      )}
    </MemoryPoster>
  )
}

export function MemoryGrid({ memories }: { memories: MemoryPerformance[] }) {
  return (
    <MemoryGridWrap>
      {memories.map((m) => (
        <MemoryCard key={m.id}>
          <MemoryPosterImg memory={m} />
          <MemoryTitle>{m.title}</MemoryTitle>
          <MemoryVenue>{m.venue}</MemoryVenue>
        </MemoryCard>
      ))}
    </MemoryGridWrap>
  )
}
