// org/splash.css 이식
import styled from 'styled-components'

export const SplashPageWrap = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 32px;
  background: linear-gradient(165deg, #dcd2fb 0%, #e9dcee 30%, #f3e3e4 60%, #fbede6 100%);
  overflow: hidden;
`

// 로고 + 슬로건 영역을 화면 정중앙(진행바 영역 제외)에 배치
export const SplashMain = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const SplashCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

export const SplashLogo = styled.img`
  width: 300px;
  height: 300px;
  object-fit: contain;
`

export const Slogan = styled.p`
  margin-top: 22px;
  font-size: 25px;
  font-weight: 300;
  color: #928e92;
`

export const SplashProgress = styled.div`
  width: 100%;
  padding-bottom: 64px;
`

export const ProgressTrack = styled.div`
  width: 100%;
  height: 4px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background-color: rgba(124, 92, 252, 0.15);
  overflow: hidden;
`

export const ProgressFill = styled.div<{ $filled: boolean }>`
  width: ${({ $filled }) => ($filled ? '100%' : '0%')};
  height: 100%;
  border-radius: ${({ theme }) => theme.radius.pill};
  background-color: ${({ theme }) => theme.colors.primaryStrong};
  transition: width 2.4s linear;
`

export const ProgressCaption = styled.p`
  margin-top: 14px;
  text-align: center;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSub};
`
