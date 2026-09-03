import styled from "styled-components";
import { BottomNav } from "../../components/common/BottomNav";
import { Header } from "../../components/common/Header";
import { StorageGrid } from "../../components/storage/StorageGrid";
import { useAppState } from "../../context/AppStateContext";
import { recentlyViewed, savedShows } from "../../data";

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
  const { userPreference } = useAppState();

  return (
    <>
      <Header />
      <Screen>
        <Title>나의 공연 보관함</Title>
        <Subtitle>{userPreference.userGreetingName}님의 보고 싶은 무대들을 저장했어요</Subtitle>
        <StorageGrid items={savedShows} showHeart />

        <SectionTitle>최근 본 공연</SectionTitle>
        <StorageGrid items={recentlyViewed} />
      </Screen>
      <BottomNav active="storage" />
    </>
  );
}
