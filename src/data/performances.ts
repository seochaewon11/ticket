import mainImage1 from "../assets/performances/main_1.png";
import mainImage2 from "../assets/performances/main_2.png";
import mainImage4 from "../assets/performances/main_4.png";
import mainImage5 from "../assets/performances/main_5.png";
import mainImage6 from "../assets/performances/main_6.png";
import mainImage7 from "../assets/performances/main_7.png";
import mainImage9 from "../assets/performances/main_9.png";
import castImage1 from "../assets/cast/main_in1.png";
import castImage2 from "../assets/cast/main_in2.png";
import type { Performance } from "../types";

/** 메인 화면 - 히어로 및 맞춤 추천 공연 데이터 (상세화면 전용 필드 포함) */
export const performances: Performance[] = [
  {
    id: "wicked-2026",
    title: "위키드(Wicked)",
    category: "musical",
    theme: "wicked",
    imageUrl: mainImage1,
    rating: 4.8,
    duration: "2h 14m",
    dateRange: "2026.08.08-10.20",
    venue: "블루스퀘어 신한카드홀",
    ticketRank: 1,
    matchRate: 95,
    tags: ["감동적인", "뮤지컬영화", "연인과함께"],
    isLiked: false,
    isHero: true,
    matchReasonHtml:
      "평소 <em>판타지 장르</em>와 <em>여성 중심 서사</em>를 즐기시는군요! 위키드는 엘파바와 글린다의 깊은 우정을 통해 압도적인 무대 매력을 선사할 거예요.",
    genrePreferenceText: "판타지 뮤지컬 카테고리 1위",
    trendingText: "최근 24시간 내 2,580명 찜",
    period: "2026.10.05 ~ 2026.12.15",
    runningTime: "170분 (인터미션 20분 포함)",
    priceRange: "VIP 170,000원 ~ B석 70,000원",
    synopsis:
      "도로시가 오즈에 떨어지기 훨씬 전, 그곳에서 만난 두 소녀의 이야기. 똑똑하지만 불같은 성격에 초록색 피부를 가진 엘파바와 야망 가득하고 모두에게 사랑받는 글린다. 전혀 다른 두 마녀가 나누는 진한 우정과 운명적인 선택이 시작됩니다. 글린다는 노래를 부르며 하늘로 떠난 엘파바를 그리워하고, 둘의 이야기는 오즈의 전설이 됩니다.",
    castList: [
      { name: "옥주현", role: "엘파바 역", theme: "artist-6", imageUrl: castImage1 },
      { name: "정선아", role: "글린다 역", theme: "artist-7", imageUrl: castImage2 },
      { name: "고은성", role: "피에로 역", theme: "" },
    ],
  },
  {
    id: "marie-curie",
    title: "마리 퀴리",
    category: "musical",
    theme: "marie-curie",
    imageUrl: mainImage2,
    dateRange: "JUNE - 28 JULY 2024",
    venue: "CHARING CROSS THEATRE",
    matchRate: 90,
    isLiked: false,
    isHero: false,
  },
  {
    id: "beetlejuice",
    title: "비틀쥬스",
    category: "musical",
    theme: "beetlejuice",
    imageUrl: mainImage2,
    dateRange: "",
    venue: "",
    matchRate: 80,
    isLiked: false,
    isHero: false,
  },
  {
    id: "deathnote",
    title: "데스노트",
    category: "musical",
    theme: "deathnote",
    imageUrl: mainImage4,
    dateRange: "2026.09.10-11.02",
    venue: "충무아트센터",
    matchRate: 88,
    isLiked: false,
    isHero: false,
  },
  {
    id: "chicago-musical",
    title: "시카고",
    category: "musical",
    theme: "chicago",
    imageUrl: mainImage5,
    dateRange: "2026.09.15-10.30",
    venue: "LG아트센터 서울",
    matchRate: 76,
    isLiked: false,
    isHero: false,
  },
  {
    id: "elizabeth-musical",
    title: "엘리자벳",
    category: "musical",
    theme: "elizabeth",
    imageUrl: mainImage6,
    dateRange: "2026.10.01-11.20",
    venue: "세종문화회관 대극장",
    matchRate: 82,
    isLiked: false,
    isHero: false,
  },
  {
    id: "ppallae",
    title: "빨래",
    category: "musical",
    theme: "ppallae",
    imageUrl: mainImage7,
    dateRange: "2026.09.05-10.12",
    venue: "동양예술극장",
    matchRate: 73,
    isLiked: false,
    isHero: false,
  },
  {
    id: "taeyeon-concert",
    title: "태연 콘서트",
    category: "concert",
    theme: "taeyeon",
    imageUrl: mainImage9,
    dateRange: "2026.11.08-11.09",
    venue: "올림픽공원 체조경기장",
    matchRate: 91,
    isLiked: false,
    isHero: false,
  },
];
