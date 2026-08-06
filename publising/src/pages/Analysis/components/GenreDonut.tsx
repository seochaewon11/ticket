import type { GenreDistributionItem } from '../../../types'
import {
  DonutCenter,
  DonutGenreLabel,
  DonutPercent,
  DonutWrap,
  GenreLegend,
  LegendDot,
  LegendLabel,
  LegendPercent,
  LegendRow,
} from '../styles'

const R = 54
const CIRCUMFERENCE = 2 * Math.PI * R

export function GenreDonut({ data }: { data: GenreDistributionItem[] }) {
  let cumulativePct = 0
  const topGenre = data[0]

  return (
    <>
      <DonutWrap>
        <svg viewBox="0 0 128 128">
          <circle cx={64} cy={64} r={R} fill="none" stroke="var(--color-disabled-bg)" strokeWidth={20} />
          {data.map((d) => {
            const dash = (d.percentage / 100) * CIRCUMFERENCE
            const gap = CIRCUMFERENCE - dash
            const offset = -((cumulativePct / 100) * CIRCUMFERENCE)
            cumulativePct += d.percentage
            return (
              <circle
                key={d.genre}
                cx={64}
                cy={64}
                r={R}
                fill="none"
                stroke={d.color}
                strokeWidth={20}
                strokeDasharray={`${dash} ${gap}`}
                strokeDashoffset={offset}
              />
            )
          })}
        </svg>
        <DonutCenter>
          <DonutPercent>{topGenre.percentage}%</DonutPercent>
          <DonutGenreLabel>{topGenre.genre}</DonutGenreLabel>
        </DonutCenter>
      </DonutWrap>
      <GenreLegend>
        {data.map((d) => (
          <LegendRow key={d.genre}>
            <LegendDot $color={d.color} />
            <LegendLabel>{d.genre}</LegendLabel>
            <LegendPercent>{d.percentage}%</LegendPercent>
          </LegendRow>
        ))}
      </GenreLegend>
    </>
  )
}
