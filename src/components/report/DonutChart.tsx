import styled from "styled-components";
import type { GenreDistributionSlice } from "../../types";
import { Card } from "../common/ui";

export interface DonutChartProps {
  items: GenreDistributionSlice[];
}

const RADIUS = 40;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const ChartCard = styled(Card)`
  padding: var(--space-5);
  margin-bottom: var(--space-5);
`;

const Title = styled.p`
  font-size: 17px;
  font-weight: 800;
  margin-bottom: var(--space-5);
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-5);
`;

const ChartWrap = styled.div`
  position: relative;
  width: 128px;
  height: 128px;
  flex-shrink: 0;

  svg {
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }
`;

const Center = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CenterPercent = styled.span`
  font-size: 20px;
  font-weight: 800;
`;

const CenterLabel = styled.span`
  font-size: 12px;
  color: var(--color-text-sub);
`;

const Legend = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
`;

const LegendRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
`;

const LegendDot = styled.span<{ $color: string }>`
  width: 9px;
  height: 9px;
  border-radius: var(--radius-full);
  flex-shrink: 0;
  background: ${(props) => props.$color};
`;

const LegendLabel = styled.span`
  flex: 1;
  color: var(--color-text);
`;

const LegendPercent = styled.span`
  font-weight: 700;
  color: var(--color-primary);
`;

/** org/js/report.js의 renderDonutChart 이식 (장르별 분포 도넛 차트 + 범례) */
export function DonutChart({ items }: DonutChartProps) {
  const top = items[0];
  let offsetAcc = 0;

  return (
    <ChartCard>
      <Title>장르별 상세 분포</Title>
      <Row>
        <ChartWrap>
          <svg viewBox="0 0 100 100">
            <circle cx={50} cy={50} r={RADIUS} fill="none" stroke="var(--color-chart-track)" strokeWidth={14} />
            {items.map((g) => {
              const length = (g.percent / 100) * CIRCUMFERENCE;
              const segment = (
                <circle
                  key={g.label}
                  cx={50}
                  cy={50}
                  r={RADIUS}
                  fill="none"
                  stroke={g.color}
                  strokeWidth={14}
                  strokeDasharray={`${length} ${CIRCUMFERENCE - length}`}
                  strokeDashoffset={-offsetAcc}
                  strokeLinecap="butt"
                />
              );
              offsetAcc += length;
              return segment;
            })}
          </svg>
          <Center>
            <CenterPercent>{top?.percent ?? 0}%</CenterPercent>
            <CenterLabel>{top?.label ?? ""}</CenterLabel>
          </Center>
        </ChartWrap>
        <Legend>
          {items.map((g) => (
            <LegendRow key={g.label}>
              <LegendDot $color={g.color} />
              <LegendLabel>{g.label}</LegendLabel>
              <LegendPercent>{g.percent}%</LegendPercent>
            </LegendRow>
          ))}
        </Legend>
      </Row>
    </ChartCard>
  );
}
