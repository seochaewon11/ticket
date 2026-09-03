import type { TicketAlarm } from "../types";

/** 티켓 오픈 알람 카드 목록 */
export const ticketAlarms: TicketAlarm[] = [
  { id: "alarm-phantom", dday: 3, title: "뮤지컬 '오페라의 유령'", datetime: "10.18 (수) 오후 2:00", urgent: true },
  { id: "alarm-dracula", dday: 10, title: "뮤지컬 '드라큘라'", datetime: "10.18 (수) 오후 2:00", urgent: false },
  { id: "alarm-chicago", dday: 10, title: "뮤지컬 '시카고'", datetime: "10.18 (수) 오후 2:00", urgent: false },
];
