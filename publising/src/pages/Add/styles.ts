// org/add.css 이식
import styled from 'styled-components'

export const AddPageWrap = styled.div`
  padding-bottom: 158px; /* 하단 고정 CTA 버튼 + 탭바 높이만큼 여유 */
`

export const StepProgressWrap = styled.div`
  padding: 18px 20px 0;
`

export const StepMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px 0;
`

export const StepLabel = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSub};
`

export const AddTitle = styled.section`
  padding: 18px 20px 0;

  h2 {
    font-size: 22px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 6px;
  }

  p {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.textSub};
  }
`

export const GenreGridWrap = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  padding: 20px 20px 0;
`

export const GenreCard = styled.button<{ $selected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 22px 8px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1.6px solid ${({ theme, $selected }) => ($selected ? theme.colors.primaryStrong : 'transparent')};
  background-color: ${({ theme, $selected }) => ($selected ? theme.colors.primarySoft : theme.colors.surface)};
  box-shadow: ${({ theme }) => theme.shadow.card};
  transition:
    transform 0.15s ease,
    border-color 0.15s ease,
    background-color 0.15s ease;

  &:active {
    transform: scale(0.97);
  }
`

const TONE_BG: Record<'pink' | 'tan', string> = {
  pink: '#FBE3E7',
  tan: '#ECE4DE',
}

export const GenreIcon = styled.span<{ $tone: 'purple' | 'pink' | 'tan' }>`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  opacity: 0.8;
  background-color: ${({ theme, $tone }) => ($tone === 'purple' ? theme.colors.primarySoft : TONE_BG[$tone])};
`

export const GenreLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSub};
`

export const MoodSection = styled.section`
  padding: 30px 20px 0;

  h3 {
    font-size: 17px;
    font-weight: 700;
    margin-bottom: 14px;
  }
`

export const MoodTagsWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`

export const MoodTag = styled.button<{ $selected: boolean }>`
  padding: 12px 18px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background-color: ${({ theme, $selected }) => ($selected ? theme.colors.primaryStrong : '#F1E4DE')};
  color: ${({ theme, $selected }) => ($selected ? theme.colors.white : theme.colors.textSub)};
  font-size: 14px;
  font-weight: 600;
  transition:
    background-color 0.15s ease,
    color 0.15s ease,
    transform 0.15s ease;

  &:active {
    transform: scale(0.96);
  }
`

export const AddCta = styled.div`
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 100%;
  max-width: ${({ theme }) => theme.layout.appMaxWidth};
  background-color: ${({ theme }) => theme.colors.accent};
`

export const ActionButtons = styled.div`
  padding: 14px 20px 10px;
`
