import styled, { keyframes } from "styled-components";
import { useSearchOverlay } from "../../context/SearchOverlayContext";
import { Icon } from "./Icon";

const popIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.85) translateY(8px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(10, 8, 20, 0.5);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 var(--space-6);
`;

const Card = styled.div`
  width: 100%;
  max-width: 300px;
  background: var(--color-white);
  border: 2px solid var(--color-primary-soft);
  border-radius: 28px;
  box-shadow: var(--shadow-float);
  padding: var(--space-4);
  animation: ${popIn} 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-3);
`;

const HeadTitle = styled.p`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 700;
  color: var(--color-primary-dark);
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--color-primary-softer);
  font-size: 14px;
  line-height: 1;
  color: var(--color-primary);
  transition: transform 0.15s ease;

  &:active {
    transform: scale(0.9);
  }
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 10px var(--space-3);
  background: var(--color-primary-softer);
  border: 1.5px solid var(--color-primary-soft);
  border-radius: var(--radius-full);
  color: var(--color-primary);

  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
`;

const Input = styled.input`
  flex: 1;
  border: none;
  background: none;
  font-size: 13px;
  color: var(--color-text);
  outline: none;

  &::placeholder {
    color: var(--color-text-placeholder);
  }
`;

/** 검색 버튼을 누르면 화면 가운데에 뜨는 검색창 모달 (실제 검색 연동은 없고 UI만 동작) */
export function SearchOverlay() {
  const { isOpen, query, setQuery, closeSearch } = useSearchOverlay();

  if (!isOpen) return null;

  return (
    <Backdrop onClick={closeSearch}>
      <Card onClick={(e) => e.stopPropagation()}>
        <Head>
          <HeadTitle>검색</HeadTitle>
          <CloseButton type="button" aria-label="닫기" onClick={closeSearch}>
            ×
          </CloseButton>
        </Head>
        <SearchBox>
          <Icon name="search" />
          <Input
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            type="text"
            placeholder="공연, 아티스트를 검색해보세요"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </SearchBox>
      </Card>
    </Backdrop>
  );
}
