import styled from "styled-components";
import type { CategoryOption } from "../../types";
import { cardPopFeedback } from "../common/ui";
import { CategoryIcon } from "./CategoryIcon";

export interface CategoryGridProps {
  options: CategoryOption[];
  selected: string[];
  onToggle: (id: string) => void;
}

/** 카테고리별 아이콘 배경/색상 (디자인 시안 기준, org/css/favorite.css .category-icon--* 이식) */
const categoryIconStyle: Record<string, { bg: string; color: string }> = {
  concert: { bg: "#E4DDFB", color: "#6A3FD6" },
  musical: { bg: "#FBE1E3", color: "#B6495A" },
  band: { bg: "#EFEDE9", color: "#6B6259" },
  dance: { bg: "#8B7BE8", color: "#FFFFFF" },
  classic: { bg: "#FCE3DF", color: "#A6455C" },
  exhibit: { bg: "#F9DAD6", color: "#C15C4E" },
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-3);
`;

const Card = styled.button<{ $selected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  padding: var(--space-5) var(--space-3);
  background: var(--color-white);
  border: 1.5px solid ${(props) => (props.$selected ? "var(--color-primary)" : "var(--color-border)")};
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  ${cardPopFeedback}
  transition: border-color 0.15s ease, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease;

  &:active,
  &:hover {
    box-shadow: var(--shadow-float);
  }
`;

const IconWrap = styled.span<{ $bg: string; $color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: var(--radius-full);
  background: ${(props) => props.$bg};
  color: ${(props) => props.$color};

  svg {
    width: 26px;
    height: 26px;
  }
`;

const Label = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
`;

/** org/js/favorite.js의 renderCategoryGrid 이식 */
export function CategoryGrid({ options, selected, onToggle }: CategoryGridProps) {
  return (
    <Grid>
      {options.map((c) => {
        const style = categoryIconStyle[c.id];
        return (
          <Card key={c.id} type="button" $selected={selected.includes(c.id)} onClick={() => onToggle(c.id)}>
            <IconWrap $bg={style.bg} $color={style.color}>
              <CategoryIcon type={c.iconType} />
            </IconWrap>
            <Label>{c.label}</Label>
          </Card>
        );
      })}
    </Grid>
  );
}
