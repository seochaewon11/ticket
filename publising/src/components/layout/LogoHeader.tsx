// index/calendar/play/mypage의 "로고형 헤더" 3가지 변형을 이식
// - index: 로고 중앙 정렬 + 설정 버튼(절대 위치)
// - calendar: 뒤로가기 + 로고 + 알림 (space-between)
// - play/mypage: 햄버거 + 로고 + 알림 (space-between)
import styled from 'styled-components'
import { Icon, type IconName } from '../common/icon'

const CenteredHeader = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px 20px 8px;
`

const SplitHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px 8px;
`

const Logo = styled.img<{ $height: number }>`
  height: ${({ $height }) => $height}px;
  width: auto;
  object-fit: contain;
`

const IconBtn = styled.button<{ $absoluteRight?: boolean }>`
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text};

  ${({ $absoluteRight }) =>
    $absoluteRight &&
    `
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
    `}
`

export type LogoHeaderLeft = 'none' | 'back' | 'hamburger'
export type LogoHeaderRight = 'settings' | 'bell' | 'none'

interface LogoHeaderProps {
  left?: LogoHeaderLeft
  right?: LogoHeaderRight
  logoHeight?: number
  onBackClick?: () => void
  onLeftClick?: () => void
  onRightClick?: () => void
}

const LEFT_ICON: Record<Exclude<LogoHeaderLeft, 'none'>, IconName> = {
  back: 'back',
  hamburger: 'hamburger',
}

const RIGHT_ICON: Record<Exclude<LogoHeaderRight, 'none'>, IconName> = {
  settings: 'settings',
  bell: 'bell',
}

export function LogoHeader({
  left = 'none',
  right = 'none',
  logoHeight = 84,
  onBackClick,
  onLeftClick,
  onRightClick,
}: LogoHeaderProps) {
  const logo = <Logo src="/img/logo.png" alt="NOLI" $height={logoHeight} />

  // index 패턴: 좌측 요소 없이 로고가 완전히 중앙 정렬 + 우측 버튼은 절대 위치
  if (left === 'none') {
    return (
      <CenteredHeader>
        {logo}
        {right !== 'none' && (
          <IconBtn
            type="button"
            $absoluteRight
            aria-label={right === 'settings' ? '설정' : '알림'}
            onClick={onRightClick}
          >
            <Icon name={RIGHT_ICON[right]} />
          </IconBtn>
        )}
      </CenteredHeader>
    )
  }

  return (
    <SplitHeader>
      <IconBtn
        type="button"
        aria-label={left === 'back' ? '뒤로가기' : '메뉴'}
        onClick={left === 'back' ? onBackClick : onLeftClick}
      >
        <Icon name={LEFT_ICON[left]} />
      </IconBtn>
      {logo}
      {right !== 'none' ? (
        <IconBtn type="button" aria-label={right === 'settings' ? '설정' : '알림'} onClick={onRightClick}>
          <Icon name={RIGHT_ICON[right]} />
        </IconBtn>
      ) : (
        <span style={{ width: 34 }} aria-hidden="true" />
      )}
    </SplitHeader>
  )
}
