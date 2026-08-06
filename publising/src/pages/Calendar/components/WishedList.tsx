// "찜한 공연" 목록 + 관람 완료 체크 (간단 버전 - 별도 티켓 등록 없이 수동 체크)
import { Icon } from '../../../components/common/icon'
import type { Performance } from '../../../types'
import { MarkWatchedCheck, WishedCard, WishedEmptyState, WishedInfo, WishedMeta, WishedTitle } from '../styles'

interface WishedListProps {
  performances: Performance[]
  onMarkWatched: (id: string) => void
}

export function WishedList({ performances, onMarkWatched }: WishedListProps) {
  if (performances.length === 0) {
    return <WishedEmptyState>아직 찜한 공연이 없어요.</WishedEmptyState>
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
          <MarkWatchedCheck type="button" aria-label="관람 완료로 표시" onClick={() => onMarkWatched(p.id)}>
            <Icon name="check" strokeWidth={3} />
          </MarkWatchedCheck>
        </WishedCard>
      ))}
    </>
  )
}
