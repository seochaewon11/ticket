import styled from "styled-components";
import type { TopArtist } from "../../types";
import { PosterPlaceholder } from "../common/PosterPlaceholder";
import { Card } from "../common/ui";

export interface RankListProps {
  items: TopArtist[];
}

const ListCard = styled(Card)`
  padding: var(--space-5);
  margin-bottom: var(--space-5);
`;

const Title = styled.p`
  font-size: 17px;
  font-weight: 800;
  margin-bottom: var(--space-4);
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  margin-bottom: var(--space-2);

  &:last-child {
    margin-bottom: 0;
  }
`;

const RankBadge = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: var(--radius-full);
  background: var(--color-primary);
  color: var(--color-white);
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  overflow: hidden;
  flex-shrink: 0;
`;

const Body = styled.div`
  flex: 1;
  min-width: 0;
`;

const Name = styled.p`
  font-size: 14px;
  font-weight: 700;
`;

const Role = styled.p`
  font-size: 12px;
  color: var(--color-text-sub);
`;

const Count = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: var(--color-text-sub);
  flex-shrink: 0;
`;

/** org/js/report.js의 renderRankList 이식 (최애 아티스트 랭킹) */
export function RankList({ items }: RankListProps) {
  return (
    <ListCard>
      <Title>최애 아티스트 랭킹</Title>
      {items.map((a) => (
        <Row key={a.rank}>
          <RankBadge>{a.rank}</RankBadge>
          <Avatar>
            <PosterPlaceholder $theme={a.theme} imageUrl={a.imageUrl} alt={a.name} />
          </Avatar>
          <Body>
            <Name>{a.name}</Name>
            <Role>{a.role}</Role>
          </Body>
          <Count>{a.count}회</Count>
        </Row>
      ))}
    </ListCard>
  );
}
