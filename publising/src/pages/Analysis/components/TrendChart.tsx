import type { ViewingTrend } from '../../../types'
import { NowBadge, TrendBar, TrendBarCol, TrendChartWrap, TrendMonthLabel } from '../styles'

export function TrendChart({ trend }: { trend: ViewingTrend }) {
  const maxCount = Math.max(...trend.months.map((m) => m.count))

  return (
    <TrendChartWrap>
      {trend.months.map((m) => {
        const heightPct = Math.max(14, Math.round((m.count / maxCount) * 100))
        return (
          <TrendBarCol key={m.label}>
            {m.isCurrent && <NowBadge>NOW</NowBadge>}
            <TrendBar $current={!!m.isCurrent} $heightPct={heightPct} />
            <TrendMonthLabel>{m.label}</TrendMonthLabel>
          </TrendBarCol>
        )
      })}
    </TrendChartWrap>
  )
}
