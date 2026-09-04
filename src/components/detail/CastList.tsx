import styled from "styled-components";
import type { CastMember } from "../../types";
import { PosterPlaceholder } from "../common/PosterPlaceholder";

export interface CastListProps {
  cast: CastMember[];
}

const SectionTitle = styled.div`
  font-size: 17px;
  font-weight: 800;
  margin-bottom: var(--space-4);
  margin-top: var(--space-6);
`;

const Scroll = styled.div`
  display: flex;
  gap: var(--space-4);
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Item = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  width: 68px;
`;

const Avatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: var(--radius-full);
  overflow: hidden;
  background: var(--color-badge-gray-bg);
`;

const Name = styled.p`
  font-size: 12.5px;
  font-weight: 700;
  text-align: center;
`;

const Role = styled.p`
  font-size: 11px;
  color: var(--color-text-sub);
  text-align: center;
`;

/** org/js/detail.js의 renderCast 이식 (theme이 빈 문자열인 출연진은 회색 원형만 표시) */
export function CastList({ cast }: CastListProps) {
  return (
    <>
      <SectionTitle>출연진</SectionTitle>
      <Scroll>
        {cast.map((c, index) => (
          <Item key={`${c.name}-${index}`}>
            <Avatar>
              {c.theme && <PosterPlaceholder $theme={c.theme} imageUrl={c.imageUrl} alt={c.name} />}
            </Avatar>
            <Name>{c.name}</Name>
            <Role>{c.role}</Role>
          </Item>
        ))}
      </Scroll>
    </>
  );
}
