import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSearchOverlay } from "../../context/SearchOverlayContext";
import { useShareSheet } from "../../context/ShareSheetContext";
import { alarmPath } from "../../router/routes";
import type { ArtistNewsItem } from "../../types";
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
} from "../common/ui";

export interface ArtistNewsListProps {
  userName: string;
  items: ArtistNewsItem[];
  onToggleLike: (id: string) => void;
}

const ArticleCard = styled(Card)`
  margin-bottom: var(--space-4);
  overflow: hidden;
`;

const MediaWrap = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 11;
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

  return (
    <Section>
      <SectionHead>
        <SectionTitle>
          <strong>{userName}</strong>님이 좋아하는
          <br />
          아티스트 공연소식
        </SectionTitle>
        <SectionActions>
          <IconButton type="button" aria-label="더 찾기">
            <Icon name="plus" />
          </IconButton>
          <IconButton type="button" aria-label="검색" onClick={openSearch}>
            <Icon name="search" />
          </IconButton>
        </SectionActions>
      </SectionHead>

      {items.map((a) => (
        <ArticleCard as="article" key={a.id}>
          <MediaWrap>
            <PosterPlaceholder $theme={a.theme} imageUrl={a.imageUrl} alt={a.artistName} />
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
      ))}
    </Section>
  );
}
