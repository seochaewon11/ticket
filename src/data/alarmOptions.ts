import type { AlarmOption } from "../types";

/** 알람 시점 토글 옵션 (설정 상태는 여기서 직접 관리) */
export const alarmOptions: AlarmOption[] = [
  { id: "24h", label: "24시간 전", checked: true },
  { id: "10h", label: "10시간 전", checked: false },
  { id: "1h", label: "1시간 전", checked: false },
];
