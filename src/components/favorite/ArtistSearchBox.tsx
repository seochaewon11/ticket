import styled from "styled-components";
import { Icon } from "../common/Icon";

export interface ArtistSearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

const Box = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 14px var(--space-4);
  background: var(--color-badge-gray-bg);
  border-radius: var(--radius-full);
  color: var(--color-text-placeholder);
  margin-bottom: var(--space-6);

  svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }
`;

const Input = styled.input`
  flex: 1;
  border: none;
  background: none;
  font-size: 14px;
  color: var(--color-text);
  outline: none;

  &::placeholder {
    color: var(--color-text-placeholder);
  }
`;

/** org/css/favorite.css의 .artist-search-box 이식 (React 제어 입력이라 커서 복원 로직은 불필요) */
export function ArtistSearchBox({ value, onChange }: ArtistSearchBoxProps) {
  return (
    <Box>
      <Icon name="search" />
      <Input
        type="text"
        placeholder="아티스트 이름을 검색해보세요"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Box>
  );
}
