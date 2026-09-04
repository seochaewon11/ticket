import styled from "styled-components";
import { BottomNav } from "../../components/common/BottomNav";
import { Header } from "../../components/common/Header";
import { StorageGrid } from "../../components/storage/StorageGrid";
import { useAppState } from "../../context/AppStateContext";
import { performances, recentlyViewed, savedShows } from "../../data";
import type { StorageItem } from "../../types";

/** Performance.category(영문)를 보관함 카드에 쓰는 한글 라벨로 변환 */
const CATEGORY_LABEL: Record<string, string> = {
  musical: "뮤지컬",
  concert: "콘서트",
  classical: "클래식",
  exhibition: "전시",
};

const Screen = styled.div`
  padding: var(--space-5);
  padding-bottom: calc(var(--tabbar-height) + var(--space-6));
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 6px;
`;

const Subtitle = styled.p`
  font-size: 13px;
  color: var(--color-text-sub);
  margin-bottom: var(--space-5);
`;

const SectionTitle = styled.h2`
  font-size: 17px;
  font-weight: 800;
  margin: var(--space-6) 0 var(--space-4);
`;

/** org/js/storage.js를 이식 (저장한 공연 / 최근 본 공연 3열 그리드) */
export function StoragePage() {
  const { userPreference, likedPerformanceIds } = useAppState();

  /** 메인 화면(히어로/맞춤 공연/이달의 추천)에서 하트로 찜한 공연을 저장한 공연 목록 맨 앞에 반영한다 */
  const likedItems: StorageItem[] = performances
    .filter((p) => likedPerformanceIds.includes(p.id))
    .map((p) => ({
      id: p.id,
      category: CATEGORY_LABEL[p.category] ?? p.category,
      title: p.title,
      theme: p.theme,
      imageUrl: p.imageUrl,
    }));
  const savedItems = [...likedItems, ...savedShows];

  return (
    <>
      <Header />
      <Screen>
        <Title>나의 공연 보관함</Title>
        <Subtitle>{userPreference.userGreetingName}님의 보고 싶은 무대들을 저장했어요</Subtitle>
        <StorageGrid items={savedItems} showHeart />

        <SectionTitle>최근 본 공연</SectionTitle>
        <StorageGrid items={recentlyViewed} />
      </Screen>
      <BottomNav active="storage" />
    </>
  );
}
