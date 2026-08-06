// "관람 완료 공연" 목록 (Calendar에서 관람 완료로 표시한 공연을 모아 보여줌)
import type { Performance } from '../../../types'
import { WishedCard, WishedEmptyState, WishedInfo, WishedMeta, WishedTitle } from '../styles'

interface WatchedListProps {
  performances: Performance[]
}

export function WatchedList({ performances }: WatchedListProps) {
  if (performances.length === 0) {
    return <WishedEmptyState>아직 관람 완료한 공연이 없어요.</WishedEmptyState>
  }

  return (
    <>
      {performances.map((p) => (
        <WishedCard key={p.id}>
          <WishedInfo>
            <WishedTitle>{p.title}</WishedTitle>
            <WishedMeta>
              {p.period} · {p.venue}
            </WishedMeta>
          </WishedInfo>
        </WishedCard>
      ))}
    </>
  )
}
