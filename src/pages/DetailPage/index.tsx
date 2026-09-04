import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
import type { Performance } from "../../types";

const Screen = styled.div`
  padding-bottom: calc(var(--tabbar-height) + var(--space-6));
`;

const HeroMedia = styled.div`
  width: 100%;
  aspect-ratio: 4 / 5;
`;

/** 카드 목록(main/아티스트소식/이달의추천) 포스터와 layoutId를 공유해 셰어드 엘리먼트 전환을 만든다 */
const HeroPosterMotionWrap = styled(motion.div)`
  width: 100%;
  height: 100%;
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

/**
 * id가 performances(큐레이션된 공연)에 없으면, 카드 목록(아티스트소식/이달의추천)에서
 * navigate(..., { state: { performance } })로 함께 넘어온 간이 정보를 대신 사용한다.
 * 그마저 없으면(주소창 직접 진입 등) 히어로 공연으로 대체한다.
 */
function findPerformance(id: string | undefined, quickView: Performance | undefined): Performance | undefined {
  const curated = performances.find((item) => item.id === id);
  if (curated) return curated;
  if (quickView && quickView.id === id) return quickView;
  return performances[0];
}

/**
 * org/js/detail.js를 이식. 히어로 + 취향일치 분석 카드 + 상세정보 + 시놉시스 + 출연진.
 * performanceId별로 완전히 새 인스턴스를 마운트해 로컬 state(찜, 시놉시스 펼침)를
 * 자연스럽게 초기화하도록 key로 감싼다.
 */
export function DetailPage() {
  const { performanceId } = useParams<{ performanceId: string }>();
  const location = useLocation();
  const state = location.state as { performance?: Performance; fromLayoutId?: string } | null;
  return (
    <DetailPageContent
      key={performanceId}
      performanceId={performanceId}
      quickView={state?.performance}
      fromLayoutId={state?.fromLayoutId}
    />
  );
}

function DetailPageContent({
  performanceId,
  quickView,
  fromLayoutId,
}: {
  performanceId?: string;
  quickView?: Performance;
  fromLayoutId?: string;
}) {
  const navigate = useNavigate();
  const { userPreference } = useAppState();

  const [performance, setPerformance] = useState<Performance | undefined>(() =>
    findPerformance(performanceId, quickView),
  );
  const [synopsisExpanded, setSynopsisExpanded] = useState(false);

  if (!performance) return null;

  const shortTitle = performance.title.split("(")[0].trim();

  return (
    <>
      <Header back onBack={() => navigate(-1)} />
      <Screen>
        <HeroMedia>
          <HeroPosterMotionWrap layoutId={fromLayoutId}>
            <HeroPoster $theme={performance.theme} imageUrl={performance.imageUrl} alt={performance.title}>
              <Watermark>{shortTitle}</Watermark>
            </HeroPoster>
          </HeroPosterMotionWrap>
        </HeroMedia>

        <Body>
          <Title>{performance.title}</Title>
          <SaveButton
            type="button"
            onClick={() => setPerformance((prev) => (prev ? { ...prev, isLiked: !prev.isLiked } : prev))}
          >
            {performance.isLiked ? "보관함에 담겼어요" : "나만의 보관함에 담기"}
          </SaveButton>

          {performance.matchRate > 0 && (
            <MatchCard
              userName={userPreference.userName}
              matchRate={performance.matchRate}
              matchReasonHtml={performance.matchReasonHtml}
              genrePreferenceText={performance.genrePreferenceText}
              trendingText={performance.trendingText}
            />
          )}
          {performance.period && (
            <InfoSection
              period={performance.period}
              runningTime={performance.runningTime}
              priceRange={performance.priceRange}
            />
          )}
          {performance.synopsis && (
            <Synopsis
              text={performance.synopsis}
              expanded={synopsisExpanded}
              onToggle={() => setSynopsisExpanded((v) => !v)}
            />
          )}
          {performance.castList && performance.castList.length > 0 && <CastList cast={performance.castList} />}
        </Body>
      </Screen>
      <BottomNav />
    </>
  );
}
