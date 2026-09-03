import styled from "styled-components";
import type { ViewingTrendPoint } from "../../types";
import { Card } from "../common/ui";

export interface TrendChartProps {
  items: ViewingTrendPoint[];
}

const ChartCard = styled(Card)`
  padding: var(--space-5);
  margin-bottom: var(--space-5);
`;

const Head = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: var(--space-5);
`;

const Title = styled.p`
  font-size: 17px;
  font-weight: 800;
  margin-bottom: 4px;
`;

const Sub = styled.p`
  font-size: 12.5px;
  color: var(--color-text-sub);
`;

const Count = styled.p`
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;

  strong {
    font-size: 22px;
    font-weight: 800;
    color: var(--color-primary);
    margin-right: 2px;
  }
`;

const Chart = styled.div`
  display: flex;
  align-items: flex-end;
  gap: var(--space-3);
  height: 140px;
  margin-bottom: var(--space-3);
`;

const BarCol = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
`;

const NowBadge = styled.span`
  position: absolute;
  top: -22px;
  font-size: 10px;
  font-weight: 800;
  color: var(--color-white);
  background: var(--color-primary);
  padding: 3px 8px;
  border-radius: var(--radius-full);
  white-space: nowrap;
`;

const Bar = styled.div<{ $heightPercent: number; $isNow: boolean }>`
  width: 60%;
  height: ${(props) => props.$heightPercent}%;
  border-radius: 8px 8px 0 0;
  background: ${(props) => (props.$isNow ? "var(--gradient-primary)" : "var(--color-primary-soft)")};
`;

const Labels = styled.div`
  display: flex;
  gap: var(--space-3);

  span {
    flex: 1;
    text-align: center;
    font-size: 11.5px;
    color: var(--color-text-sub);
  }
`;

/** org/js/report.js의 renderTrendChart 이식 (최근 6개월 관람 추이 막대그래프) */
export function TrendChart({ items }: TrendChartProps) {
  const max = Math.max(...items.map((v) => v.count));
  const nowIndex = items.length - 1;
  const totalCount = items[nowIndex]?.count ?? 0;

  return (
    <ChartCard>
      <Head>
        <div>
          <Title>관람 트렌드</Title>
          <Sub>지난 6개월간의 기록입니다</Sub>
        </div>
        <Count>
          <strong>{totalCount}</strong>회 관람
        </Count>
      </Head>
      <Chart>
        {items.map((v, i) => {
          const isNow = i === nowIndex;
          return (
            <BarCol key={v.month}>
              {isNow && <NowBadge>NOW</NowBadge>}
              <Bar $heightPercent={Math.max((v.count / max) * 100, 8)} $isNow={isNow} />
            </BarCol>
          );
        })}
      </Chart>
      <Labels>
        {items.map((v) => (
          <span key={v.month}>{v.month}</span>
        ))}
      </Labels>
    </ChartCard>
  );
}
