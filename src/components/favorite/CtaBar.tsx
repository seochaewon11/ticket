import type { ReactNode } from "react";
import styled from "styled-components";

const Wrap = styled.div`
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 100%;
  max-width: var(--app-max-width);
  padding: var(--space-4) var(--space-5) calc(var(--space-5) + env(safe-area-inset-bottom));
  background: linear-gradient(to top, var(--color-white) 65%, rgba(255, 255, 255, 0));
  z-index: 30;
`;

const Button = styled.button<{ $disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 13px 16px;
  border-radius: var(--radius-full);
  font-size: 14px;
  font-weight: 700;
  background: var(--gradient-primary);
  color: var(--color-white);
  box-shadow: var(--shadow-float);
  transition: transform 0.15s ease, opacity 0.15s ease;

  &:active {
    transform: scale(0.98);
  }

  ${(props) =>
    props.$disabled &&
    `
      opacity: 0.45;
      pointer-events: none;
      box-shadow: none;
    `}
`;

export interface CtaBarProps {
  children: ReactNode;
  disabled?: boolean;
  onClick: () => void;
}

/** org/css/favorite.css의 .favorite-cta(하단 고정 CTA) 이식 */
export function CtaBar({ children, disabled = false, onClick }: CtaBarProps) {
  return (
    <Wrap>
      <Button type="button" disabled={disabled} $disabled={disabled} onClick={onClick}>
        {children}
      </Button>
    </Wrap>
  );
}
