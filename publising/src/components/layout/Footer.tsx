// common.css의 .bottom-nav / .nav-item 이식.
// 원본은 화면마다 active 탭이 하드코딩돼 있었지만, React 버전은 현재 라우트로 자동 판별한다.
// (작업계획.md 2-6: 홈→/home, 추천→/add, 캘린더→/calendar, 분석→/analysis, 프로필→/mypage)
// 상단 라인은 활성 탭 위치에 반원 노치가 파인 웨이브 형태이며, 활성 아이콘은 노치 위로 떠오른 원형 버튼으로 표시된다.
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
  { label: '추천', icon: 'search', path: '/add' },
  { label: '캘린더', icon: 'calendar', path: '/calendar' },
  { label: '분석', icon: 'analysisChart', path: '/analysis' },
  { label: '마이페이지', icon: 'profile', path: '/mypage' },
]

const ITEM_COUNT = NAV_ITEMS.length

// 웨이브 path 계산용 좌표계 (Nav의 실제 렌더 높이와 동일하게 맞춰 세로 왜곡을 없앤다)
const VB_WIDTH = 500
const VB_HEIGHT = 72
const NOTCH_HALF_WIDTH = 70
const NOTCH_DEPTH = 40
const CORNER_RADIUS = 26

function notchCenterX(index: number) {
  return ((index + 0.5) / ITEM_COUNT) * VB_WIDTH
}

// 활성 탭 위치에 반원 노치가 파이고 좌우 상단이 둥근 웨이브 path. index가 없으면(-1) 노치 없이 둥근 사각형.
function buildWavePath(index: number) {
  const r = CORNER_RADIUS
  const top = [
    `M0,${r}`,
    `Q0,0 ${r},0`,
  ]

  if (index >= 0) {
    const cx = notchCenterX(index)
    const nr = NOTCH_HALF_WIDTH
    const nd = NOTCH_DEPTH
    top.push(
      `L${cx - nr - 20},0`,
      `C${cx - nr},0 ${cx - nr},${nd} ${cx},${nd}`,
      `C${cx + nr},${nd} ${cx + nr},0 ${cx + nr + 20},0`,
    )
  }

  top.push(`L${VB_WIDTH - r},0`, `Q${VB_WIDTH},0 ${VB_WIDTH},${r}`)

  return [
    ...top,
    `L${VB_WIDTH},${VB_HEIGHT}`,
    `L0,${VB_HEIGHT}`,
    `Z`,
  ].join(' ')
}

// detail/add/analysis처럼 CTA 액션바 안에 탭바가 함께 들어가는 화면을 위한 변형
// position은 relative로 둬야 웨이브 svg/플로팅 버블의 absolute 기준점이 Nav 자신이 된다
const staticVariant = css`
  position: relative;
  transform: none;
  height: 64px;
`

const Nav = styled.nav<{ $variant: 'fixed' | 'static' }>`
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 100%;
  max-width: ${({ theme }) => theme.layout.appMaxWidth};
  height: 72px;
  z-index: 10;

  ${({ $variant }) => $variant === 'static' && staticVariant}
`

const WaveSvg = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  filter: drop-shadow(${({ theme }) => theme.shadow.nav});
  pointer-events: none;

  path {
    fill: rgba(232, 221, 255, 0.8);
    transition: d 0.35s cubic-bezier(0.65, 0, 0.35, 1);
  }
`

const FloatingBubble = styled.div`
  position: absolute;
  top: -20px;
  transform: translateX(-50%);
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primaryStrong};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadow.float};
  transition: left 0.35s cubic-bezier(0.65, 0, 0.35, 1);
  z-index: 2;
  pointer-events: none;

  svg {
    width: 22px;
    height: 22px;
  }
`

const NavRow = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  padding: 0 8px calc(6px + env(safe-area-inset-bottom, 0px));
`

const NavItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  flex: 1;
  height: 100%;
  color: ${({ theme }) => theme.colors.textMute};
`

const NavIconWrap = styled.span<{ $hidden: boolean }>`
  display: flex;
  opacity: ${({ $hidden }) => ($hidden ? 0 : 1)};
  transition: opacity 0.2s ease;

  svg {
    width: 20px;
    height: 20px;
  }
`

const NavLabel = styled.span<{ $hidden: boolean }>`
  font-size: 11px;
  font-weight: 600;
  opacity: ${({ $hidden }) => ($hidden ? 0 : 1)};
  transition: opacity 0.2s ease;
`

interface FooterProps {
  /** detail/add/analysis처럼 CTA 액션바 안에 위치할 때 'static' */
  variant?: 'fixed' | 'static'
}

export function Footer({ variant = 'fixed' }: FooterProps) {
  const { pathname } = useLocation()
  const activeIndex = NAV_ITEMS.findIndex((item) => pathname.startsWith(item.path))

  return (
    <Nav $variant={variant} aria-label="주요 메뉴">
      <WaveSvg viewBox={`0 0 ${VB_WIDTH} ${VB_HEIGHT}`} preserveAspectRatio="none" aria-hidden="true">
        <path d={buildWavePath(activeIndex)} />
      </WaveSvg>

      {activeIndex !== -1 && (
        <FloatingBubble style={{ left: `${((activeIndex + 0.5) / ITEM_COUNT) * 100}%` }}>
          <Icon name={NAV_ITEMS[activeIndex].icon} size={22} />
        </FloatingBubble>
      )}

      <NavRow>
        {NAV_ITEMS.map((item, i) => {
          const active = i === activeIndex
          return (
            <NavItem key={item.path} to={item.path} aria-current={active ? 'page' : undefined}>
              <NavIconWrap $hidden={active}>
                <Icon name={item.icon} size={20} />
              </NavIconWrap>
              <NavLabel $hidden={active}>{item.label}</NavLabel>
            </NavItem>
          )
        })}
      </NavRow>
    </Nav>
  )
}
