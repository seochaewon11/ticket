import { useMemo, type JSX } from "react";
import styled, { keyframes } from "styled-components";
import { useShareSheet } from "../../context/ShareSheetContext";
import { Icon } from "./Icon";

interface ShareTarget {
  id: string;
  label: string;
  bg: string;
  render: () => JSX.Element;
}

function KakaoTalkGlyph() {
  return (
    <svg viewBox="0 0 24 24" width={22} height={22}>
      <path
        d="M12 4.5c-5 0-9 3.1-9 7 0 2.5 1.7 4.7 4.2 6l-1 3.3c-.1.3.2.6.5.4l3.9-2.4c.5.05 1 .07 1.4.07 5 0 9-3.1 9-7s-4-7-9-7Z"
        fill="#391B1B"
      />
    </svg>
  );
}

function MessageGlyph() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5.5h16a1 1 0 0 1 1 1V16a1 1 0 0 1-1 1H9l-4.4 3.3a.5.5 0 0 1-.8-.4V17H4a1 1 0 0 1-1-1V6.5a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

function LinkGlyph() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 14.5 14.5 9.5" />
      <path d="M11 6.5 12.4 5a3.5 3.5 0 0 1 5 5L16 11.4" />
      <path d="M13 17.5 11.6 19a3.5 3.5 0 0 1-5-5L8 12.6" />
    </svg>
  );
}

function InstagramGlyph() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="#fff" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x={3.5} y={3.5} width={17} height={17} rx={5} />
      <circle cx={12} cy={12} r={4} />
      <circle cx={17} cy={7} r={0.6} fill="#fff" stroke="none" />
    </svg>
  );
}

function BandGlyph() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="#fff">
      <path d="M6 16.5c1.4-3.6 3.6-8 6-8 1.6 0 2.3 1.6 1.6 3-1 2-4.2 3.6-4.2 5.6 0 1 .8 1.6 1.8 1.6 2 0 4-2.2 5.4-5.4l1.8.9c-1.7 4-4.4 6.8-7.6 6.8-2.5 0-4.4-1.6-4.4-3.9 0-.2 0-.4.05-.6l-.4.9-2-.9Z" />
    </svg>
  );
}

const shareTargets: ShareTarget[] = [
  { id: "kakao", label: "카카오톡", bg: "#FEE500", render: KakaoTalkGlyph },
  { id: "message", label: "문자", bg: "#8B95A1", render: MessageGlyph },
  { id: "link", label: "링크 복사", bg: "var(--gradient-primary)", render: LinkGlyph },
  { id: "instagram", label: "인스타그램", bg: "linear-gradient(135deg, #f9ce34, #ee2a7b 55%, #6228d7)", render: InstagramGlyph },
  { id: "band", label: "밴드", bg: "#7ACC29", render: BandGlyph },
  { id: "mail", label: "이메일", bg: "#6B7280", render: () => <Icon name="mail" style={{ width: 20, height: 20, color: "#fff" }} /> },
];

const slideUp = keyframes`
  from {
    transform: translateY(16px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(10, 8, 20, 0.5);
  z-index: 100;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const Sheet = styled.div`
  width: 100%;
  max-width: var(--app-max-width);
  background: var(--color-white);
  border-radius: 24px 24px 0 0;
  padding: var(--space-3) var(--space-5) var(--space-6);
  animation: ${slideUp} 0.22s cubic-bezier(0.22, 0.85, 0.3, 1);
`;

const Handle = styled.div`
  width: 36px;
  height: 4px;
  border-radius: var(--radius-full);
  background: var(--color-border-strong);
  margin: 0 auto var(--space-4);
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-4);
`;

const HeadTitle = styled.p`
  font-size: 15px;
  font-weight: 700;
  color: var(--color-text);
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  font-size: 20px;
  line-height: 1;
  color: var(--color-text-sub);
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 12px var(--space-4);
  background: var(--color-badge-gray-bg);
  border-radius: var(--radius-full);
  color: var(--color-text-placeholder);
  margin-bottom: var(--space-5);

  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
`;

const SearchInput = styled.input`
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

const TargetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-4) var(--space-2);
`;

const TargetButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const TargetIcon = styled.span<{ $bg: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: var(--radius-full);
  background: ${(props) => props.$bg};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const TargetLabel = styled.span`
  font-size: 11px;
  color: var(--color-text-sub);
`;

const EmptyState = styled.p`
  padding: var(--space-6) 0;
  text-align: center;
  font-size: 13px;
  color: var(--color-text-placeholder);
`;

/** "공유하기" 버튼을 누르면 화면 하단에서 올라오는 공유 대상 시트 (카카오톡 포함, 이름으로 검색 가능. 실제 공유 연동은 없고 UI만 동작) */
export function ShareSheet() {
  const { isOpen, query, setQuery, closeShare } = useShareSheet();

  const filtered = useMemo(
    () => shareTargets.filter((t) => t.label.toLowerCase().includes(query.trim().toLowerCase())),
    [query],
  );

  if (!isOpen) return null;

  return (
    <Backdrop onClick={closeShare}>
      <Sheet onClick={(e) => e.stopPropagation()}>
        <Handle />
        <Head>
          <HeadTitle>공유하기</HeadTitle>
          <CloseButton type="button" aria-label="닫기" onClick={closeShare}>
            ×
          </CloseButton>
        </Head>
        <SearchBox>
          <Icon name="search" />
          <SearchInput
            type="text"
            placeholder="공유 대상 검색 (카카오톡 등)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </SearchBox>
        {filtered.length > 0 ? (
          <TargetGrid>
            {filtered.map((t) => {
              const Glyph = t.render;
              return (
                <TargetButton key={t.id} type="button" onClick={closeShare}>
                  <TargetIcon $bg={t.bg}>
                    <Glyph />
                  </TargetIcon>
                  <TargetLabel>{t.label}</TargetLabel>
                </TargetButton>
              );
            })}
          </TargetGrid>
        ) : (
          <EmptyState>검색 결과가 없어요</EmptyState>
        )}
      </Sheet>
    </Backdrop>
  );
}
