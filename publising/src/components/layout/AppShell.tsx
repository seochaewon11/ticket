// common.css의 .app 컨테이너(모바일 우선, max-width 480px) 이식
import styled from 'styled-components'
import type { ReactNode } from 'react'

const Shell = styled.div`
  position: relative;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.appMaxWidth};
  min-height: 100vh;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.accent};
  overflow-x: hidden;
`

export function AppShell({ children, className }: { children: ReactNode; className?: string }) {
  return <Shell className={className}>{children}</Shell>
}
