import styled from "styled-components";
import type { Performance } from "../../types";
import { Icon } from "../common/Icon";
import { PosterPlaceholder } from "../common/PosterPlaceholder";
import { IconButton, Pill } from "../common/ui";

export interface HeroProps {
  performance: Performance;
  onToggleLike: (id: string) => void;
  onOpenDetail: (id: string) => void;
}

const HeroSection = styled.section`
  position: relative;
`;

const HeroMedia = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5;
  cursor: pointer;
`;

/** 디자인시안 기준: 사진을 살짝 어둡게 가라앉히고, 하단부는 텍스트가 올라갈 수 있게 짙게 그라디언트 처리 */
const HeroPoster = styled(PosterPlaceholder)`
  filter: brightness(0.82) saturate(0.9);

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(6, 5, 12, 0.92) 0%,
      rgba(6, 5, 12, 0.72) 32%,
      rgba(6, 5, 12, 0.28) 58%,
      transparent 78%
    );
  }
`;

const Watermark = styled.span`
  position: absolute;
  left: 50%;
  bottom: 38%;
  transform: translateX(-50%);
  font-size: 56px;
  font-weight: 800;
  letter-spacing: 4px;
  color: rgba(255, 255, 255, 0.14);
  white-space: nowrap;
  pointer-events: none;
`;

const LikeButton = styled(IconButton)`
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  z-index: 1;
`;

/** 정보 블록을 이미지 하단에 오버레이 (원본 org/css/main.css는 이미지 아래 흰 배경에 배치했지만, 디자인시안(7.메인.png)은 이미지 위에 오버레이되어 있어 그 쪽을 따른다) */
const HeroInfo = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0 var(--space-5) var(--space-5);
  color: var(--color-white);
`;

const MetaRow = styled.div`
  display: flex;
  gap: var(--space-2);
  margin-bottom: var(--space-3);
`;

const RatingPill = styled(Pill)`
  color: #f5a623;
  background: var(--color-badge-gray-bg);

  svg {
    width: 12px;
    height: 12px;
  }
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 700;
  color: var(--color-white);
  margin-bottom: var(--space-1);
`;

const Schedule = styled.p`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: var(--space-3);
`;

const MatchWrap = styled.div`
  margin-bottom: var(--space-3);
`;

const TagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
`;

/** org/js/main.js의 renderHero 이식 (디자인시안 기준으로 텍스트를 이미지 위에 오버레이) */
export function Hero({ performance, onToggleLike, onOpenDetail }: HeroProps) {
  const shortTitle = performance.title.split("(")[0].trim();

  return (
    <HeroSection>
      <HeroMedia onClick={() => onOpenDetail(performance.id)}>
        <HeroPoster $theme={performance.theme} imageUrl={performance.imageUrl} alt={performance.title}>
          <Watermark>{shortTitle}</Watermark>
        </HeroPoster>
        <LikeButton
          type="button"
          $float
          $active={performance.isLiked}
          aria-label="찜하기"
          onClick={(e) => {
            e.stopPropagation();
            onToggleLike(performance.id);
          }}
        >
          <Icon name="heart" filled={performance.isLiked} />
        </LikeButton>

        <HeroInfo>
          <MetaRow>
            <RatingPill $variant="gray">
              <Icon name="star" />
              {performance.rating?.toFixed(1)}
            </RatingPill>
            <Pill $variant="gray">{performance.duration}</Pill>
            <Pill $variant="gray">현재예매율 {performance.ticketRank}위</Pill>
          </MetaRow>
          <Title>{performance.title}</Title>
          <Schedule>
            {performance.dateRange} {performance.venue}
          </Schedule>
          <MatchWrap>
            <Pill $variant="purple">내 취향 일치 {performance.matchRate}%</Pill>
          </MatchWrap>
          <TagsRow>
            {performance.tags?.map((tag) => (
              <Pill key={tag} $variant="onImage">
                {tag}
              </Pill>
            ))}
          </TagsRow>
        </HeroInfo>
      </HeroMedia>
    </HeroSection>
  );
}
