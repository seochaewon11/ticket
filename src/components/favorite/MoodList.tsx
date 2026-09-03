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
  transition: background 0.15s ease, color 0.15s ease;
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
