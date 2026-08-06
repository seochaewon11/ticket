// org/alarm.css 이식
import styled from 'styled-components'

export const AlarmPageWrap = styled.div`
  padding-bottom: 110px; /* 하단 고정 CTA 버튼 높이만큼 여유 */
`

export const TargetCard = styled.section`
  display: flex;
  gap: 14px;
  padding: 16px;
  margin: 22px 20px 0;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.card};
`

export const TargetThumb = styled.div`
  width: 70px;
  height: 92px;
  border-radius: ${({ theme }) => theme.radius.sm};
  overflow: hidden;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.disabledBg};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const TargetInfo = styled.div`
  flex: 1;
  min-width: 0;
`

export const TargetTags = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 8px;
`

export const TargetTag = styled.span`
  padding: 4px 10px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background-color: ${({ theme }) => theme.colors.primarySoft};
  color: ${({ theme }) => theme.colors.primaryStrong};
  font-size: 11px;
  font-weight: 700;
`

export const TargetTitle = styled.p`
  font-size: 15px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.4;
  margin-bottom: 10px;
`

export const TargetSchedule = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12.5px;
  color: ${({ theme }) => theme.colors.textSub};
  flex-wrap: wrap;

  svg {
    width: 13px;
    height: 13px;
    flex-shrink: 0;
  }
`

export const ScheduleDivider = styled.span`
  color: ${({ theme }) => theme.colors.border};
`

export const ReminderHeading = styled.section`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 30px 20px 0;

  h2 {
    font-size: 16px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 4px;
  }

  p {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.textSub};
  }
`

export const BellIconWrap = styled.span`
  width: 22px;
  height: 22px;
  color: ${({ theme }) => theme.colors.primaryStrong};
  flex-shrink: 0;
  margin-top: 2px;
`

export const ReminderList = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px 20px 0;
`

export const ReminderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 18px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.card};
`

export const ReminderLabel = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`

export const SwitchLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 28px;
  flex-shrink: 0;
`

export const SwitchInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  cursor: pointer;
  z-index: 2;
`

export const SwitchTrack = styled.span`
  position: absolute;
  inset: 0;
  background-color: ${({ theme }) => theme.colors.disabledBg};
  border-radius: ${({ theme }) => theme.radius.pill};
  transition: background-color 0.18s ease;
  pointer-events: none;

  ${SwitchInput}:checked + & {
    background-color: ${({ theme }) => theme.colors.primaryStrong};
  }
`

export const SwitchThumb = styled.span`
  position: absolute;
  top: 3px;
  left: 3px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: transform 0.18s ease;

  ${SwitchInput}:checked + ${SwitchTrack} & {
    transform: translateX(20px);
  }
`

export const AlarmCta = styled.div`
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 100%;
  max-width: ${({ theme }) => theme.layout.appMaxWidth};
  padding: 14px 20px calc(14px + env(safe-area-inset-bottom, 0px));
  background-color: ${({ theme }) => theme.colors.accent};
`

export const EmptyState = styled.p`
  padding: 40px 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSub};
`
