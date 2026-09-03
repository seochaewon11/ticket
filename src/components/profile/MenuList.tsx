import styled from "styled-components";
import type { ProfileMenuItem } from "../../types";
import { Icon } from "../common/Icon";

export interface MenuListProps {
  items: ProfileMenuItem[];
  onSelect: (id: string) => void;
}

const Box = styled.div`
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: 0 var(--space-4);
  margin-bottom: var(--space-5);
`;

const Row = styled.button`
  display: flex;
  align-items: center;
  gap: var(--space-3);
  width: 100%;
  padding: var(--space-4) 0;
  color: var(--color-text);
  border-bottom: 1px solid var(--color-border);

  &:last-child {
    border-bottom: none;
  }
`;

const RowIcon = styled.span`
  display: flex;
  color: var(--color-primary);

  svg {
    width: 18px;
    height: 18px;
  }
`;

const RowLabel = styled.span`
  flex: 1;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
`;

const RowChevron = styled.span`
  display: flex;
  color: var(--color-text-placeholder);

  svg {
    width: 16px;
    height: 16px;
  }
`;

/**
 * org/js/profile.js의 renderMenu 이식 (취향 프로필 수정 / 설정 / 고객센터 / 공지사항 메뉴 리스트).
 * 취향 프로필 수정 외 나머지 항목은 원본과 동일하게 실제 이동 없이 자리만 유지한다.
 */
export function MenuList({ items, onSelect }: MenuListProps) {
  return (
    <Box>
      {items.map((m) => (
        <Row key={m.id} type="button" onClick={() => onSelect(m.id)}>
          <RowIcon>
            <Icon name={m.iconType} />
          </RowIcon>
          <RowLabel>{m.label}</RowLabel>
          <RowChevron>
            <Icon name="chevron" />
          </RowChevron>
        </Row>
      ))}
    </Box>
  );
}
