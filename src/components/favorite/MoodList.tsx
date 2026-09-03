import styled from "styled-components";
import type { MoodOption } from "../../types";

export interface MoodListProps {
  options: MoodOption[];
  selected: string[];
  onToggle: (id: string) => void;
}

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
`;

const Chip = styled.button<{ $selected: boolean }>`
  padding: 10px 18px;
  border-radius: var(--radius-full);
  font-size: 14px;
  font-weight: 600;
  background: ${(props) => (props.$selected ? "var(--gradient-primary)" : "var(--color-badge-gray-bg)")};
  color: ${(props) => (props.$selected ? "var(--color-white)" : "var(--color-text-sub)")};
  transition: background 0.15s ease, color 0.15s ease, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.2s ease;

  /* 클릭이 확정되기 전(누르는 순간) 칩이 살짝 튀어나오듯 커지는 피드백 (CategoryGrid 카드와 동일) */
  &:active {
    transform: scale(1.08);
    box-shadow: var(--shadow-float);
  }

  @media (hover: hover) {
    &:hover {
      transform: scale(1.06);
      box-shadow: var(--shadow-float);
    }
  }
`;

/** org/js/favorite.js의 renderMoodList 이식 */
export function MoodList({ options, selected, onToggle }: MoodListProps) {
  return (
    <List>
      {options.map((m) => (
        <Chip key={m.id} type="button" $selected={selected.includes(m.id)} onClick={() => onToggle(m.id)}>
          {m.label}
        </Chip>
      ))}
    </List>
  );
}
