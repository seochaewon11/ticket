// org/index.html + index.js 이식 (메인 홈 화면)
import { useNavigate } from 'react-router-dom'
import { AppShell } from '../../components/layout/AppShell'
import { Footer } from '../../components/layout/Footer'
import { Button } from '../../components/common/Button'
import { Icon } from '../../components/common/icon'
import { useNoliData } from '../../hooks/useNoliData'
import { RecommendCard } from './components/RecommendCard'
import { PlaylistSummary } from './components/PlaylistSummary'
import {
  BtnIcon,
  CtaGroup,
  FabTicket,
  Header,
  HomePageWrap,
  Intro,
  LogoImg,
  MoreLink,
  PlaylistList,
  PlaylistSection,
  RecommendSection,
  SectionHeader,
  SectionTitle,
  SettingsBtn,
} from './styles'

export function HomePage() {
  const navigate = useNavigate()
  const { user, wishCount, watchedCount, getRecommendedPerformances, toggleLike, addToWishlist } = useNoliData()

  const performance = getRecommendedPerformances()[0]

  return (
    <AppShell>
      <HomePageWrap>
        <Header>
          <LogoImg src="/img/logo.png" alt="NOLI" />
          <SettingsBtn type="button" aria-label="설정">
            <Icon name="settings" strokeWidth={1.8} />
          </SettingsBtn>
        </Header>

        <main>
          <Intro>
            <h2>오늘의 추천</h2>
            <p>나의 감성을 채워줄 오늘의 무대</p>
          </Intro>

          <RecommendSection>
            <SectionHeader>
              <h3>{user.name}님 취향 추천</h3>
              <MoreLink href="#">더보기 &gt;</MoreLink>
            </SectionHeader>

            <RecommendCard performance={performance} onToggleLike={toggleLike} />

            <CtaGroup>
              <Button
                type="button"
                $variant="primary"
                onClick={() => {
                  if (!performance) return
                  addToWishlist(performance.id)
                  navigate('/play')
                }}
              >
                <BtnIcon>🔖</BtnIcon>
                공연 보관함에 담기
              </Button>
              <Button
                type="button"
                $variant="outline"
                onClick={() => performance && navigate(`/detail/${performance.id}`)}
              >
                공연 상세 정보 보기
              </Button>
            </CtaGroup>
          </RecommendSection>

          <PlaylistSection>
            <SectionTitle>나의 공연 플레이리스트</SectionTitle>
            <PlaylistList>
              <PlaylistSummary wishCount={wishCount} watchedCount={watchedCount} />
            </PlaylistList>
          </PlaylistSection>
        </main>

        <FabTicket type="button" aria-label="빠른 메뉴" onClick={() => navigate('/play')}>
          <Icon name="ticket" />
        </FabTicket>

        <Footer />
      </HomePageWrap>
    </AppShell>
  )
}
