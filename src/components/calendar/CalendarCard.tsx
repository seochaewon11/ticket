import type { JSX } from "react";
import styled from "styled-components";
import type { CalendarMarker } from "../../types";
import { Icon } from "../common/Icon";
import { Card } from "../common/ui";

export interface CalendarCardProps {
  viewYear: number;
  /** 1~12 */
  viewMonth: number;
  selectedDate: string;
  markers: CalendarMarker[];
  onSelectDate: (dateKey: string) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

const dotColor: Record<CalendarMarker["dot"], string> = {
  purple: "var(--color-primary)",
  danger: "#E0355B",
  gray: "var(--color-text-placeholder)",
};

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function dateKey(y: number, m: number, d: number) {
  return `${y}-${pad2(m)}-${pad2(d)}`;
}

const Box = styled(Card)`
  padding: var(--space-5) var(--space-4);
  margin-bottom: var(--space-6);
`;

const Nav = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-5);
  margin-bottom: var(--space-4);
`;

const NavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  color: var(--color-text-sub);

  svg {
    width: 18px;
    height: 18px;
  }
`;

const MonthLabel = styled.span`
  font-size: 17px;
  font-weight: 800;
  min-width: 100px;
  text-align: center;
`;

const Weekdays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: var(--space-2);

  span {
    text-align: center;
    font-size: 12px;
    color: var(--color-text-sub);
    font-weight: 600;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 6px;
`;

const EmptyCell = styled.div`
  height: 38px;
`;

const DayButton = styled.button<{ $selected: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 38px;
  font-size: 13.5px;
  color: var(--color-text);
  border-radius: var(--radius-full);
`;

const DayNum = styled.span<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: var(--radius-full);
  font-weight: ${(props) => (props.$selected ? 700 : 400)};
  background: ${(props) => (props.$selected ? "var(--gradient-primary)" : "transparent")};
  color: ${(props) => (props.$selected ? "var(--color-white)" : "var(--color-text)")};
`;

const Dots = styled.span`
  display: flex;
  gap: 2px;
  margin-top: 2px;
  height: 4px;
`;

const Dot = styled.span<{ $color: string }>`
  width: 4px;
  height: 4px;
  border-radius: var(--radius-full);
  background: ${(props) => props.$color};
`;

/** org/js/calendar.js의 renderCalendarCard 이식 (월간 캘린더 + 날짜별 마커) */
export function CalendarCard({
  viewYear,
  viewMonth,
  selectedDate,
  markers,
  onSelectDate,
  onPrevMonth,
  onNextMonth,
}: CalendarCardProps) {
  const firstWeekday = new Date(viewYear, viewMonth - 1, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth, 0).getDate();

  const cells: JSX.Element[] = [];
  for (let i = 0; i < firstWeekday; i++) {
    cells.push(<EmptyCell key={`empty-${i}`} />);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const key = dateKey(viewYear, viewMonth, d);
    const isSelected = key === selectedDate;
    const dots = markers.filter((m) => m.date === key).slice(0, 3);

    cells.push(
      <DayButton key={key} type="button" $selected={isSelected} onClick={() => onSelectDate(key)}>
        <DayNum $selected={isSelected}>{d}</DayNum>
        <Dots>
          {dots.map((m, i) => (
            <Dot key={i} $color={dotColor[m.dot]} />
          ))}
        </Dots>
      </DayButton>,
    );
  }

  return (
    <Box>
      <Nav>
        <NavButton type="button" aria-label="이전 달" onClick={onPrevMonth}>
          <Icon name="back" />
        </NavButton>
        <MonthLabel>
          {pad2(viewMonth)}월 {viewYear}
        </MonthLabel>
        <NavButton type="button" aria-label="다음 달" onClick={onNextMonth}>
          <Icon name="chevron" />
        </NavButton>
      </Nav>
      <Weekdays>
        {WEEKDAYS.map((w) => (
          <span key={w}>{w}</span>
        ))}
      </Weekdays>
      <Grid>{cells}</Grid>
    </Box>
  );
}
