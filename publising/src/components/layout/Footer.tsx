// common.css의 .bottom-nav / .nav-item 이식.
// 원본은 화면마다 active 탭이 하드코딩돼 있었지만, React 버전은 현재 라우트로 자동 판별한다.
// (작업계획.md 2-6: 홈→/home, 탐색→/add, 캘린더→/calendar, 분석→/analysis, 프로필→/mypage)
import styled, { css } from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { Icon, type IconName } from '../common/icon'

interface NavItemDef {
  label: string
  icon: IconName
  path: string
}

const NAV_ITEMS: NavItemDef[] = [
  { label: '홈', icon: 'home', path: '/home' },
  { label: '탐색', icon: 'search', path: '/add' },
  { label: '캘린더', icon: 'calendar', path: '/calendar' },
  { label: '분석', icon: 'analysisChart', path: '/analysis' },
  { label: '마이페이지', icon: 'profile', path: '/mypage' },
]

// detail/add/analysis처럼 CTA 액션바 안에 탭바가 함께 들어가는 화면을 위한 변형
const staticVariant = css`
  position: static;
  transform: none;
  box-shadow: none;
  padding-top: 16px;
`

const Nav = styled.nav<{ $variant: 'fixed' | 'static' }>`
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 100%;
  max-width: ${({ theme }) => theme.layout.appMaxWidth};
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: rgba(232, 221, 255, 0.8);
  border-radius: ${({ theme }) => theme.radius.lg} ${({ theme }) => theme.radius.lg} 0 0;
  padding: 10px 8px calc(10px + env(safe-area-inset-bottom, 0px));
  box-shadow: ${({ theme }) => theme.shadow.nav};
  z-index: 10;

  ${({ $variant }) => $variant === 'static' && staticVariant}
`

const NavItem = styled(Link)<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  flex: 1;
  padding: 6px 4px;
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.textMute};
  background-color: transparent;
  transition:
    color 0.2s ease,
    background-color 0.2s ease;

  svg {
    width: 20px;
    height: 20px;
    transition:
      stroke 0.2s ease,
      fill 0.2s ease;
  }

  ${({ $active, theme }) =>
    $active &&
    css`
      color: ${theme.colors.white};
      background-color: ${theme.colors.primary};

      svg {
        stroke: ${theme.colors.white};
        fill: ${theme.colors.white};
      }
    `}
`

const NavLabel = styled.span`
  font-size: 11px;
  font-weight: 600;
`

interface FooterProps {
  /** detail/add/analysis처럼 CTA 액션바 안에 위치할 때 'static' */
  variant?: 'fixed' | 'static'
}

export function Footer({ variant = 'fixed' }: FooterProps) {
  const { pathname } = useLocation()

  return (
    <Nav $variant={variant} aria-label="주요 메뉴">
      {NAV_ITEMS.map((item) => {
        const active = pathname.startsWith(item.path)
        return (
          <NavItem key={item.path} to={item.path} $active={active} aria-current={active ? 'page' : undefined}>
            <Icon name={item.icon} size={20} />
            <NavLabel>{item.label}</NavLabel>
          </NavItem>
        )
      })}
    </Nav>
  )
}
