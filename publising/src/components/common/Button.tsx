// common.css의 .btn / .btn-primary / .btn-outline / .btn-disabled 이식
import styled, { css } from 'styled-components'

export type ButtonVariant = 'primary' | 'outline' | 'disabled'

const variantStyles = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.primaryStrong};
    color: ${({ theme }) => theme.colors.white};
    box-shadow: ${({ theme }) => theme.shadow.float};

    &:disabled {
      background-color: ${({ theme }) => theme.colors.disabledBg};
      color: ${({ theme }) => theme.colors.disabledText};
      box-shadow: none;
      cursor: default;
    }
  `,
  outline: css`
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.primaryStrong};
    border: 1.5px solid ${({ theme }) => theme.colors.primaryStrong};
  `,
  disabled: css`
    background-color: ${({ theme }) => theme.colors.disabledBg};
    color: ${({ theme }) => theme.colors.disabledText};
    cursor: default;
  `,
}

export const Button = styled.button<{ $variant?: ButtonVariant }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 16px 20px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: 16px;
  font-weight: 700;
  transition:
    transform 0.15s ease,
    opacity 0.15s ease;

  &:active {
    transform: scale(0.98);
  }

  &:focus-visible {
    outline: none;
  }

  ${({ $variant = 'primary' }) => variantStyles[$variant]}
`
