// org/analysis.css 이식
import styled from 'styled-components'

export const AnalysisPageWrap = styled.div`
  padding-bottom: 158px; /* 하단 고정 액션바 + 탭바 높이만큼 여유 */
`

export const AnalysisTopbar = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px 20px 0;

  h1 {
    font-size: 17px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.text};
  }
`

export const IconBtnPlain = styled.button<{ $side: 'left' | 'right' }>`
  position: absolute;
  ${({ $side }) => ($side === 'left' ? 'left: 20px;' : 'right: 20px;')}
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text};

  svg {
    width: 21px;
    height: 21px;
  }
`

export const ReportCard = styled.section`
  margin: 20px 20px 0;
  padding: 20px 18px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.card};

  h3 {
    font-size: 16.5px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.text};
  }
`

export const TrendHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 30px;

  p {
    font-size: 12.5px;
    color: ${({ theme }) => theme.colors.textSub};
    margin-top: 4px;
  }
`

export const TrendCount = styled.div`
  text-align: right;
  white-space: nowrap;
`

export const CountNumber = styled.span`
  font-size: 21px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`

export const CountUnit = styled.span`
  font-size: 12.5px;
  color: ${({ theme }) => theme.colors.textSub};
  margin-left: 3px;
`

export const TrendChartWrap = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  height: 110px;
  padding-top: 24px;
`

export const TrendBarCol = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  position: relative;
`

export const TrendBar = styled.div<{ $current: boolean; $heightPct: number }>`
  width: 100%;
  max-width: 26px;
  border-radius: 10px 10px 4px 4px;
  background-color: ${({ theme, $current }) => ($current ? theme.colors.primaryStrong : theme.colors.disabledBg)};
  transition: height 0.3s ease;
  height: ${({ $heightPct }) => $heightPct}%;
`

export const NowBadge = styled.span`
  position: absolute;
  top: -24px;
  padding: 2px 9px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background-color: ${({ theme }) => theme.colors.primaryStrong};
  color: ${({ theme }) => theme.colors.white};
  font-size: 9.5px;
  font-weight: 800;
  letter-spacing: 0.5px;
`

export const TrendMonthLabel = styled.span`
  margin-top: 8px;
  font-size: 11.5px;
  color: ${({ theme }) => theme.colors.textSub};
`

export const GenreDistributionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;
  margin-top: 18px;
`

export const DonutWrap = styled.div`
  position: relative;
  width: 128px;
  height: 128px;
  flex-shrink: 0;

  svg {
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }
`

export const DonutCenter = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`

export const DonutPercent = styled.span`
  font-size: 20px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`

export const DonutGenreLabel = styled.span`
  font-size: 11.5px;
  color: ${({ theme }) => theme.colors.textSub};
  margin-top: 2px;
`

export const GenreLegend = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const LegendRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const LegendDot = styled.span<{ $color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
  background-color: ${({ $color }) => $color};
`

export const LegendLabel = styled.span`
  flex: 1;
  font-size: 13.5px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
`

export const LegendPercent = styled.span`
  font-size: 13.5px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`

export const ArtistRankingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const ArtistRankRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.card};
`

export const RankBadge = styled.span<{ $isFirst: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 800;
  flex-shrink: 0;
  background-color: ${({ theme, $isFirst }) => ($isFirst ? theme.colors.primaryStrong : theme.colors.disabledBg)};
  color: ${({ theme, $isFirst }) => ($isFirst ? theme.colors.white : theme.colors.textSub)};
`

export const ArtistRankPhoto = styled.span`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.primarySoft};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primaryStrong};
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const ArtistRankInfo = styled.div`
  flex: 1;
`

export const ArtistRankName = styled.p`
  font-size: 14.5px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 2px;
`

export const ArtistRankRole = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSub};
`

export const ArtistRankCount = styled.span`
  font-size: 14px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primaryStrong};
`

export const AnalysisActionBar = styled.div`
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 100%;
  max-width: ${({ theme }) => theme.layout.appMaxWidth};
  box-shadow: ${({ theme }) => theme.shadow.nav};
  z-index: 10;
`

export const ShareReportBtn = styled.div`
  margin: 14px 20px 10px;
`

export const Toast = styled.div<{ $visible: boolean }>`
  position: fixed;
  left: 50%;
  bottom: 150px;
  transform: translateX(-50%) translateY(${({ $visible }) => ($visible ? '0' : '10px')});
  background-color: rgba(30, 24, 40, 0.9);
  color: ${({ theme }) => theme.colors.white};
  padding: 10px 18px;
  border-radius: ${({ theme }) => theme.radius.pill};
  font-size: 13px;
  font-weight: 600;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: none;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
  z-index: 20;
  white-space: nowrap;
`
