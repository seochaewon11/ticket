import type { GenreDistributionSlice } from "../types";

/** 리포트 화면 - 장르 분포 도넛 차트 */
export const genreDistribution: GenreDistributionSlice[] = [
  { label: "뮤지컬", percent: 45, color: "#5B6CF0" },
  { label: "콘서트", percent: 30, color: "#F5A623" },
  { label: "음악회", percent: 25, color: "#E0355B" },
];
