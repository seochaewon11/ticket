// org/analysis.html + analysis.js 이식 (상세 리포트)
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppShell } from '../../components/layout/AppShell'
import { BackTopbar } from '../../components/layout/BackTopbar'
import { Footer } from '../../components/layout/Footer'
import { Button } from '../../components/common/Button'
import { useNoliData } from '../../hooks/useNoliData'
import { TrendChart } from './components/TrendChart'
import { GenreDonut } from './components/GenreDonut'
import { ArtistRanking } from './components/ArtistRanking'
import {
  AnalysisActionBar,
  AnalysisPageWrap,
  CountNumber,
  CountUnit,
  GenreDistributionRow,
  ReportCard,
  ShareReportBtn,
  Toast,
  TrendCount,
  TrendHeader,
} from './styles'

export function AnalysisPage() {
  const navigate = useNavigate()
  const { getViewingTrend, getGenreDistribution, getTopArtistsRanking } = useNoliData()
  const [toastVisible, setToastVisible] = useState(false)
  const toastTimer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(toastTimer.current), [])

  const trend = getViewingTrend()
  const genreDistribution = getGenreDistribution()
  const artistRanking = getTopArtistsRanking()

  function showToast() {
    setToastVisible(true)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToastVisible(false), 1800)
  }

  async function handleShare() {
    const shareText = `NOLI 상세 리포트 - ${window.location.href}`
    try {
      await navigator.clipboard?.writeText(shareText)
    } catch {
      // 클립보드 접근이 막혀도 원본과 동일하게 토스트는 보여준다
    }
    showToast()
  }

  return (
    <AppShell>
      <AnalysisPageWrap>
        <BackTopbar
          variant="title"
          title="상세 리포트"
          onBack={() => navigate(-1)}
          rightIcon="share"
          onRightClick={handleShare}
        />

        <ReportCard>
          <TrendHeader>
            <div>
              <h3>관람 트렌드</h3>
              <p>지난 6개월간의 기록입니다</p>
            </div>
            <TrendCount>
              <CountNumber>{trend.totalCount}</CountNumber>
              <CountUnit>회 관람</CountUnit>
            </TrendCount>
          </TrendHeader>
          <TrendChart trend={trend} />
        </ReportCard>

        <ReportCard>
          <h3>장르별 상세 분포</h3>
          <GenreDistributionRow>
            <GenreDonut data={genreDistribution} />
          </GenreDistributionRow>
        </ReportCard>

        <ReportCard>
          <h3 style={{ marginBottom: 14 }}>최애 아티스트 랭킹</h3>
          <ArtistRanking list={artistRanking} />
        </ReportCard>

        <Toast $visible={toastVisible}>링크가 복사되었습니다 📋</Toast>

        <AnalysisActionBar>
          <ShareReportBtn>
            <Button type="button" $variant="primary" onClick={handleShare}>
              리포트 친구에게 공유하기
            </Button>
          </ShareReportBtn>
          <Footer variant="static" />
        </AnalysisActionBar>
      </AnalysisPageWrap>
    </AppShell>
  )
}
