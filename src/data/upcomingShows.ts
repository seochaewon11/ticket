import operaHqImage from "../assets/performances/opera_hq.jpg";
import type { UpcomingShow } from "../types";

/** 캘린더 화면 - 예정된 공연 목록 (메인의 monthlyPicks와 유사한 구조 재사용) */
export const upcomingShows: UpcomingShow[] = [
  {
    id: "up-1",
    category: "클래식",
    theme: "orchestra",
    date: "10.25(수)",
    title: "서울시립교향악단 정기공연",
    venue: "예술의전당 콘서트홀",
    imageUrl: operaHqImage,
  },
  {
    id: "up-2",
    category: "클래식",
    theme: "orchestra",
    date: "10.25(수)",
    title: "서울시립교향악단 정기공연",
    venue: "예술의전당 콘서트홀",
    imageUrl: operaHqImage,
  },
  {
    id: "up-3",
    category: "클래식",
    theme: "orchestra",
    date: "10.25(수)",
    title: "서울시립교향악단 정기공연",
    venue: "예술의전당 콘서트홀",
    imageUrl: operaHqImage,
  },
];
