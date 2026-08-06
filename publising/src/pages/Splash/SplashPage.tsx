// org/splash.html + splash.js 이식: 진입 시 progress bar 애니메이션 후 /login으로 자동 이동
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ProgressCaption,
  ProgressFill,
  ProgressTrack,
  Slogan,
  SplashCenter,
  SplashLogo,
  SplashMain,
  SplashPageWrap,
  SplashProgress,
} from './styles'

const PROGRESS_DURATION_MS = 2400 // splash.css의 transition 시간과 동일하게 유지
const REDIRECT_BUFFER_MS = 300 // 애니메이션 종료 후 자연스러운 여유 시간
const NEXT_PATH = '/login'

export function SplashPage() {
  const navigate = useNavigate()
  const [filled, setFilled] = useState(false)

  useEffect(() => {
    // 다음 프레임에서 width를 100%로 바꿔야 CSS transition이 정상 동작함
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => setFilled(true))
      return () => cancelAnimationFrame(raf2)
    })

    const timer = window.setTimeout(() => {
      navigate(NEXT_PATH, { replace: true })
    }, PROGRESS_DURATION_MS + REDIRECT_BUFFER_MS)

    return () => {
      cancelAnimationFrame(raf1)
      window.clearTimeout(timer)
    }
  }, [navigate])

  return (
    <SplashPageWrap>
      <SplashMain>
        <SplashCenter>
          <SplashLogo src="/img/logo.png" alt="NOLI" />
          <Slogan>지금 즐기는 나만의 공연</Slogan>
        </SplashCenter>
      </SplashMain>

      <SplashProgress>
        <ProgressTrack>
          <ProgressFill $filled={filled} />
        </ProgressTrack>
        <ProgressCaption>Initializing Experience</ProgressCaption>
      </SplashProgress>
    </SplashPageWrap>
  )
}
