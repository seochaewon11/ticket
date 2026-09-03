import styled from "styled-components";
import { BottomNav } from "../../components/common/BottomNav";
import { Header } from "../../components/common/Header";
import { DonutChart } from "../../components/report/DonutChart";
import { RankList } from "../../components/report/RankList";
import { TrendChart } from "../../components/report/TrendChart";
import { useShareSheet } from "../../context/ShareSheetContext";
import { genreDistribution, topArtists, viewingTrend } from "../../data";

const Screen = styled.div`
  padding: var(--space-5);
  padding-bottom: calc(var(--tabbar-height) + var(--space-6));
`;

const ShareButton = styled.button`
  width: 100%;
  padding: 13px 16px;
  border-radius: var(--radius-full);
  font-size: 14px;
  font-weight: 700;
  background: var(--gradient-primary);
  color: var(--color-white);
  box-shadow: var(--shadow-float);
  transition: transform 0.15s ease;

  &:active {
    transform: scale(0.98);
  }
`;

/** org/js/report.js를 이식 (관람 트렌드 + 장르별 분포 + 최애 아티스트 랭킹) */
export function ReportPage() {
  const { openShare } = useShareSheet();

  return (
    <>
      <Header />
      <Screen>
        <TrendChart items={viewingTrend} />
        <DonutChart items={genreDistribution} />
        <RankList items={topArtists} />
        <ShareButton type="button" onClick={openShare}>
          리포트 친구에게 공유하기
        </ShareButton>
      </Screen>
      <BottomNav active="report" />
    </>
  );
}
