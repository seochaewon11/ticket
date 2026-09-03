import styled from "styled-components";
import { Icon } from "../common/Icon";

export interface SynopsisProps {
  text?: string;
  expanded: boolean;
  onToggle: () => void;
}

const SectionTitle = styled.div`
  font-size: 17px;
  font-weight: 800;
  margin-bottom: var(--space-4);
`;

const Text = styled.p<{ $collapsed: boolean }>`
  font-size: 13.5px;
  line-height: 1.7;
  color: var(--color-text);
  margin-bottom: var(--space-3);

  ${(props) =>
    props.$collapsed &&
    `
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    `}
`;

const ToggleButton = styled.button<{ $expanded: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 700;
  color: var(--color-text-sub);

  svg {
    width: 14px;
    height: 14px;
    transition: transform 0.2s ease;
    ${(props) => props.$expanded && "transform: rotate(180deg);"}
  }
`;

/** org/js/detail.js의 renderSynopsis 이식 */
export function Synopsis({ text, expanded, onToggle }: SynopsisProps) {
  return (
    <>
      <SectionTitle>시놉시스</SectionTitle>
      <Text $collapsed={!expanded}>{text}</Text>
      <ToggleButton type="button" $expanded={expanded} onClick={onToggle}>
        {expanded ? "접기" : "더 보기"} <Icon name="chevron" />
      </ToggleButton>
    </>
  );
}
