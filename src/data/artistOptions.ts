import mainMood1 from "../assets/artists/main_mood1.png";
import mainMood2 from "../assets/artists/main_mood2.png";
import mainMood3 from "../assets/artists/main_mood3.png";
import mainMood4 from "../assets/artists/main_mood4.png";
import mainMood5 from "../assets/artists/main_mood5.png";
import mainMood6 from "../assets/artists/main_mood6.png";
import mainSearch from "../assets/artists/main_search.png";
import type { ArtistOption } from "../types";

/**
 * 취향설정 - 아티스트 검색용 데이터.
 * 기본 목록(검색어 없을 때, 이준영 제외 6명)에 main_mood1~6을 순서대로 매칭하고,
 * 이준영은 이름으로 직접 검색했을 때만 main_search 이미지가 보이도록 한다.
 */
export const artistOptions: ArtistOption[] = [
  { id: "leejoonyoung", name: "이준영", theme: "artist-1", imageUrl: mainSearch },
  { id: "johseungwoo", name: "조승우", theme: "artist-2", imageUrl: mainMood1 },
  { id: "leehonggi", name: "이홍기", theme: "artist-3", imageUrl: mainMood2 },
  { id: "kimjunsu", name: "김준수", theme: "artist-4", imageUrl: mainMood3 },
  { id: "v", name: "뷔", theme: "artist-5", imageUrl: mainMood4 },
  { id: "parkhaeil", name: "박해일", theme: "artist-6", imageUrl: mainMood5 },
  { id: "taeyeon", name: "태연", theme: "artist-7", imageUrl: mainMood6 },
];
