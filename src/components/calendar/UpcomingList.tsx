import styled from "styled-components";
import type { UpcomingShow } from "../../types";
import { Icon } from "../common/Icon";
import { PosterPlaceholder } from "../common/PosterPlaceholder";
import { IconButton, Pill } from "../common/ui";

/** 예정된 공연 섹션에 노출할 최대 개수 (티켓 오픈 알림 섹션과 동일한 정책) */
const MAX_VISIBLE_UPCOMING = 5;

export interface UpcomingListProps {
  items: UpcomingShow[];
  onMoreClick?: () => void;
}

const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 17px;
  font-weight: 800;
  margin-bottom: var(--space-4);
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
`;

const Thumb = styled.div`
  flex-shrink: 0;
  width: 52px;
  height: 52px;
  border-radius: var(--radius-sm);
  overflow: hidden;
`;

const Body = styled.div`
  min-width: 0;
  flex: 1;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
`;

const DateText = styled.span`
  font-size: 12px;
  color: var(--color-text-sub);
`;

const Title = styled.p`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 2px;
`;

const Venue = styled.p`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--color-text-sub);

  svg {
    width: 12px;
    height: 12px;
    flex-shrink: 0;
  }
`;

/** org/js/calendar.js의 renderUpcomingList 이식 (예정된 공연 리스트) */
export function UpcomingList({ items, onMoreClick }: UpcomingListProps) {
  return (
    <>
      <SectionTitle>
        예정된 공연
        <IconButton type="button" aria-label="더 보기" onClick={onMoreClick}>
          <Icon name="plus" />
        </IconButton>
      </SectionTitle>
      {items.slice(0, MAX_VISIBLE_UPCOMING).map((u) => (
        <Item key={u.id}>
          <Thumb>
            <PosterPlaceholder $theme={u.theme} imageUrl={u.imageUrl} alt={u.title} />
          </Thumb>
          <Body>
            <Meta>
              <Pill $variant="pink">{u.category}</Pill>
              <DateText>{u.date}</DateText>
            </Meta>
            <Title>{u.title}</Title>
            <Venue>
              <Icon name="pin" />
              {u.venue}
            </Venue>
          </Body>
        </Item>
      ))}
    </>
  );
}
