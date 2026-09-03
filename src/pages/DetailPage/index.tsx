import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { BottomNav } from "../../components/common/BottomNav";
import { Header } from "../../components/common/Header";
import { PosterPlaceholder } from "../../components/common/PosterPlaceholder";
import { CastList } from "../../components/detail/CastList";
import { InfoSection } from "../../components/detail/InfoSection";
import { MatchCard } from "../../components/detail/MatchCard";
import { Synopsis } from "../../components/detail/Synopsis";
import { useAppState } from "../../context/AppStateContext";
import { performances } from "../../data";
import { ROUTES } from "../../router/routes";
import type { Performance } from "../../types";

const Screen = styled.div`
  padding-bottom: calc(var(--tabbar-height) + var(--space-6));
`;

const HeroMedia = styled.div`
  width: 100%;
  aspect-ratio: 4 / 5;
`;

const HeroPoster = styled(PosterPlaceholder)`
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(10, 8, 20, 0.55) 0%, rgba(10, 8, 20, 0.05) 45%, transparent 65%);
  }
`;

const Watermark = styled.span`
  position: absolute;
  left: 50%;
  bottom: 6%;
  transform: translateX(-50%);
  font-size: 48px;
  font-weight: 800;
  letter-spacing: 4px;
  color: rgba(255, 255, 255, 0.14);
  white-space: nowrap;
  pointer-events: none;
`;

const Body = styled.div`
  padding: var(--space-5);
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 800;
  margin-bottom: var(--space-4);
`;

const SaveButton = styled.button`
  width: 100%;
  padding: 13px 16px;
  margin-bottom: var(--space-5);
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

function findPerformance(id?: string): Performance | undefined {
  return performances.find((item) => item.id === id) ?? performances[0];
}

/**
 * org/js/detail.js를 이식. 히어로 + 취향일치 분석 카드 + 상세정보 + 시놉시스 + 출연진.
 * performanceId별로 완전히 새 인스턴스를 마운트해 로컬 state(찜, 시놉시스 펼침)를
 * 자연스럽게 초기화하도록 key로 감싼다.
 */
export function DetailPage() {
  const { performanceId } = useParams<{ performanceId: string }>();
  return <DetailPageContent key={performanceId} performanceId={performanceId} />;
}

function DetailPageContent({ performanceId }: { performanceId?: string }) {
  const navigate = useNavigate();
  const { userPreference } = useAppState();

  const [performance, setPerformance] = useState<Performance | undefined>(() => findPerformance(performanceId));
  const [synopsisExpanded, setSynopsisExpanded] = useState(false);

  if (!performance) return null;

  const shortTitle = performance.title.split("(")[0].trim();

  return (
    <>
      <Header back onBack={() => navigate(ROUTES.main)} />
      <Screen>
        <HeroMedia>
          <HeroPoster $theme={performance.theme} imageUrl={performance.imageUrl} alt={performance.title}>
            <Watermark>{shortTitle}</Watermark>
          </HeroPoster>
        </HeroMedia>

        <Body>
          <Title>{performance.title}</Title>
          <SaveButton
            type="button"
            onClick={() => setPerformance((prev) => (prev ? { ...prev, isLiked: !prev.isLiked } : prev))}
          >
            {performance.isLiked ? "보관함에 담겼어요" : "나만의 보관함에 담기"}
          </SaveButton>

          <MatchCard
            userName={userPreference.userName}
            matchRate={performance.matchRate}
            matchReasonHtml={performance.matchReasonHtml}
            genrePreferenceText={performance.genrePreferenceText}
            trendingText={performance.trendingText}
          />
          <InfoSection
            period={performance.period}
            runningTime={performance.runningTime}
            priceRange={performance.priceRange}
          />
          <Synopsis
            text={performance.synopsis}
            expanded={synopsisExpanded}
            onToggle={() => setSynopsisExpanded((v) => !v)}
          />
          <CastList cast={performance.castList ?? []} />
        </Body>
      </Screen>
      <BottomNav />
    </>
  );
}
