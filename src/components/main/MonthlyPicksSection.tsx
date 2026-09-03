import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { performances } from "../../data";
import { detailPath } from "../../router/routes";
import type { MonthlyPick, Performance } from "../../types";
import { BottomSheet, type BottomSheetOption } from "../common/BottomSheet";
import { Icon } from "../common/Icon";
import { PosterPlaceholder } from "../common/PosterPlaceholder";
import { IconButton, Pill } from "../common/ui";

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
    dateRange: pick.date,
    venue: pick.venue,
    matchRate: 0,
    isLiked: false,
    isHero: false,
    // imageUrl은 넘기지 않는다: monthlyPicks의 이미지는 여러 항목이 재사용하는
    // 목업 이미지라 실제 제목과 맞지 않을 수 있어, 큰 히어로에서는 안전하게
    // theme 그라디언트로 대체한다.
  };
  return { id: pick.id, path: detailPath(pick.id), state: { performance: quickView } };
}

/** 기본으로 보여줄 개수, 펼쳤을 때 최대로 보여줄 개수 */
const COLLAPSED_COUNT = 3;
const EXPANDED_MAX_COUNT = 10;

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

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
`;

const Item = styled.button`
  display: flex;
  align-items: center;
  gap: var(--space-3);
  width: 100%;
  padding: var(--space-3);
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-md);
  text-align: left;
  color: inherit;
`;

const Thumb = styled.div`
  flex-shrink: 0;
  width: 46px;
  height: 46px;
  border-radius: var(--radius-sm);
  overflow: hidden;
`;

/** DetailPage 히어로 포스터와 layoutId를 공유해 셰어드 엘리먼트 전환을 만든다 */
const ThumbMotionWrap = styled(motion.div)`
  width: 100%;
  height: 100%;
`;

const ItemBody = styled.div`
  min-width: 0;
  flex: 1;
`;

const ItemMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
`;

const CategoryPill = styled(Pill)`
  padding: 3px 8px;
  font-size: 10px;
  background: rgba(255, 255, 255, 0.9);
  color: var(--color-primary-dark);
`;

const ItemDate = styled.span`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.75);
`;

const ItemTitle = styled.p`
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 4px;
`;

const ItemVenue = styled.p`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.75);

  svg {
    width: 11px;
    height: 11px;
    flex-shrink: 0;
  }
`;

/** org/js/main.js의 renderMonthlyPicks 이식. "+" 버튼을 누르면 바텀시트가 열리고, "전체 공연 보기"를 고르면 최대 10개까지 펼쳐진다 */
export function MonthlyPicksSection({ items }: MonthlyPicksSectionProps) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const closeSheet = () => setSheetOpen(false);
  const visibleItems = (expanded ? items.slice(0, EXPANDED_MAX_COUNT) : items.slice(0, COLLAPSED_COUNT));
  const canExpand = items.length > COLLAPSED_COUNT;

  const moreOptions: BottomSheetOption[] = [
    ...(canExpand && !expanded
      ? [{ id: "all", icon: "chart" as const, label: "전체 공연 보기", onSelect: () => { setExpanded(true); closeSheet(); } }]
      : []),
    { id: "genre", icon: "genre", label: "장르별로 보기", onSelect: closeSheet },
    { id: "date", icon: "calendar", label: "날짜순 정렬", onSelect: closeSheet },
    { id: "popular", icon: "trendUp", label: "인기순 정렬", onSelect: closeSheet },
    { id: "region", icon: "pin", label: "지역별로 보기", onSelect: closeSheet },
  ];

  return (
    <Box>
      <BoxHead>
        <BoxTitle>NOLI의 이달의 추천 공연들</BoxTitle>
        <BoxIconButton type="button" aria-label="더 보기" onClick={() => setSheetOpen(true)}>
          <Icon name="plus" />
        </BoxIconButton>
      </BoxHead>
      <BottomSheet isOpen={sheetOpen} onClose={closeSheet} title="이달의 추천 공연 더 보기" options={moreOptions} />
      <List>
        {visibleItems.map((m) => {
          const target = resolveDetailTarget(m);
          return (
            <Item
              key={m.id}
              type="button"
              onClick={() => navigate(target.path, target.state ? { state: target.state } : undefined)}
            >
              <Thumb>
                <ThumbMotionWrap layoutId={`poster-${target.id}`}>
                  <PosterPlaceholder $theme={m.theme} imageUrl={m.imageUrl} alt={m.title} />
                </ThumbMotionWrap>
              </Thumb>
              <ItemBody>
                <ItemMeta>
                  <CategoryPill $variant="pink">{m.category}</CategoryPill>
                  <ItemDate>{m.date}</ItemDate>
                </ItemMeta>
                <ItemTitle>{m.title}</ItemTitle>
                <ItemVenue>
                  <Icon name="pin" />
                  {m.venue}
                </ItemVenue>
              </ItemBody>
            </Item>
          );
        })}
      </List>
    </Box>
  );
}
