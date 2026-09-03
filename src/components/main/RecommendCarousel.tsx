import styled from "styled-components";
import { useSearchOverlay } from "../../context/SearchOverlayContext";
import type { Performance } from "../../types";
import { Icon } from "../common/Icon";
import { PosterPlaceholder } from "../common/PosterPlaceholder";
import { IconButton, Pill, ScrollX, Section, SectionActions, SectionHead, SectionTitle } from "../common/ui";

export interface RecommendCarouselProps {
  userName: string;
  items: Performance[];
  onOpenDetail: (id: string) => void;
  onRetakePreferences: () => void;
}

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

const ScrollHintIcon = styled.span`
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
  pointer-events: none;

  svg {
    width: 14px;
    height: 14px;
  }
`;

const Track = styled(ScrollX)`
  scroll-snap-type: x proximity;
  padding-right: var(--space-5);
`;

const CardWrap = styled.button`
  position: relative;
  flex: 0 0 auto;
  width: 158px;
  height: 210px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-card);
  scroll-snap-align: start;
  text-align: left;
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

const CardTitle = styled.p`
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 6px;
`;

/** org/js/main.js의 renderRecommendCarousel 이식. 취향 일치 70% 이상인 공연만 최대 7개까지 가로 스크롤로 보여준다 */
export function RecommendCarousel({ userName, items, onOpenDetail, onRetakePreferences }: RecommendCarouselProps) {
  const { openSearch } = useSearchOverlay();

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
        <Track>
          {items.slice(0, 7).map((p) => (
            <CardWrap key={p.id} type="button" onClick={() => onOpenDetail(p.id)}>
              <CardPoster $theme={p.theme} imageUrl={p.imageUrl} alt={p.title} />
              <CardBody>
                <CardTitle>{p.title}</CardTitle>
                <Pill $variant="purple">내 취향 일치 {p.matchRate}%</Pill>
              </CardBody>
            </CardWrap>
          ))}
        </Track>
        <ScrollHintIcon aria-hidden="true">
          <Icon name="chevron" />
        </ScrollHintIcon>
      </CarouselWrap>
    </Section>
  );
}
