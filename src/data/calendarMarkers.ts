import type { CalendarMarker } from "../types";

/** 달력에 점으로 표시할 날짜 (yyyy-mm-dd, 색상은 dot 값으로 구분) */
export const calendarMarkers: CalendarMarker[] = [
  { date: "2026-08-05", dot: "danger" },
  { date: "2026-08-12", dot: "purple" },
  { date: "2026-08-12", dot: "danger" },
  { date: "2026-08-18", dot: "purple" },
  { date: "2026-08-25", dot: "gray" },
];
