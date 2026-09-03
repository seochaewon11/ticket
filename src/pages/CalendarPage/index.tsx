import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AlarmList } from "../../components/calendar/AlarmList";
import { CalendarCard } from "../../components/calendar/CalendarCard";
import { UpcomingList } from "../../components/calendar/UpcomingList";
import { BottomNav } from "../../components/common/BottomNav";
import { Header } from "../../components/common/Header";
import { calendarMarkers, ticketAlarms, upcomingShows } from "../../data";
import { alarmPath, ROUTES } from "../../router/routes";

const Screen = styled.div`
  padding: var(--space-5);
  padding-bottom: calc(var(--tabbar-height) + var(--space-6));
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 6px;
`;

const Subtitle = styled.p`
  font-size: 13px;
  color: var(--color-text-sub);
  margin-bottom: var(--space-5);
`;

/** 시안 기준 초기값 : 2026년 8월, 15일 선택 (org/js/calendar.js와 동일) */
const INITIAL_YEAR = 2026;
const INITIAL_MONTH = 8;
const INITIAL_SELECTED_DATE = "2026-08-15";

/** org/js/calendar.js를 이식 (월간 캘린더 + 티켓오픈 알림 + 예정된 공연) */
export function CalendarPage() {
  const navigate = useNavigate();
  const [viewYear, setViewYear] = useState(INITIAL_YEAR);
  const [viewMonth, setViewMonth] = useState(INITIAL_MONTH);
  const [selectedDate, setSelectedDate] = useState(INITIAL_SELECTED_DATE);

  const handlePrevMonth = () => {
    if (viewMonth === 1) {
      setViewMonth(12);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 12) {
      setViewMonth(1);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  return (
    <>
      <Header />
      <Screen>
        <Title>공연 일정</Title>
        <Subtitle>이번 달의 예술적 여정을 확인하세요.</Subtitle>

        <CalendarCard
          viewYear={viewYear}
          viewMonth={viewMonth}
          selectedDate={selectedDate}
          markers={calendarMarkers}
          onSelectDate={setSelectedDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />

        <AlarmList
          items={ticketAlarms}
          onMoreClick={() => navigate(ROUTES.alarm)}
          onAlarmClick={(id) => navigate(alarmPath(id))}
        />
        <UpcomingList items={upcomingShows} />
      </Screen>
      <BottomNav active="calendar" />
    </>
  );
}
