// org/calendar.html + calendar.js 이식 (공연 일정)
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppShell } from '../../components/layout/AppShell'
import { LogoHeader } from '../../components/layout/LogoHeader'
import { Footer } from '../../components/layout/Footer'
import { Icon } from '../../components/common/icon'
import { useNoliData } from '../../hooks/useNoliData'
import { CalendarGrid } from './components/CalendarGrid'
import { AlertScroll } from './components/AlertScroll'
import { UpcomingList } from './components/UpcomingList'
import { WishedList } from './components/WishedList'
import {
  AlertSection,
  CalendarCard,
  CalendarMonthTitle,
  CalendarNavBtn,
  CalendarNavRow,
  CalendarPageWrap,
  CalendarTitle,
  CalendarWeekdays,
  MoreLink,
  SectionHeader,
  UpcomingSection,
  WishedSection,
} from './styles'

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']

export function CalendarPage() {
  const navigate = useNavigate()
  const { performances, markAsWatched, recordView, getCalendarEventDates, getTicketOpenAlerts, getUpcomingPerformances } =
    useNoliData()
  const wishedPerformances = performances.filter((p) => p.status === 'wish')

  // 관람 완료로 표시하면 "최근 본 공연"(play.html)에도 함께 기록되게 한다
  function handleMarkWatched(id: string) {
    markAsWatched(id)
    recordView(id)
  }

  const [viewYear, setViewYear] = useState(2026)
  const [viewMonth, setViewMonth] = useState(10) // 1~12
  const [selectedDateKey, setSelectedDateKey] = useState('2026-10-15')

  function changeMonth(delta: number) {
    const next = new Date(viewYear, viewMonth - 1 + delta, 1)
    setViewYear(next.getFullYear())
    setViewMonth(next.getMonth() + 1)
    setSelectedDateKey('') // 다른 달로 이동하면 선택 상태 초기화
  }

  return (
    <AppShell>
      <CalendarPageWrap>
        <LogoHeader left="back" right="bell" onBackClick={() => navigate(-1)} onRightClick={() => {}} />

        <CalendarTitle>
          <h2>공연 일정</h2>
          <p>이번 달의 예술적 여정을 확인하세요.</p>
        </CalendarTitle>

        <CalendarCard>
          <CalendarNavRow>
            <CalendarNavBtn type="button" aria-label="이전 달" onClick={() => changeMonth(-1)}>
              <Icon name="chevronLeft" strokeWidth={2.4} size={18} />
            </CalendarNavBtn>
            <CalendarMonthTitle>
              {viewYear}년 {viewMonth}월
            </CalendarMonthTitle>
            <CalendarNavBtn type="button" aria-label="다음 달" onClick={() => changeMonth(1)}>
              <Icon name="chevronRight" strokeWidth={2.4} size={18} />
            </CalendarNavBtn>
          </CalendarNavRow>
          <CalendarWeekdays>
            {WEEKDAYS.map((w) => (
              <span key={w}>{w}</span>
            ))}
          </CalendarWeekdays>
          <CalendarGrid
            year={viewYear}
            month={viewMonth}
            selectedDateKey={selectedDateKey}
            eventDates={getCalendarEventDates()}
            onSelect={setSelectedDateKey}
          />
        </CalendarCard>

        <AlertSection>
          <SectionHeader>
            <h3>티켓 오픈 알람</h3>
            <MoreLink href="#">모두 보기</MoreLink>
          </SectionHeader>
          <AlertScroll alerts={getTicketOpenAlerts()} />
        </AlertSection>

        <WishedSection>
          <SectionHeader>
            <h3>찜한 공연</h3>
          </SectionHeader>
          <WishedList performances={wishedPerformances} onMarkWatched={handleMarkWatched} />
        </WishedSection>

        <UpcomingSection>
          <SectionHeader>
            <h3>예정된 공연</h3>
            <MoreLink href="#">모두 보기</MoreLink>
          </SectionHeader>
          <UpcomingList list={getUpcomingPerformances()} />
        </UpcomingSection>

        <Footer />
      </CalendarPageWrap>
    </AppShell>
  )
}
