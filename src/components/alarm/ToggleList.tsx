import styled from "styled-components";
import type { AlarmOption } from "../../types";

export interface ToggleListProps {
  options: AlarmOption[];
  onToggle: (id: string) => void;
}

const Row = styled.div<{ $on: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4);
  border: 1.5px solid ${(props) => (props.$on ? "var(--color-primary-soft)" : "var(--color-border)")};
  border-radius: var(--radius-lg);
  background: ${(props) => (props.$on ? "var(--color-primary-softer)" : "transparent")};
  margin-bottom: var(--space-3);
  transition: background 0.15s ease, border-color 0.15s ease;
`;

const Label = styled.span<{ $on: boolean }>`
  font-size: 14.5px;
  font-weight: ${(props) => (props.$on ? 700 : 600)};
  color: ${(props) => (props.$on ? "var(--color-text)" : "var(--color-text-sub)")};
`;

const Switch = styled.button<{ $on: boolean }>`
  position: relative;
  width: 46px;
  height: 26px;
  border-radius: var(--radius-full);
  background: ${(props) => (props.$on ? "var(--gradient-primary)" : "var(--color-border-strong)")};
  flex-shrink: 0;
  transition: background 0.2s ease;

  &::after {
    content: "";
    position: absolute;
    top: 3px;
    left: 3px;
    width: 20px;
    height: 20px;
    border-radius: var(--radius-full);
    background: var(--color-white);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease;
    transform: translateX(${(props) => (props.$on ? "20px" : "0")});
  }
`;

/** org/js/alarm.js의 renderToggleList 이식 (알람 시점 토글 리스트) */
export function ToggleList({ options, onToggle }: ToggleListProps) {
  return (
    <>
      {options.map((opt) => (
        <Row key={opt.id} $on={opt.checked}>
          <Label $on={opt.checked}>{opt.label}</Label>
          <Switch
            type="button"
            $on={opt.checked}
            aria-label={`${opt.label} 알람 ${opt.checked ? "끄기" : "켜기"}`}
            onClick={() => onToggle(opt.id)}
          />
        </Row>
      ))}
    </>
  );
}
