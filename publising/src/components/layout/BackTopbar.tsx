// alarm/analysis(뒤로가기+제목형)와 add/artist(뒤로가기+미니로고형) 상단바 이식
import styled from 'styled-components'
import { Icon } from '../common/icon'

const TitleHeader = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px 20px 0;
`

const LogoHeaderBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px 8px;
`

const IconBtn = styled.button<{ $side: 'left' | 'right' }>`
  position: absolute;
  ${({ $side }) => ($side === 'left' ? 'left: 20px;' : 'right: 20px;')}
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text};
`

const StaticIconBtn = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text};
`

const Title = styled.h1`
  font-size: 17px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`

const MiniLogo = styled.img`
  width: 84px;
  height: 84px;
  object-fit: contain;
`

const Spacer = styled.div`
  width: 32px;
`

interface BackTopbarProps {
  onBack: () => void
  /** 'title': 뒤로가기+중앙 제목(+선택적 우측 아이콘) / 'logo': 뒤로가기+미니 로고(+step-progress는 별도 컴포넌트) */
  variant?: 'title' | 'logo'
  title?: string
  rightIcon?: 'share'
  onRightClick?: () => void
}

export function BackTopbar({ onBack, variant = 'title', title, rightIcon, onRightClick }: BackTopbarProps) {
  if (variant === 'logo') {
    return (
      <LogoHeaderBar>
        <StaticIconBtn type="button" aria-label="뒤로가기" onClick={onBack}>
          <Icon name="back" size={22} />
        </StaticIconBtn>
        <MiniLogo src="/img/logo.png" alt="NOLI" />
        <Spacer aria-hidden="true" />
      </LogoHeaderBar>
    )
  }

  return (
    <TitleHeader>
      <IconBtn type="button" $side="left" aria-label="뒤로가기" onClick={onBack}>
        <Icon name="back" size={22} />
      </IconBtn>
      {title && <Title>{title}</Title>}
      {rightIcon && (
        <IconBtn type="button" $side="right" aria-label="공유" onClick={onRightClick}>
          <Icon name={rightIcon} size={21} />
        </IconBtn>
      )}
    </TitleHeader>
  )
}
