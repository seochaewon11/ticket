import mainImage2 from "../assets/performances/main_2.png";
import mainImage3 from "../assets/performances/main_3.png";
import mainImage4 from "../assets/performances/main_4.png";
import mainImage5 from "../assets/performances/main_5.png";
import mainImage6 from "../assets/performances/main_6.png";
import mainImage7 from "../assets/performances/main_7.png";
import mainImage9 from "../assets/performances/main_9.png";
import type { StorageItem } from "../types";

/** 보관함 화면 - 최근 본 공연. theme이 실제 performances와 겹치는 항목은 같은 포스터를 재사용한다 */
export const recentlyViewed: StorageItem[] = [
  { id: "recent-1", category: "뮤지컬", title: "드라큘라", theme: "dracula", imageUrl: mainImage4 },
  { id: "recent-2", category: "콘서트", title: "시카고", theme: "chicago", imageUrl: mainImage5 },
  { id: "recent-3", category: "뮤지컬", title: "비더슈틴트", theme: "beetlejuice", imageUrl: mainImage3 },
  { id: "recent-4", category: "공연", title: "빨래", theme: "ppallae", imageUrl: mainImage7 },
  { id: "recent-5", category: "공연", title: "프랑켄슈타인", theme: "frankenstein", imageUrl: mainImage6 },
  { id: "recent-6", category: "뮤지컬", title: "레베카", theme: "rebecca", imageUrl: mainImage2 },
  { id: "recent-7", category: "콘서트", title: "태연", theme: "taeyeon", imageUrl: mainImage9 },
  { id: "recent-8", category: "콘서트", title: "드라큘라", theme: "dracula", imageUrl: mainImage4 },
  { id: "recent-9", category: "콘서트", title: "드라큘라", theme: "dracula", imageUrl: mainImage4 },
];
