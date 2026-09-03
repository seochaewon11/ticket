import styled, { css } from "styled-components";

/**
 * org/css/common.css의 공통 재사용 컴포넌트(칩/버튼/카드/섹션 등)를
 * styled-components 프리미티브로 이식. main/detail/calendar/report/profile 등
 * 여러 화면에서 공통으로 재사용한다.
 */

/**
 * 클릭 가능한 카드/타일(카테고리 카드, 분위기 칩, 아티스트 아바타, 포스터 카드 등)에
 * 공통으로 적용하는 hover/press "튀어나오는" 피드백. CategoryGrid 카드에서 처음 도입한
 * 인터랙션을 전 화면의 카드형 요소에 일관되게 재사용하기 위한 믹스인.
 */
export const cardPopFeedback = css`
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease;

  &:active {
    transform: scale(1.06);
  }

  @media (hover: hover) {
    &:hover {
      transform: scale(1.04);
    }
  }
`;

/* ---------- Pill / badge ---------- */
export type PillVariant = "gray" | "purple" | "outline" | "pink" | "onImage";

const pillVariantStyle: Record<PillVariant, string> = {
  gray: "background: var(--color-badge-gray-bg); color: var(--color-badge-gray-text);",
  purple: "background: var(--color-primary-soft); color: var(--color-primary-dark);",
  outline: "background: transparent; border: 1px solid var(--color-border-strong); color: var(--color-text-sub);",
  pink: "background: var(--color-badge-pink-bg); color: var(--color-badge-pink-text);",
  onImage: "background: rgba(255, 255, 255, 0.92); color: var(--color-text);",
};

export const Pill = styled.span<{ $variant: PillVariant }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 5px 10px;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  ${(props) => pillVariantStyle[props.$variant]}
`;

/* ---------- Icon button ---------- */
export const IconButton = styled.button<{ $float?: boolean; $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: var(--radius-full);
  background: var(--color-primary-softer);
  color: var(--color-primary);
  flex-shrink: 0;

  svg {
    width: 16px;
    height: 16px;
  }

  ${(props) =>
    props.$float &&
    `
      width: 36px;
      height: 36px;
      background: rgba(255, 255, 255, 0.9);
      color: var(--color-text);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
    `}

  ${(props) => props.$float && props.$active && "color: var(--color-primary);"}
`;

/* ---------- Outline button (알람설정하기 등) ---------- */
export const OutlineButton = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  padding: 13px 16px;
  border-radius: var(--radius-full);
  font-size: 14px;
  font-weight: 700;
  background: var(--color-white);
  color: var(--color-primary);
  border: 1.5px solid var(--color-primary-soft);
  transition: transform 0.15s ease, opacity 0.15s ease;

  &:active {
    transform: scale(0.98);
  }

  ${(props) =>
    props.$active &&
    `
      background: var(--color-primary-soft);
      border-color: var(--color-primary-soft);
    `}
`;

/* ---------- Card ---------- */
export const Card = styled.div`
  background: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
`;

/* ---------- Section ---------- */
export const Section = styled.section`
  padding: var(--space-6) var(--space-5) 0;
`;

export const SectionHead = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: var(--space-4);
`;

export const SectionTitle = styled.h2`
  font-size: 17px;
  font-weight: 700;
  line-height: 1.4;
  color: var(--color-text);

  strong {
    color: var(--color-primary);
  }
`;

export const SectionActions = styled.div`
  display: flex;
  gap: var(--space-2);
  flex-shrink: 0;
  margin-top: 2px;
`;

/* ---------- 가로 스크롤 컨테이너 ---------- */
export const ScrollX = styled.div`
  display: flex;
  gap: var(--space-3);
  overflow-x: auto;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;
