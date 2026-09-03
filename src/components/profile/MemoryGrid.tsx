import styled from "styled-components";
import type { MemoryItem } from "../../types";
import { PosterPlaceholder } from "../common/PosterPlaceholder";

export interface MemoryGridProps {
  items: MemoryItem[];
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-3);
  margin-bottom: var(--space-6);
`;

const Card = styled.div`
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--color-white);
`;

const Media = styled.div`
  position: relative;
  width: 100%;
  height: 110px;
`;

const DateBadge = styled.span`
  position: absolute;
  left: 8px;
  top: 8px;
  padding: 3px 8px;
  border-radius: var(--radius-sm);
  background: rgba(0, 0, 0, 0.55);
  color: var(--color-white);
  font-size: 10px;
  font-weight: 700;
`;

const CardTitle = styled.p`
  padding: var(--space-2) var(--space-3) var(--space-3);
  font-size: 12.5px;
  font-weight: 700;
  color: var(--color-text);
`;

/** org/js/profile.js의 renderMemoryGrid 이식 (나의 공연 기억 2열 그리드) */
export function MemoryGrid({ items }: MemoryGridProps) {
  return (
    <Grid>
      {items.map((m) => (
        <Card key={m.id}>
          <Media>
            <PosterPlaceholder $theme={m.theme} alt={m.title} />
            <DateBadge>{m.date}</DateBadge>
          </Media>
          <CardTitle>{m.title}</CardTitle>
        </Card>
      ))}
    </Grid>
  );
}
