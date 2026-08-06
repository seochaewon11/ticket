import type { RecommendReason } from '../../../types'
import { ReasonCard as Wrap, ReasonHeader, ReasonStatItem, ReasonStats, ReasonSummary, StatIcon, StatLabel, StatValue } from '../styles'

export function ReasonCard({ reason }: { reason: RecommendReason }) {
  return (
    <Wrap>
      <ReasonHeader>
        <span className="sparkle">✨</span>
        <h3>왜 추천됐는지 궁금하시죠?</h3>
      </ReasonHeader>
      <ReasonSummary>{reason.summary}</ReasonSummary>
      <ReasonStats>
        <ReasonStatItem>
          <StatIcon>🎭</StatIcon>
          <div>
            <StatLabel>장르 선호도</StatLabel>
            <StatValue>{reason.genrePreferenceLabel}</StatValue>
          </div>
        </ReasonStatItem>
        <ReasonStatItem>
          <StatIcon>📈</StatIcon>
          <div>
            <StatLabel>인기 급상승</StatLabel>
            <StatValue>{reason.trendingLabel}</StatValue>
          </div>
        </ReasonStatItem>
      </ReasonStats>
    </Wrap>
  )
}
