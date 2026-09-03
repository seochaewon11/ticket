import styled from "styled-components";
import { PosterPlaceholder } from "../common/PosterPlaceholder";
import type { ArtistOption } from "../../types";

export interface ArtistResultsProps {
  results: ArtistOption[];
  selected: string[];
  onToggle: (id: string) => void;
}

const ResultsWrap = styled.div`
  min-height: 220px;
`;

const Empty = styled.p`
  text-align: center;
  color: var(--color-text-sub);
  font-size: 14px;
  padding: var(--space-8) 0;
`;

/* ---------- 검색 결과 1명 : 중앙 정렬 단일 카드 ---------- */
const SingleWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--space-6) 0 var(--space-4);
`;

const AvatarLg = styled.div`
  width: 100px;
  height: 100px;
  margin-bottom: var(--space-4);
  border-radius: var(--radius-full);
  overflow: hidden;
`;

const SingleName = styled.p`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: var(--space-5);
`;

const SelectButton = styled.button<{ $selected: boolean }>`
  padding: 11px 28px;
  border-radius: var(--radius-full);
  font-size: 14px;
  font-weight: 700;
  background: ${(props) => (props.$selected ? "var(--gradient-primary)" : "var(--color-badge-gray-bg)")};
  color: ${(props) => (props.$selected ? "var(--color-white)" : "var(--color-text-sub)")};
  transition: background 0.15s ease, color 0.15s ease;
`;

/* ---------- 검색 결과 여러 명 : 그리드 ---------- */
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-5) var(--space-3);
`;

const CardItem = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
`;

const AvatarMd = styled.div<{ $selected: boolean }>`
  width: 72px;
  height: 72px;
  border-radius: var(--radius-full);
  overflow: hidden;
  border: 2.5px solid ${(props) => (props.$selected ? "var(--color-primary)" : "transparent")};
  box-shadow: ${(props) => (props.$selected ? "0 0 0 2px var(--color-primary-soft)" : "none")};
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
`;

const ItemName = styled.span<{ $selected: boolean }>`
  font-size: 13px;
  font-weight: 600;
  color: ${(props) => (props.$selected ? "var(--color-primary-dark)" : "var(--color-text)")};
`;

/** org/js/favorite.js의 renderArtistResults 이식 */
export function ArtistResults({ results, selected, onToggle }: ArtistResultsProps) {
  if (results.length === 0) {
    return (
      <ResultsWrap>
        <Empty>검색 결과가 없어요. 다른 이름으로 검색해보세요.</Empty>
      </ResultsWrap>
    );
  }

  if (results.length === 1) {
    const artist = results[0];
    const isSelected = selected.includes(artist.id);
    return (
      <ResultsWrap>
        <SingleWrap>
          <AvatarLg>
            <PosterPlaceholder $theme={artist.theme} imageUrl={artist.imageUrl} alt={artist.name} />
          </AvatarLg>
          <SingleName>{artist.name}</SingleName>
          <SelectButton type="button" $selected={isSelected} onClick={() => onToggle(artist.id)}>
            {isSelected ? "선택 완료" : "선택"}
          </SelectButton>
        </SingleWrap>
      </ResultsWrap>
    );
  }

  return (
    <ResultsWrap>
      <Grid>
        {results.map((artist) => {
          const isSelected = selected.includes(artist.id);
          return (
            <CardItem key={artist.id} type="button" onClick={() => onToggle(artist.id)}>
              <AvatarMd $selected={isSelected}>
                <PosterPlaceholder $theme={artist.theme} imageUrl={artist.imageUrl} alt={artist.name} />
              </AvatarMd>
              <ItemName $selected={isSelected}>{artist.name}</ItemName>
            </CardItem>
          );
        })}
      </Grid>
    </ResultsWrap>
  );
}
