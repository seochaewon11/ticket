import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { performances } from "../../data";
import { detailPath } from "../../router/routes";
import type { MonthlyPick, Performance } from "../../types";
import { BottomSheet, type BottomSheetOption } from "../common/BottomSheet";
import { Icon } from "../common/Icon";
import { PosterPlaceholder } from "../common/PosterPlaceholder";
import { IconButton, Pill, ScrollX, cardPopFeedback } from "../common/ui";

export interface MonthlyPicksSectionProps {
  items: MonthlyPick[];
}

/**
 * theme이 같은 실제 공연(performances)이 있으면 그 상세화면으로, 없으면(전시/오케스트라 등
 * 큐레이션 상세 정보가 아직 없는 항목) 카드 자체의 정보를 간이 상세화면으로 넘겨 보여준다.
 */
function resolveDetailTarget(pick: MonthlyPick) {
  const matched = performances.find((p) => p.theme === pick.theme);
  if (matched) {
    return { id: matched.id, path: detailPath(matched.id), state: undefined };
  }

  const quickView: Performance = {
    id: pick.id,
    title: pick.title,
    category: pick.category,
    theme: pick.theme,
    imageUrl: pick.imageUrl,
    dateRange: pick.date,
    venue: pick.venue,
    matchRate: 0,
    isLiked: false,
    isHero: false,
  };
  return { id: pick.id, path: detailPath(pick.id), state: { performance: quickView } };
}

const Box = styled.div`
  margin: var(--space-6) var(--space-5) 0;
  padding: var(--space-5);
  border-radius: var(--radius-xl);
  background: var(--gradient-primary);
  color: var(--color-white);
`;

const BoxHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-4);
`;

const BoxTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
`;

const BoxIconButton = styled(IconButton)`
  background: rgba(255, 255, 255, 0.18);
  color: var(--color-white);
`;

const CarouselWrap = styled.div`
  position: relative;
`;

const Track = styled(ScrollX)`
  scroll-snap-type: x proximity;
  padding-right: var(--space-3);
`;

const CardWrap = styled.button`
  position: relative;
  flex: 0 0 auto;
  width: 136px;
  height: 182px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
  scroll-snap-align: start;
  text-align: left;
  ${cardPopFeedback}
`;

/** DetailPage 히어로 포스터와 layoutId를 공유해 셰어드 엘리먼트 전환을 만든다 */
const CardPosterMotionWrap = styled(motion.div)`
  width: 100%;
  height: 100%;
`;

const CardPoster = styled(PosterPlaceholder)`
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(8, 6, 16, 0.85) 0%, rgba(8, 6, 16, 0.05) 55%, transparent 75%);
  }
`;

const CardBody = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: var(--space-3);
  color: var(--color-white);
`;

const CategoryPill = styled(Pill)`
  padding: 3px 8px;
  font-size: 10px;
  background: rgba(255, 255, 255, 0.9);
  color: var(--color-primary-dark);
  margin-bottom: 6px;
`;

const CardTitle = styled.p`
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 4px;
`;

const CardVenue = styled.p`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.8);

  svg {
    width: 11px;
    height: 11px;
    flex-shrink: 0;
  }
`;

const ScrollHintIcon = styled.button`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.92);
  color: var(--color-primary);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.15s ease;

  &:active {
    transform: translateY(-50%) scale(0.92);
  }

  svg {
    width: 13px;
    height: 13px;
  }
`;

/**
 * org/js/main.js의 renderMonthlyPicks 이식. NOLI가 찾은 맞춤 공연들과 동일하게
 * 카드를 가로로 슬라이드해서 보여준다("더보기"로 세로로 펼치는 중복 기능은 두지 않는다).
 * "+" 버튼은 정렬/필터용 바텀시트를 연다.
 */
export function MonthlyPicksSection({ items }: MonthlyPicksSectionProps) {
  const navigate = useNavigate();
  const trackRef = useRef<HTMLDivElement>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const closeSheet = () => setSheetOpen(false);

  const handleScrollNext = () => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: track.clientWidth * 0.85, behavior: "smooth" });
  };

  const moreOptions: BottomSheetOption[] = [
    { id: "genre", icon: "genre", label: "장르별로 보기", onSelect: closeSheet },
    { id: "date", icon: "calendar", label: "날짜순 정렬", onSelect: closeSheet },
    { id: "popular", icon: "trendUp", label: "인기순 정렬", onSelect: closeSheet },
    { id: "region", icon: "pin", label: "지역별로 보기", onSelect: closeSheet },
  ];

  return (
    <Box>
      <BoxHead>
        <BoxTitle>NOLI의 이달의 추천 공연들</BoxTitle>
        <BoxIconButton type="button" aria-label="정렬/필터" onClick={() => setSheetOpen(true)}>
          <Icon name="plus" />
        </BoxIconButton>
      </BoxHead>
      <BottomSheet isOpen={sheetOpen} onClose={closeSheet} title="이달의 추천 공연 더 보기" options={moreOptions} />
      <CarouselWrap>
        <Track ref={trackRef}>
          {items.map((m) => {
            const target = resolveDetailTarget(m);
            const layoutId = `poster-monthlypicks-${target.id}`;
            return (
              <CardWrap
                key={m.id}
                type="button"
                onClick={() =>
                  navigate(target.path, { state: { ...target.state, fromLayoutId: layoutId } })
                }
              >
                <CardPosterMotionWrap layoutId={layoutId}>
                  <CardPoster $theme={m.theme} imageUrl={m.imageUrl} alt={m.title} />
                </CardPosterMotionWrap>
                <CardBody>
                  <CategoryPill $variant="pink">{m.category}</CategoryPill>
                  <CardTitle>{m.title}</CardTitle>
                  <CardVenue>
                    <Icon name="pin" />
                    {m.venue}
                  </CardVenue>
                </CardBody>
              </CardWrap>
            );
          })}
        </Track>
        <ScrollHintIcon type="button" aria-label="다음 공연 보기" onClick={handleScrollNext}>
          <Icon name="chevron" />
        </ScrollHintIcon>
      </CarouselWrap>
    </Box>
  );
}
