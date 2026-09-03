import { useState } from "react";
import styled from "styled-components";
import type { MonthlyPick } from "../../types";
import { Icon } from "../common/Icon";
import { PosterPlaceholder } from "../common/PosterPlaceholder";
import { IconButton, Pill } from "../common/ui";

export interface MonthlyPicksSectionProps {
  items: MonthlyPick[];
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

const BoxIconButton = styled(IconButton)<{ $expanded: boolean }>`
  background: rgba(255, 255, 255, 0.18);
  color: var(--color-white);
  transition: transform 0.2s ease;
  transform: rotate(${(props) => (props.$expanded ? "45deg" : "0deg")});
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3);
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-md);
`;

const Thumb = styled.div`
  flex-shrink: 0;
  width: 46px;
  height: 46px;
  border-radius: var(--radius-sm);
  overflow: hidden;
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

/** org/js/main.js의 renderMonthlyPicks 이식. "+" 버튼을 누르면 최대 10개까지 아래로 펼쳐진다 */
export function MonthlyPicksSection({ items }: MonthlyPicksSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const visibleItems = (expanded ? items.slice(0, EXPANDED_MAX_COUNT) : items.slice(0, COLLAPSED_COUNT));
  const canExpand = items.length > COLLAPSED_COUNT;

  return (
    <Box>
      <BoxHead>
        <BoxTitle>NOLI의 이달의 추천 공연들</BoxTitle>
        {canExpand && (
          <BoxIconButton
            type="button"
            aria-label={expanded ? "접기" : "더 보기"}
            $expanded={expanded}
            onClick={() => setExpanded((prev) => !prev)}
          >
            <Icon name="plus" />
          </BoxIconButton>
        )}
      </BoxHead>
      <List>
        {visibleItems.map((m) => (
          <Item key={m.id}>
            <Thumb>
              <PosterPlaceholder $theme={m.theme} imageUrl={m.imageUrl} alt={m.title} />
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
        ))}
      </List>
    </Box>
  );
}
