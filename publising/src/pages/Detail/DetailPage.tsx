// org/detail.html + detail.js 이식 (공연 상세)
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppShell } from '../../components/layout/AppShell'
import { Footer } from '../../components/layout/Footer'
import { Button } from '../../components/common/Button'
import { Icon, ICONS } from '../../components/common/icon'
import { useNoliData } from '../../hooks/useNoliData'
import { ReasonCard } from './components/ReasonCard'
import { InfoCard } from './components/InfoCard'
import { CastList } from './components/CastList'
import {
  ActionButtons,
  BtnIcon,
  CastSection,
  DetailActionBar,
  DetailContent,
  DetailPageWrap,
  EmptyState,
  HeroBottom,
  HeroImg,
  HeroTopbar,
  IconBtn,
  MatchBadge,
  MoreLink,
  PerfTagline,
  PerfTitle,
  PosterHero,
  PrevBtn,
  SectionHeader,
  StatusBadge,
  StatusBadgeWrap,
  SynopsisCard,
  SynopsisSection,
  SynopsisText,
  SynopsisToggle,
  TagChip,
  TagChips,
  TopbarRight,
} from './styles'

export function DetailPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { getPerformanceById, addToWishlist, recordView } = useNoliData()
  const [imgError, setImgError] = useState(false)
  const [synopsisExpanded, setSynopsisExpanded] = useState(false)

  const performance = getPerformanceById(id || 'perf_001')

  useEffect(() => {
    if (performance) recordView(performance.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [performance?.id])

  function goBack() {
    navigate(-1)
  }

  if (!performance) {
    return (
      <AppShell>
        <EmptyState>공연 정보를 찾을 수 없어요.</EmptyState>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <DetailPageWrap>
        <PosterHero $fallbackGradient={imgError}>
          {!imgError && (
            <HeroImg
              src={performance.posterUrl}
              alt="공연 포스터"
              onError={() => setImgError(true)}
            />
          )}

          <HeroTopbar>
            <IconBtn type="button" aria-label="뒤로가기" onClick={goBack}>
              <Icon name="back" strokeWidth={2.2} size={19} />
            </IconBtn>
            <TopbarRight>
              <IconBtn type="button" aria-label="공유">
                <Icon name="share" size={19} />
              </IconBtn>
              <IconBtn type="button" aria-label="알림">
                <Icon name="bell" size={19} />
              </IconBtn>
            </TopbarRight>
          </HeroTopbar>

          {performance.isRunning && (
            <StatusBadgeWrap>
              <StatusBadge>현재 상영 중</StatusBadge>
            </StatusBadgeWrap>
          )}

          <HeroBottom>
            <MatchBadge dangerouslySetInnerHTML={{
              __html: `<svg viewBox="0 0 24 24">${ICONS.heart.markup}</svg><span>내 취향 일치 ${performance.matchRate}%</span>`,
            }} />
            <PerfTitle>{performance.title}</PerfTitle>
            {performance.tagline && <PerfTagline>{performance.tagline}</PerfTagline>}
            <TagChips>
              {(performance.tags || []).map((tag) => (
                <TagChip key={tag}>{tag}</TagChip>
              ))}
            </TagChips>
          </HeroBottom>
        </PosterHero>

        <DetailContent>
          {performance.recommendReason && <ReasonCard reason={performance.recommendReason} />}

          <section>
            <SectionHeader>
              <h3>공연 상세 정보</h3>
              <MoreLink href="#">더보기</MoreLink>
            </SectionHeader>
            <InfoCard
              period={performance.period}
              runtimeText={performance.runtimeText}
              priceRangeText={performance.priceRangeText}
            />
          </section>

          <SynopsisSection>
            <SectionHeader>
              <h3>시놉시스</h3>
            </SectionHeader>
            <SynopsisCard>
              <SynopsisText $expanded={synopsisExpanded}>{performance.synopsis || ''}</SynopsisText>
              <SynopsisToggle
                type="button"
                $expanded={synopsisExpanded}
                onClick={() => setSynopsisExpanded((prev) => !prev)}
              >
                {synopsisExpanded ? '접기' : '더 보기'}
                <Icon name="chevronDown" strokeWidth={2.4} size={14} />
              </SynopsisToggle>
            </SynopsisCard>
          </SynopsisSection>

          {performance.cast && performance.cast.length > 0 && (
            <CastSection>
              <SectionHeader>
                <h3>출연진</h3>
                <MoreLink href="#">전체보기</MoreLink>
              </SectionHeader>
              <CastList cast={performance.cast} />
            </CastSection>
          )}
        </DetailContent>

        <DetailActionBar>
          <ActionButtons>
            <PrevBtn type="button" onClick={goBack}>
              이전
            </PrevBtn>
            <Button type="button" $variant="primary" onClick={() => addToWishlist(performance.id)}>
              <BtnIcon>🔖</BtnIcon>
              공연 보관함에 담기
            </Button>
          </ActionButtons>
          <Footer variant="static" />
        </DetailActionBar>
      </DetailPageWrap>
    </AppShell>
  )
}
