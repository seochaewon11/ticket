/** 라우트 경로 상수 (베이스 경로 "/") */
export const ROUTES = {
  splash: "/",
  login: "/login",
  favorite: "/favorite",
  main: "/main",
  detail: "/detail/:performanceId",
  calendar: "/calendar",
  upcoming: "/calendar/upcoming",
  ticketAlarms: "/calendar/alarms",
  alarm: "/alarm",
  alarmDetail: "/alarm/:performanceId",
  storage: "/storage",
  report: "/report",
  profile: "/profile",
} as const;

export function detailPath(performanceId: string) {
  return `/detail/${performanceId}`;
}

export function alarmPath(performanceId?: string) {
  return performanceId ? `/alarm/${performanceId}` : ROUTES.alarm;
}
