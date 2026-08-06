// org/complete.html + complete.js 이식 (설정 완료 3/3)
import { useNavigate } from 'react-router-dom'
import { AppShell } from '../../components/layout/AppShell'
import { StepProgress } from '../../components/layout/StepProgress'
import { Button } from '../../components/common/Button'
import { Icon } from '../../components/common/icon'
import { useNoliData } from '../../hooks/useNoliData'
import {
  CompleteContent,
  CompleteCta,
  CompleteLogo,
  CompleteMessage,
  CompleteNote,
  CompletePageWrap,
  CompleteSub,
  CompleteTitle,
  CompleteTopbar,
  Dot,
  DotParticles,
  StepLabel,
  TasteCard,
  TasteLabel,
  TasteTag,
  TasteTags,
  TasteTitle,
} from './styles'

// 배경 장식용 도트 파티클 좌표 (org/complete.html에 인라인 style로 박혀 있던 값 그대로 이식)
const PARTICLES = [
  { top: '6%', left: '48%', size: '6px', color: '#A78BFA', opacity: 0.55 },
  { top: '14%', left: '13%', size: '9px', color: '#A78BFA', opacity: 0.35 },
  { top: '20%', left: '82%', size: '6px', color: '#F0A6B8', opacity: 0.45 },
  { top: '28%', left: '6%', size: '4px', color: '#F0A6B8', opacity: 0.5 },
  { top: '33%', left: '92%', size: '7px', color: '#C9B8FB', opacity: 0.4 },
  { top: '40%', left: '22%', size: '5px', color: '#A78BFA', opacity: 0.3 },
  { top: '38%', left: '70%', size: '4px', color: '#F6C9C0', opacity: 0.55 },
  { top: '66%', left: '9%', size: '6px', color: '#C9B8FB', opacity: 0.4 },
  { top: '70%', left: '88%', size: '5px', color: '#A78BFA', opacity: 0.4 },
  { top: '80%', left: '16%', size: '4px', color: '#F0A6B8', opacity: 0.5 },
  { top: '85%', left: '80%', size: '8px', color: '#F6C9C0', opacity: 0.35 },
  { top: '92%', left: '40%', size: '5px', color: '#A78BFA', opacity: 0.4 },
  { top: '11%', left: '63%', size: '4px', color: '#C9B8FB', opacity: 0.45 },
  { top: '58%', left: '50%', size: '3px', color: '#F0A6B8', opacity: 0.4 },
]

export function CompletePage() {
  const navigate = useNavigate()
  const { user, generateTasteTags } = useNoliData()
  const tasteTags = generateTasteTags()

  function goToCalendar() {
    navigate('/calendar')
  }

  function goHome() {
    navigate('/home')
  }

  return (
    <AppShell>
      <CompletePageWrap>
        <DotParticles aria-hidden="true">
          {PARTICLES.map((p, i) => (
            <Dot key={i} $top={p.top} $left={p.left} $size={p.size} $color={p.color} $opacity={p.opacity} />
          ))}
        </DotParticles>

        <CompleteTopbar>
          <StepProgress currentStep={3} totalSteps={3} />
          <StepLabel>Step 3 of 3</StepLabel>
        </CompleteTopbar>

        <CompleteContent>
          <CompleteMessage>
            <CompleteLogo src="/img/logo.png" alt="NOLI" />
            <CompleteTitle>설정이 완료되었습니다!</CompleteTitle>
            <CompleteSub>이제 NOLI가 {user.name}님의 취향을 찾았어요.</CompleteSub>
          </CompleteMessage>

          <TasteCard>
            <TasteLabel>TASTE ANALYSIS</TasteLabel>
            <TasteTitle>{user.name}님을 위한 맞춤 공연을 준비했어요</TasteTitle>
            <TasteTags>
              {tasteTags.map((tag) => (
                <TasteTag key={tag}>{tag}</TasteTag>
              ))}
            </TasteTags>
          </TasteCard>

          <CompleteNote>{user.name} 님이 좋아할 만한 공연 정보들을 매일 아침 배달해 드릴게요! 💌</CompleteNote>
        </CompleteContent>

        <CompleteCta>
          <Button type="button" $variant="primary" onClick={goToCalendar}>
            공연 일정 바로가기
            <Icon name="arrowRight" size={18} />
          </Button>
          <Button type="button" $variant="outline" onClick={goHome}>
            홈으로 바로가기
          </Button>
        </CompleteCta>
      </CompletePageWrap>
    </AppShell>
  )
}
