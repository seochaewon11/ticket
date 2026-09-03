import alarmImage from "../assets/alarm/alarm.png";
import type { AlarmTarget } from "../types";

/** 알람설정 화면에서 다루는 대상 공연 (임의의 단독 판매 공연) */
export const alarmTarget: AlarmTarget = {
  id: "magic-forest",
  title: "뮤지컬 <마법의 숲 이야기>",
  theme: "magic-forest",
  tags: ["뮤지컬", "단독판매"],
  datetime: "2026.11.24 (금) 오후 2:00",
  imageUrl: alarmImage,
};
