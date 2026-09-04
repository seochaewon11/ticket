import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { performances } from "../../data";
import { detailPath } from "../../router/routes";
import type { Performance, StorageItem } from "../../types";
import { Icon } from "../common/Icon";
import { PosterPlaceholder } from "../common/PosterPlaceholder";
import { cardPopFeedback } from "../common/ui";

export interface StorageGridProps {
  items: StorageItem[];
  /** 저장한 공연 그리드에서만 우상단 하트 뱃지를 보여준다 */
  showHeart?: boolean;
}

/**
 * theme이 같은 실제 공연(performances)이 있으면 그 상세화면(취향일치/상세정보/시놉시스/출연진 포함)으로,
 * 없으면 카드 자체의 정보를 간이 상세화면으로 넘겨 보여준다. (MonthlyPicksSection과 동일한 규칙)
 */
function resolveDetailTarget(item: StorageItem) {
  const matched = performances.find((p) => p.theme === item.theme);
  if (matched) {
    return { path: detailPath(matched.id), state: undefined as { performance?: Performance } | undefined };
  }

  const quickView: Performance = {
    id: item.id,
    title: item.title,
    category: item.category,
    theme: item.theme,
    imageUrl: item.imageUrl,
    dateRange: "",
    venue: "",
    matchRate: 0,
    isLiked: false,
    isHero: false,
  };
  return { path: detailPath(item.id), state: { performance: quickView } };
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-3);
`;

const Card = styled.button`
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: left;
  ${cardPopFeedback}
`;

/** DetailPage 히어로 포스터와 layoutId를 공유해 셰어드 엘리먼트 전환을 만든다 */
const MediaMotionWrap = styled(motion.div)`
  width: 100%;
  aspect-ratio: 3 / 4;
`;

const Media = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-card);
`;

const HeartBadge = styled.span`
  position: absolute;
  top: 6px;
  right: 6px;
  display: flex;
  color: var(--color-primary);

  svg {
    width: 18px;
    height: 18px;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.35));
  }
`;

const Category = styled.p`
  font-size: 11px;
  color: var(--color-text-sub);
`;

const CardTitle = styled.p`
  font-size: 12.5px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

/** org/js/storage.js의 renderCard 이식 (보관함 3열 그리드 카드, 호버 시 팝업 효과 + 클릭 시 상세화면 이동) */
export function StorageGrid({ items, showHeart = false }: StorageGridProps) {
  const navigate = useNavigate();

  return (
    <Grid>
      {items.map((item) => {
        const layoutId = `poster-storage-${item.id}`;
        const target = resolveDetailTarget(item);
        return (
          <Card
            key={item.id}
            type="button"
            onClick={() => navigate(target.path, { state: { ...target.state, fromLayoutId: layoutId } })}
          >
            <MediaMotionWrap layoutId={layoutId}>
              <Media>
                <PosterPlaceholder $theme={item.theme} imageUrl={item.imageUrl} alt={item.title} />
                {showHeart && (
                  <HeartBadge aria-hidden="true">
                    <Icon name="heart" filled />
                  </HeartBadge>
                )}
              </Media>
            </MediaMotionWrap>
            <Category>{item.category}</Category>
            <CardTitle>{item.title}</CardTitle>
          </Card>
        );
      })}
    </Grid>
  );
}
