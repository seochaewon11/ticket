import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ArtistNewsList } from "../../components/main/ArtistNewsList";
import { Hero } from "../../components/main/Hero";
import { MonthlyPicksSection } from "../../components/main/MonthlyPicksSection";
import { RecommendCarousel } from "../../components/main/RecommendCarousel";
import { BottomNav } from "../../components/common/BottomNav";
import { Header } from "../../components/common/Header";
import { useAppState } from "../../context/AppStateContext";
import { artistNews as initialArtistNews, monthlyPicks, performances } from "../../data";
import { detailPath, ROUTES } from "../../router/routes";

/** "NOLI가 찾은 맞춤 공연들"에는 취향 일치도 70% 이상인 공연만 추천한다 */
const MIN_RECOMMEND_MATCH_RATE = 70;

const Screen = styled.div`
  padding-bottom: calc(var(--tabbar-height) + var(--space-6));
`;

/**
 * org/js/main.js를 이식. 공연 찜(하트) 상태는 AppStateContext에서 전역으로 관리해
 * 보관함 "저장한 공연" 목록에 반영되고, 아티스트 소식 찜은 이 화면 로컬 state로만 둔다.
 */
export function MainPage() {
  const navigate = useNavigate();
  const { userPreference, likedPerformanceIds, toggleLikedPerformance } = useAppState();
  const [artistNewsList, setArtistNewsList] = useState(initialArtistNews);

  const performanceList = performances.map((p) => ({ ...p, isLiked: likedPerformanceIds.includes(p.id) }));
  const hero = performanceList.find((p) => p.isHero);
  const recommended = performanceList.filter((p) => !p.isHero && p.matchRate >= MIN_RECOMMEND_MATCH_RATE);

  const handleToggleArtistLike = (id: string) => {
    setArtistNewsList((prev) => prev.map((a) => (a.id === id ? { ...a, isLiked: !a.isLiked } : a)));
  };

  return (
    <>
      <Header />
      <Screen>
        {hero && (
          <Hero
            performance={hero}
            onToggleLike={toggleLikedPerformance}
            onOpenDetail={(id) => navigate(detailPath(id))}
          />
        )}
        <RecommendCarousel
          userName={userPreference.userName}
          items={recommended}
          onOpenDetail={(id, fromLayoutId) => navigate(detailPath(id), { state: { fromLayoutId } })}
          onToggleLike={toggleLikedPerformance}
          onRetakePreferences={() => navigate(ROUTES.favorite)}
        />
        <ArtistNewsList
          userName={userPreference.userName}
          items={artistNewsList}
          onToggleLike={handleToggleArtistLike}
        />
        <MonthlyPicksSection items={monthlyPicks} />
      </Screen>
      <BottomNav />
    </>
  );
}
