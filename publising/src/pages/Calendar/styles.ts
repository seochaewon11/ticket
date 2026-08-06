// org/calendar.css 이식
import styled from 'styled-components'

export const CalendarPageWrap = styled.div`
  padding-bottom: 100px; /* 하단 고정 탭바 높이만큼 여유 */
`

export const CalendarTitle = styled.section`
  padding: 14px 20px 0;

  h2 {
    font-size: 23px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 6px;
  }

  p {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.textSub};
  }
`

export const CalendarCard = styled.section`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.card};
  padding: 20px 14px 16px;
  margin: 22px 20px 0;
`

export const CalendarNavRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
`

export const CalendarNavBtn = styled.button`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSub};

  svg {
    width: 18px;
    height: 18px;
  }
`

export const CalendarMonthTitle = styled.h3`
  font-size: 17px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`

export const CalendarWeekdays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 8px;

  span {
    font-size: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textMute};
  }
`

export const CalendarGridWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 4px;
`

export const CalendarCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 46px;
  padding-top: 2px;
`

export const CalendarDateBtn = styled.button<{ $selected: boolean; $empty: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13.5px;
  font-weight: ${({ $selected }) => ($selected ? 800 : 600)};
  color: ${({ theme, $selected }) => ($selected ? theme.colors.white : theme.colors.text)};
  background-color: ${({ theme, $selected }) => ($selected ? theme.colors.primaryStrong : 'transparent')};
  visibility: ${({ $empty }) => ($empty ? 'hidden' : 'visible')};
  transition: background-color 0.15s ease;
`

export const EventDotRow = styled.span`
  display: flex;
  gap: 3px;
  margin-top: 3px;
  height: 5px;
`

export const EventDot = styled.span<{ $type: 'pink' | 'primary' | 'gray' }>`
  width: 4.5px;
  height: 4.5px;
  border-radius: 50%;
  background-color: ${({ theme, $type }) =>
    $type === 'pink' ? theme.colors.pinkStrong : $type === 'primary' ? theme.colors.primaryStrong : theme.colors.textMute};
`

export const AlertSection = styled.section`
  padding: 32px 20px 0;
`

export const UpcomingSection = styled.section`
  padding: 32px 20px 0;
`

export const WishedSection = styled.section`
  padding: 32px 20px 0;
`

export const WishedEmptyState = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSub};
`

export const WishedCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.card};
  margin-bottom: 12px;
`

export const WishedInfo = styled.div`
  min-width: 0;
`

export const WishedTitle = styled.p`
  font-size: 14.5px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
`

export const WishedMeta = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSub};
`

export const MarkWatchedCheck = styled.button`
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1.6px solid ${({ theme }) => theme.colors.primaryStrong};
  color: ${({ theme }) => theme.colors.primaryStrong};
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background-color 0.15s ease,
    transform 0.15s ease;

  svg {
    width: 15px;
    height: 15px;
  }

  &:active {
    transform: scale(0.9);
    background-color: ${({ theme }) => theme.colors.primarySoft};
  }
`

export const SectionHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 16px;

  h3 {
    font-size: 17px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.text};
  }
`

export const MoreLink = styled.a`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSub};
`

export const AlertScrollWrap = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  scrollbar-width: none;
  padding-bottom: 4px;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const AlertCard = styled.article<{ $theme: 'primary' | 'muted' }>`
  flex-shrink: 0;
  width: 78%;
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 18px 18px 20px;
  position: relative;
  cursor: pointer;
  background-color: ${({ $theme, theme }) => ($theme === 'primary' ? '#DDD2FE' : theme.colors.disabledBg)};
`

export const AlertDday = styled.span`
  display: inline-flex;
  padding: 5px 12px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background-color: ${({ theme }) => theme.colors.pink};
  color: ${({ theme }) => theme.colors.pinkStrong};
  font-size: 12.5px;
  font-weight: 800;
  margin-bottom: 16px;
`

export const AlertClockIcon = styled.span`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primaryStrong};

  svg {
    width: 15px;
    height: 15px;
  }
`

export const AlertTitle = styled.p<{ $muted: boolean }>`
  font-size: 16.5px;
  font-weight: 800;
  color: ${({ theme, $muted }) => ($muted ? theme.colors.textMute : theme.colors.text)};
  margin-bottom: 8px;
`

export const AlertSchedule = styled.p<{ $muted: boolean }>`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme, $muted }) => ($muted ? theme.colors.textMute : theme.colors.textSub)};
`

export const UpcomingCard = styled.div`
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 14px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.card};
  margin-bottom: 12px;
`

export const UpcomingThumb = styled.div`
  width: 56px;
  height: 72px;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.disabledBg};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const UpcomingMetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
`

export const GenreTag = styled.span<{ $variant: 'classic' | 'indie' }>`
  padding: 3px 10px;
  border-radius: ${({ theme }) => theme.radius.pill};
  font-size: 11.5px;
  font-weight: 700;
  background-color: ${({ theme, $variant }) => ($variant === 'indie' ? '#DCE9FE' : theme.colors.pink)};
  color: ${({ theme, $variant }) => ($variant === 'indie' ? '#4C6FBF' : theme.colors.pinkStrong)};
`

export const UpcomingDate = styled.span`
  font-size: 12.5px;
  color: ${({ theme }) => theme.colors.textSub};
  font-weight: 600;
`

export const UpcomingTitle = styled.p`
  font-size: 15px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 6px;
`

export const UpcomingVenue = styled.p`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12.5px;
  color: ${({ theme }) => theme.colors.textSub};

  svg {
    width: 12px;
    height: 12px;
    flex-shrink: 0;
  }
`
