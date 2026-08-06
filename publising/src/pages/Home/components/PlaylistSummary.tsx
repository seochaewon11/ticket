// org/index.html의 "나의 공연 플레이리스트" 2행(보고 싶은/관람 완료) 이식
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Card } from '../../../components/common/Card'
import { Icon } from '../../../components/common/icon'

const Item = styled(Card).attrs({ as: 'li' })`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
  cursor: pointer;
  transition: transform 0.15s ease;

  &:active {
    transform: scale(0.98);
  }
`

const IconCircle = styled.span<{ $variant: 'wish' | 'watched' }>`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background-color: ${({ theme, $variant }) => ($variant === 'wish' ? theme.colors.primary : theme.colors.pink)};
  color: ${({ theme, $variant }) => ($variant === 'wish' ? theme.colors.white : theme.colors.pinkStrong)};

  svg {
    width: 20px;
    height: 20px;
  }
`

const Info = styled.div`
  flex: 1;
`

const Label = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSub};
  margin-bottom: 4px;
`

const Count = styled.p<{ $variant: 'wish' | 'watched' }>`
  font-size: 20px;
  font-weight: 800;
  color: ${({ theme, $variant }) => ($variant === 'wish' ? theme.colors.primaryStrong : theme.colors.pinkStrong)};
`

const Chevron = styled.span`
  color: ${({ theme }) => theme.colors.textMute};
  display: flex;
`

interface PlaylistSummaryProps {
  wishCount: number
  watchedCount: number
}

export function PlaylistSummary({ wishCount, watchedCount }: PlaylistSummaryProps) {
  const navigate = useNavigate()

  return (
    <>
      <Item onClick={() => navigate('/play')}>
        <IconCircle $variant="wish">
          <Icon name="heart" size={20} />
        </IconCircle>
        <Info>
          <Label>보고 싶은 공연</Label>
          <Count $variant="wish">{wishCount}개</Count>
        </Info>
        <Chevron>
          <Icon name="chevronRight" size={16} />
        </Chevron>
      </Item>

      <Item onClick={() => navigate('/play')}>
        <IconCircle $variant="watched">
          <Icon name="ticket" size={20} />
        </IconCircle>
        <Info>
          <Label>관람 완료 공연</Label>
          <Count $variant="watched">{watchedCount}개</Count>
        </Info>
        <Chevron>
          <Icon name="chevronRight" size={16} />
        </Chevron>
      </Item>
    </>
  )
}
