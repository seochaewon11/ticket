// org/add.html + add.js 이식 (취향설정 1/3)
// 온보딩 재연결: 완료 시 artist.html로 이동 (작업계획.md 2-3)
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppShell } from '../../components/layout/AppShell'
import { BackTopbar } from '../../components/layout/BackTopbar'
import { StepProgress } from '../../components/layout/StepProgress'
import { Footer } from '../../components/layout/Footer'
import { Button } from '../../components/common/Button'
import { Icon } from '../../components/common/icon'
import { useNoliData } from '../../hooks/useNoliData'
import { GenreGrid } from './components/GenreGrid'
import { MoodTags } from './components/MoodTags'
import { ActionButtons, AddCta, AddPageWrap, AddTitle, MoodSection, StepMeta, StepLabel, StepProgressWrap } from './styles'

function toggleInList(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
}

export function AddPage() {
  const navigate = useNavigate()
  const { userPreference, updatePreference } = useNoliData()

  // 기존에 저장된 취향이 있다면 선택 상태를 미리 반영
  const [selectedGenres, setSelectedGenres] = useState<string[]>(userPreference.favoriteGenres || [])
  const [selectedMoods, setSelectedMoods] = useState<string[]>(userPreference.favoriteMoods || [])

  function handleSubmit() {
    updatePreference(selectedGenres, selectedMoods)
    navigate('/artist')
  }

  return (
    <AppShell>
      <AddPageWrap>
        <BackTopbar variant="logo" onBack={() => navigate(-1)} />
        <StepProgressWrap>
          <StepProgress currentStep={1} totalSteps={3} />
        </StepProgressWrap>
        <StepMeta>
          <StepLabel>Step 1 of 3</StepLabel>
        </StepMeta>

        <AddTitle>
          <h2>어떤 공연을 좋아하세요?</h2>
          <p>취향에 맞는 공연을 추천해 드릴게요.</p>
        </AddTitle>

        <GenreGrid selected={selectedGenres} onToggle={(g) => setSelectedGenres((prev) => toggleInList(prev, g))} />

        <MoodSection>
          <h3>좋아하는 분위기는?</h3>
          <MoodTags selected={selectedMoods} onToggle={(m) => setSelectedMoods((prev) => toggleInList(prev, m))} />
        </MoodSection>

        <AddCta>
          <ActionButtons>
            <Button type="button" $variant="primary" onClick={handleSubmit}>
              다음 단계로
              <Icon name="arrowRight" size={18} />
            </Button>
          </ActionButtons>
          <Footer variant="static" />
        </AddCta>
      </AddPageWrap>
    </AppShell>
  )
}
