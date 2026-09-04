import { useRef } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useSearchOverlay } from "../../context/SearchOverlayContext";
import type { Performance } from "../../types";
import { Icon } from "../common/Icon";
import { PosterPlaceholder } from "../common/PosterPlaceholder";
import { IconButton, Pill, ScrollX, Section, SectionActions, SectionHead, SectionTitle, cardPopFeedback } from "../common/ui";

export interface RecommendCarouselProps {
  userName: string;
  items: Performance[];
  onOpenDetail: (id: string, fromLayoutId: string) => void;
  onToggleLike: (id: string) => void;
  onRetakePreferences: () => void;
}

/** 가로 스크롤로 보여줄 최대 개수 */
const MAX_VISIBLE_COUNT = 7;

const CarouselWrap = styled.div`
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 32px;
    background: linear-gradient(to right, transparent, var(--color-bg));
    pointer-events: none;
  }
`;

const ScrollHintIcon = styled.button`
  position: absolute;
  top: 50%;
  right: 6px;
  transform: translateY(-50%);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.92);
  color: var(--color-primary);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.14);
  transition: transform 0.15s ease;

  &:active {
    transform: translateY(-50%) scale(0.92);
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

const Track = styled(ScrollX)`
  scroll-snap-type: x proximity;
  padding-right: var(--space-5);
`;

const CardWrap = styled.div`
  position: relative;
  flex: 0 0 auto;
  width: 158px;
  height: 210px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-card);
  scroll-snap-align: start;

  &:active,
  &:hover {
    box-shadow: var(--shadow-float);
  }
`;

const PosterButton = styled.button`
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  text-align: left;
  ${cardPopFeedback}
`;

/** DetailPage 히어로 포스터와 layoutId를 공유해 셰어드 엘리먼트 전환을 만든다 */
const CardPosterMotionWrap = styled(motion.div)`
  width: 100%;
  height: 100%;
`;

const CardPoster = styled(PosterPlaceholder)`
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(8, 6, 16, 0.85) 0%, rgba(8, 6, 16, 0.05) 55%, transparent 75%);
  }
`;

const CardBody = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: var(--space-3);
  color: var(--color-white);
`;

const LikeButton = styled(IconButton)`
  position: absolute;
  top: var(--space-2);
  right: var(--space-2);
  z-index: 1;
`;

const CardTitle = styled.p`
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 6px;
`;

/**
 * org/js/main.js의 renderRecommendCarousel 이식. 취향 일치 70% 이상인 공연을 최대 7개까지 가로 스크롤로 보여준다.
 * 우측 "계속" 아이콘을 누르면 트랙이 옆으로 슬라이드되어 다음 카드들을 보여준다(터치 드래그로도 스크롤 가능).
 */
export function RecommendCarousel({
  userName,
  items,
  onOpenDetail,
  onToggleLike,
  onRetakePreferences,
}: RecommendCarouselProps) {
  const { openSearch } = useSearchOverlay();
  const trackRef = useRef<HTMLDivElement>(null);

  const visibleItems = items.slice(0, MAX_VISIBLE_COUNT);

  const handleScrollNext = () => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: track.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <Section>
      <SectionHead>
        <SectionTitle>
          <strong>{userName}</strong> 님의 취향에 맞게
          <br />
          <strong>NOLI</strong>가 찾은 맞춤 공연들
        </SectionTitle>
        <SectionActions>
          <IconButton type="button" aria-label="취향 다시 설정하기" onClick={onRetakePreferences}>
            <Icon name="edit" />
          </IconButton>
          <IconButton type="button" aria-label="검색" onClick={openSearch}>
            <Icon name="search" />
          </IconButton>
        </SectionActions>
      </SectionHead>
      <CarouselWrap>
        <Track ref={trackRef}>
          {visibleItems.map((p) => {
            const layoutId = `poster-carousel-${p.id}`;
            return (
            <CardWrap key={p.id}>
              <PosterButton type="button" onClick={() => onOpenDetail(p.id, layoutId)}>
                <CardPosterMotionWrap layoutId={layoutId}>
                  <CardPoster $theme={p.theme} imageUrl={p.imageUrl} alt={p.title} />
                </CardPosterMotionWrap>
                <CardBody>
                  <CardTitle>{p.title}</CardTitle>
                  <Pill $variant="purple">내 취향 일치 {p.matchRate}%</Pill>
                </CardBody>
              </PosterButton>
              <LikeButton
                type="button"
                $float
                $active={p.isLiked}
                aria-label="찜하기"
                onClick={() => onToggleLike(p.id)}
              >
                <Icon name="heart" filled={p.isLiked} />
              </LikeButton>
            </CardWrap>
            );
          })}
        </Track>
        <ScrollHintIcon type="button" aria-label="다음 공연 보기" onClick={handleScrollNext}>
          <Icon name="chevron" />
        </ScrollHintIcon>
      </CarouselWrap>
    </Section>
  );
}
