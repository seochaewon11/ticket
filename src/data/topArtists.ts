import mainMood2 from "../assets/artists/main_mood2.png";
import mainMood3 from "../assets/artists/main_mood3.png";
import mainMood5 from "../assets/artists/main_mood5.png";
import mainMood6 from "../assets/artists/main_mood6.png";
import type { TopArtist } from "../types";

/** 리포트 화면 - 최다 관람 아티스트 랭킹 (artistOptions와 동일한 인물 사진을 theme 기준으로 재사용) */
export const topArtists: TopArtist[] = [
  { rank: 1, name: "김준수", role: "뮤지컬 배우", count: 4, theme: "artist-4", imageUrl: mainMood3 },
  { rank: 2, name: "박해일", role: "뮤지컬,영화배우", count: 4, theme: "artist-6", imageUrl: mainMood5 },
  { rank: 3, name: "이홍기", role: "뮤지컬 배우", count: 3, theme: "artist-3", imageUrl: mainMood2 },
  { rank: 4, name: "태연", role: "콘서트 아티스트", count: 2, theme: "artist-7", imageUrl: mainMood6 },
];
