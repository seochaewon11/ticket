// org/artist.html + artist.js 이식 (관심 아티스트 2/3)
// 완료 시 complete.html로 이동 (기존과 동일한 흐름)
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppShell } from '../../components/layout/AppShell'
import { StepProgress } from '../../components/layout/StepProgress'
import { Button } from '../../components/common/Button'
import { Icon } from '../../components/common/icon'
import { useNoliData } from '../../hooks/useNoliData'
import { ARTISTS } from '../../data/constants'
import { ArtistGrid } from './components/ArtistGrid'
import { SearchInput } from './components/SearchInput'
import {
  ArtistCta,
  ArtistPageWrap,
  ArtistTitle,
  ArtistTopbar,
  ArtistTopbarRow,
  BackBtn,
  MiniLogo,
  StepLabel,
  TopbarSpacer,
} from './styles'

export function ArtistPage() {
  const navigate = useNavigate()
  const { userPreference, updateFavoriteArtists } = useNoliData()

  const [selectedIds, setSelectedIds] = useState<string[]>(userPreference.favoriteArtistIds || [])
  const [keyword, setKeyword] = useState('')

  const filteredArtists = useMemo(() => {
    const trimmed = keyword.trim().toLowerCase()
    if (!trimmed) return ARTISTS
    return ARTISTS.filter((a) => a.name.toLowerCase().includes(trimmed))
  }, [keyword])

  function toggleSelection(id: string) {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]))
  }

  function handleComplete() {
    if (selectedIds.length === 0) return
    updateFavoriteArtists(selectedIds)
    navigate('/complete')
  }

  const hasSelection = selectedIds.length > 0

  return (
    <AppShell>
      <ArtistPageWrap>
        <ArtistTopbar>
          <ArtistTopbarRow>
            <BackBtn type="button" aria-label="뒤로가기" onClick={() => navigate(-1)}>
              <Icon name="back" strokeWidth={2.2} />
            </BackBtn>
            <MiniLogo src="/img/logo.png" alt="NOLI" />
            <TopbarSpacer aria-hidden="true" />
          </ArtistTopbarRow>
          <StepProgress currentStep={2} totalSteps={3} />
          <StepLabel>Step 2 of 3</StepLabel>
        </ArtistTopbar>

        <ArtistTitle>
          <h2>
            좋아하는 아티스트가
            <br />
            있나요?
          </h2>
          <p>선택하신 아티스트의 공연 소식을 가장 먼저 알려드릴게요.</p>
        </ArtistTitle>

        <SearchInput value={keyword} onChange={setKeyword} />

        <ArtistGrid artists={filteredArtists} selectedIds={selectedIds} onToggle={toggleSelection} />

        <ArtistCta>
          <Button type="button" $variant={hasSelection ? 'primary' : 'disabled'} disabled={!hasSelection} onClick={handleComplete}>
            설정 완료
          </Button>
        </ArtistCta>
      </ArtistPageWrap>
    </AppShell>
  )
}
