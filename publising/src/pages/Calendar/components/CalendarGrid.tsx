import type { CalendarEventDate } from '../../../types'
import { CalendarCell, CalendarDateBtn, CalendarGridWrap, EventDot, EventDotRow } from '../styles'

function pad(n: number) {
  return n < 10 ? `0${n}` : String(n)
}

function dateKey(y: number, m: number, d: number) {
  return `${y}-${pad(m)}-${pad(d)}`
}

interface CalendarGridProps {
  year: number
  month: number // 1~12
  selectedDateKey: string
  eventDates: CalendarEventDate[]
  onSelect: (key: string) => void
}

export function CalendarGrid({ year, month, selectedDateKey, eventDates, onSelect }: CalendarGridProps) {
  const firstWeekday = new Date(year, month - 1, 1).getDay() // 0(일)~6(토)
  const daysInMonth = new Date(year, month, 0).getDate()

  const eventMap: Record<string, CalendarEventDate['type']> = {}
  eventDates.forEach((e) => {
    eventMap[e.date] = e.type
  })

  const emptyCells = Array.from({ length: firstWeekday }, (_, i) => (
    <CalendarCell key={`empty-${i}`}>
      <CalendarDateBtn as="span" $selected={false} $empty>
        0
      </CalendarDateBtn>
    </CalendarCell>
  ))

  const dayCells = Array.from({ length: daysInMonth }, (_, i) => {
    const d = i + 1
    const key = dateKey(year, month, d)
    const isSelected = key === selectedDateKey
    const dotType = eventMap[key]

    return (
      <CalendarCell key={key}>
        <CalendarDateBtn
          type="button"
          $selected={isSelected}
          $empty={false}
          onClick={() => onSelect(key)}
        >
          {d}
        </CalendarDateBtn>
        <EventDotRow>
          {dotType === 'multi' ? (
            <>
              <EventDot $type="primary" />
              <EventDot $type="pink" />
            </>
          ) : dotType ? (
            <EventDot $type={dotType} />
          ) : null}
        </EventDotRow>
      </CalendarCell>
    )
  })

  return <CalendarGridWrap>{[...emptyCells, ...dayCells]}</CalendarGridWrap>
}
