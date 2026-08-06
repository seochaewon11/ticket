// common.css의 .badge / .badge-primary / .badge-frost 이식
import styled, { css } from 'styled-components'

export type BadgeVariant = 'primary' | 'frost'

const variantStyles = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.primaryStrong};
    color: ${({ theme }) => theme.colors.white};
  `,
  frost: css`
    background-color: rgba(255, 255, 255, 0.85);
    color: ${({ theme }) => theme.colors.text};
    backdrop-filter: blur(4px);
  `,
}

export const Badge = styled.span<{ $variant?: BadgeVariant }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.radius.pill};
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;

  ${({ $variant = 'primary' }) => variantStyles[$variant]}
`
