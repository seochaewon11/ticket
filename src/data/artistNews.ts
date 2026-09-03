import mainImage4 from "../assets/performances/main_4.png";
import mainImage5 from "../assets/performances/main_5.png";
import mainImage6 from "../assets/performances/main_6.png";
import type { ArtistNewsItem } from "../types";

/** 메인 화면 - 좋아하는 아티스트 공연 소식 */
export const artistNews: ArtistNewsItem[] = [
  {
    id: "deathnote-kimjunsu",
    artistName: "김준수",
    theme: "deathnote",
    imageUrl: mainImage4,
    dDay: 20,
    title: "데스노트",
    date: "2026.08.28",
    venue: "서울콘서트홀",
    isLiked: false,
    alarmSet: false,
  },
  {
    id: "chicago-choijaerim",
    artistName: "최재림",
    theme: "chicago",
    imageUrl: mainImage5,
    dDay: 30,
    title: "시카고",
    date: "2026.09.28",
    venue: "서울콘서트홀",
    isLiked: false,
    alarmSet: false,
  },
  {
    id: "elizabeth-okjoohyun",
    artistName: "옥주현",
    theme: "elizabeth",
    imageUrl: mainImage6,
    dDay: 30,
    title: "엘리자벳",
    date: "2026.08.28",
    venue: "서울콘서트홀",
    isLiked: false,
    alarmSet: false,
  },
];
