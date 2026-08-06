// org/mypage.html + mypage.js 이식 (마이페이지)
import { useNavigate } from 'react-router-dom'
import { AppShell } from '../../components/layout/AppShell'
import { LogoHeader } from '../../components/layout/LogoHeader'
import { Footer } from '../../components/layout/Footer'
import { Button } from '../../components/common/Button'
import { Icon, type IconName } from '../../components/common/icon'
import { useNoliData } from '../../hooks/useNoliData'
import { ProfileCard } from './components/ProfileCard'
import { DashboardCards } from './components/DashboardCards'
import { RecentScroll } from './components/RecentScroll'
import {
  FabTicket,
  LogoutWrap,
  MenuLabel,
  MenuList,
  MenuRow,
  MoreLink,
  MyPageWrap,
  RecentEmptyState,
  SectionBlock,
  SectionTitleRow,
} from './styles'

const MENU_ITEMS: { icon: IconName; label: string; path?: string }[] = [
  { icon: 'preference', label: '취향 프로필 수정', path: '/add' },
  { icon: 'settings', label: '설정' },
  { icon: 'headset', label: '고객 센터' },
  { icon: 'notice', label: '공지사항 및 약관' },
]

export function MyPage() {
  const navigate = useNavigate()
  const { user, getTasteDashboard, getRecentlyViewed } = useNoliData()
  const recentlyViewed = getRecentlyViewed()

  function handleLogout() {
    navigate('/login')
  }

  return (
    <AppShell>
      <MyPageWrap>
        <LogoHeader left="hamburger" right="bell" onRightClick={() => {}} onLeftClick={() => {}} />

        <ProfileCard user={user} />

        <SectionBlock>
          <h3>취향 대시보드</h3>
          <DashboardCards dashboard={getTasteDashboard()} />
        </SectionBlock>

        <SectionBlock>
          <SectionTitleRow>
            <h3>최근 본 공연</h3>
            <MoreLink
              href="#"
              onClick={(e) => {
                e.preventDefault()
                navigate('/play')
              }}
            >
              더보기 &gt;
            </MoreLink>
          </SectionTitleRow>
          {recentlyViewed.length > 0 ? (
            <RecentScroll items={recentlyViewed} />
          ) : (
            <RecentEmptyState>아직 본 공연이 없어요. 공연 상세 페이지를 둘러보면 여기에 기록돼요.</RecentEmptyState>
          )}
        </SectionBlock>

        <MenuList>
          {MENU_ITEMS.map((item) => (
            <MenuRow
              key={item.label}
              href="#"
              onClick={(e) => {
                e.preventDefault()
                if (item.path) navigate(item.path)
              }}
            >
              <Icon name={item.icon} size={20} className="menu-icon" />
              <MenuLabel>{item.label}</MenuLabel>
              <Icon name="chevronRight" size={16} className="chevron" />
            </MenuRow>
          ))}
        </MenuList>

        <LogoutWrap>
          <Button type="button" $variant="outline" onClick={handleLogout}>
            로그아웃
          </Button>
        </LogoutWrap>

        <FabTicket type="button" aria-label="빠른 메뉴" onClick={() => navigate('/play')}>
          <Icon name="ticket" />
        </FabTicket>

        <Footer />
      </MyPageWrap>
    </AppShell>
  )
}
