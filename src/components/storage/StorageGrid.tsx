import styled from "styled-components";
import type { StorageItem } from "../../types";
import { Icon } from "../common/Icon";
import { PosterPlaceholder } from "../common/PosterPlaceholder";

export interface StorageGridProps {
  items: StorageItem[];
  /** 저장한 공연 그리드에서만 우상단 하트 뱃지를 보여준다 */
  showHeart?: boolean;
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-3);
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Media = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
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

/** org/js/storage.js의 renderCard 이식 (보관함 3열 그리드 카드) */
export function StorageGrid({ items, showHeart = false }: StorageGridProps) {
  return (
    <Grid>
      {items.map((item) => (
        <Card key={item.id}>
          <Media>
            <PosterPlaceholder $theme={item.theme} imageUrl={item.imageUrl} alt={item.title} />
            {showHeart && (
              <HeartBadge aria-hidden="true">
                <Icon name="heart" filled />
              </HeartBadge>
            )}
          </Media>
          <Category>{item.category}</Category>
          <CardTitle>{item.title}</CardTitle>
        </Card>
      ))}
    </Grid>
  );
}
