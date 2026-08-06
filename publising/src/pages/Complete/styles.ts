// org/complete.css 이식
import styled from 'styled-components'

export const CompletePageWrap = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: linear-gradient(175deg, #fbefea 0%, #fdf3ee 45%, #fbefea 100%);
`

export const DotParticles = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
`

export const Dot = styled.span<{ $top: string; $left: string; $size: string; $color: string; $opacity: number }>`
  position: absolute;
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  border-radius: 50%;
  background: ${({ $color }) => $color};
  opacity: ${({ $opacity }) => $opacity};
`

export const CompleteTopbar = styled.header`
  position: relative;
  z-index: 1;
  padding: 18px 20px 0;
`

export const StepLabel = styled.p`
  margin-top: 10px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSub};
`

export const CompleteContent = styled.main`
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px 24px 24px;
`

export const CompleteMessage = styled.section`
  text-align: center;
  margin-bottom: 36px;
`

export const CompleteLogo = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin: 0 auto 16px;
`

export const CompleteTitle = styled.h1`
  font-size: 24px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 10px;
`

export const CompleteSub = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSub};
`

export const TasteCard = styled.section`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.card};
  padding: 26px 24px;
  margin-bottom: 22px;
`

export const TasteLabel = styled.p`
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: ${({ theme }) => theme.colors.primaryStrong};
  margin-bottom: 10px;
`

export const TasteTitle = styled.h2`
  font-size: 18px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.4;
  margin-bottom: 18px;
`

export const TastePosterRow = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  scrollbar-width: none;
  margin-bottom: 18px;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const TastePosterItem = styled.div`
  flex-shrink: 0;
  width: 96px;
`

export const TastePoster = styled.div`
  width: 96px;
  height: 128px;
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow.card};
  margin-bottom: 8px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const TastePosterTitle = styled.p`
  font-size: 12.5px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

export const TasteTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

export const TasteTag = styled.span`
  padding: 7px 12px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background-color: ${({ theme }) => theme.colors.primarySoft};
  color: ${({ theme }) => theme.colors.primaryStrong};
  font-size: 12px;
  font-weight: 700;
`

export const CompleteNote = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSub};
  line-height: 1.6;
  padding: 0 4px;
`

export const CompleteCta = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px 24px calc(20px + env(safe-area-inset-bottom, 0px));
`
