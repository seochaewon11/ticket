import { motion } from "framer-motion";
import styled from "styled-components";
import type { StorageItem } from "../../types";
import { Icon } from "../common/Icon";
import { PosterPlaceholder } from "../common/PosterPlaceholder";
import { cardPopFeedback } from "../common/ui";

export interface StorageGridProps {
  items: StorageItem[];
  /** 저장한 공연 그리드에서만 우상단 하트 뱃지를 보여준다 */
  showHeart?: boolean;
  /** 카드를 클릭하면 상세화면으로 이동한다 (id, 셰어드 엘리먼트 전환용 layoutId) */
  onOpenDetail: (id: string, fromLayoutId: string) => void;
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
export function StorageGrid({ items, showHeart = false, onOpenDetail }: StorageGridProps) {
  return (
    <Grid>
      {items.map((item) => {
        const layoutId = `poster-storage-${item.id}`;
        return (
          <Card key={item.id} type="button" onClick={() => onOpenDetail(item.id, layoutId)}>
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
