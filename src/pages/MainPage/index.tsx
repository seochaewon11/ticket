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
import { artistNews as initialArtistNews, monthlyPicks, performances as initialPerformances } from "../../data";
import { detailPath, ROUTES } from "../../router/routes";

/** "NOLI가 찾은 맞춤 공연들"에는 취향 일치도 70% 이상인 공연만 추천한다 */
const MIN_RECOMMEND_MATCH_RATE = 70;

const Screen = styled.div`
  padding-bottom: calc(var(--tabbar-height) + var(--space-6));
`;

/**
 * org/js/main.js를 이식. 찜/알람 토글은 이 화면에 진입할 때마다
 * 데이터 모듈의 초기값으로 시작하는 로컬 state로 관리한다(화면 간 영속화는 범위 밖).
 */
export function MainPage() {
  const navigate = useNavigate();
  const { userPreference } = useAppState();
  const [performanceList, setPerformanceList] = useState(initialPerformances);
  const [artistNewsList, setArtistNewsList] = useState(initialArtistNews);

  const hero = performanceList.find((p) => p.isHero);
  const recommended = performanceList.filter((p) => !p.isHero && p.matchRate >= MIN_RECOMMEND_MATCH_RATE);

  const handleTogglePerformanceLike = (id: string) => {
    setPerformanceList((prev) => prev.map((p) => (p.id === id ? { ...p, isLiked: !p.isLiked } : p)));
  };

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
            onToggleLike={handleTogglePerformanceLike}
            onOpenDetail={(id) => navigate(detailPath(id))}
          />
        )}
        <RecommendCarousel
          userName={userPreference.userName}
          items={recommended}
          onOpenDetail={(id) => navigate(detailPath(id))}
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
