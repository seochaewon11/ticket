import { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSearchOverlay } from "../../context/SearchOverlayContext";
import { useShareSheet } from "../../context/ShareSheetContext";
import { performances } from "../../data";
import { alarmPath, detailPath } from "../../router/routes";
import type { ArtistNewsItem } from "../../types";
import { BottomSheet, type BottomSheetOption } from "../common/BottomSheet";
import { Icon } from "../common/Icon";
import { PosterPlaceholder } from "../common/PosterPlaceholder";
import {
  Card,
  IconButton,
  OutlineButton,
  Pill,
  Section,
  SectionActions,
  SectionHead,
  SectionTitle,
  cardPopFeedback,
} from "../common/ui";

export interface ArtistNewsListProps {
  userName: string;
  items: ArtistNewsItem[];
  onToggleLike: (id: string) => void;
}

const ArticleCard = styled(Card)`
  margin-bottom: var(--space-4);
  overflow: hidden;
  ${cardPopFeedback}

  &:active,
  &:hover {
    box-shadow: var(--shadow-float);
  }
`;

const MediaWrap = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 11;
`;

/** DetailPage 히어로 포스터와 layoutId를 공유해 셰어드 엘리먼트 전환을 만든다 */
const PosterMotionWrap = styled(motion.button)`
  display: block;
  width: 100%;
  height: 100%;
  text-align: left;
`;

const ActionsRow = styled.div`
  position: absolute;
  top: var(--space-3);
  right: var(--space-3);
  display: flex;
  gap: var(--space-2);
`;

const Body = styled.div`
  padding: var(--space-4);
`;

const Badges = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-3);
`;

const ItemTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 2px;
`;

const ItemSub = styled.p`
  font-size: 13px;
  color: var(--color-text-sub);
  margin-bottom: var(--space-4);
`;

/** org/js/main.js의 renderArtistNews 이식 */
export function ArtistNewsList({ userName, items, onToggleLike }: ArtistNewsListProps) {
  const { openSearch } = useSearchOverlay();
  const { openShare } = useShareSheet();
  const navigate = useNavigate();
  const [sheetOpen, setSheetOpen] = useState(false);
  const closeSheet = () => setSheetOpen(false);

  const findMoreOptions: BottomSheetOption[] = [
    { id: "search", icon: "search", label: "아티스트 검색", onSelect: () => { closeSheet(); openSearch(); } },
    { id: "genre", icon: "genre", label: "장르별로 찾기", onSelect: closeSheet },
    { id: "trending", icon: "trendUp", label: "인기 급상승 아티스트", onSelect: closeSheet },
    { id: "following", icon: "heart", label: "팔로우한 아티스트만 보기", onSelect: closeSheet },
    { id: "alarm", icon: "bell", label: "새 소식 알림 설정", onSelect: closeSheet },
  ];

  return (
    <Section>
      <SectionHead>
        <SectionTitle>
          <strong>{userName}</strong>님이 좋아하는
          <br />
          아티스트 공연소식
        </SectionTitle>
        <SectionActions>
          <IconButton type="button" aria-label="더 찾기" onClick={() => setSheetOpen(true)}>
            <Icon name="plus" />
          </IconButton>
          <IconButton type="button" aria-label="검색" onClick={openSearch}>
            <Icon name="search" />
          </IconButton>
        </SectionActions>
      </SectionHead>
      <BottomSheet isOpen={sheetOpen} onClose={closeSheet} title="아티스트 소식 더 찾기" options={findMoreOptions} />

      {items.map((a) => {
        // 아티스트 소식은 실제 공연(performances)과 theme으로 이어져 있을 때만 상세화면으로 연결한다
        const matched = performances.find((p) => p.theme === a.theme);

        return (
        <ArticleCard as="article" key={a.id}>
          <MediaWrap>
            {matched ? (
              <PosterMotionWrap
                type="button"
                layoutId={`poster-${matched.id}`}
                aria-label={`${a.title} 상세보기`}
                onClick={() => navigate(detailPath(matched.id))}
              >
                <PosterPlaceholder $theme={a.theme} imageUrl={a.imageUrl} alt={a.artistName} />
              </PosterMotionWrap>
            ) : (
              <PosterPlaceholder $theme={a.theme} imageUrl={a.imageUrl} alt={a.artistName} />
            )}
            <ActionsRow>
              <IconButton type="button" $float aria-label="공유하기" onClick={openShare}>
                <Icon name="share" />
              </IconButton>
              <IconButton
                type="button"
                $float
                $active={a.isLiked}
                aria-label="찜하기"
                onClick={() => onToggleLike(a.id)}
              >
                <Icon name="heart" filled={a.isLiked} />
              </IconButton>
            </ActionsRow>
          </MediaWrap>
          <Body>
            <Badges>
              <Pill $variant="purple">{a.artistName}</Pill>
              <Pill $variant="outline">D-{a.dDay}</Pill>
            </Badges>
            <ItemTitle>{a.title}</ItemTitle>
            <ItemSub>
              {a.date} | {a.venue}
            </ItemSub>
            <OutlineButton type="button" $active={a.alarmSet} onClick={() => navigate(alarmPath(a.id))}>
              {a.alarmSet ? "알람설정 완료" : "알람설정하기"}
            </OutlineButton>
          </Body>
        </ArticleCard>
        );
      })}
    </Section>
  );
}
