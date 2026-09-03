import styled from "styled-components";
import type { ArtistOption } from "../../types";
import { ArtistResults } from "./ArtistResults";
import { ArtistSearchBox } from "./ArtistSearchBox";
import { CtaBar } from "./CtaBar";
import { ProgressBar } from "./ProgressBar";

export interface ArtistStepProps {
  step: number;
  totalSteps: number;
  query: string;
  onQueryChange: (value: string) => void;
  results: ArtistOption[];
  selectedArtists: string[];
  onToggleArtist: (id: string) => void;
  onNext: () => void;
}

const Title = styled.h1`
  font-size: 21px;
  font-weight: 800;
  margin-bottom: 6px;
`;

const Subtitle = styled.p`
  font-size: 13px;
  color: var(--color-text-sub);
  margin-bottom: var(--space-5);
`;

/** org/js/favorite.js의 renderArtistStep (Sub-step 2: 아티스트 검색) 이식 */
export function ArtistStep({
  step,
  totalSteps,
  query,
  onQueryChange,
  results,
  selectedArtists,
  onToggleArtist,
  onNext,
}: ArtistStepProps) {
  const canProceed = selectedArtists.length > 0;

  return (
    <>
      <ProgressBar step={step} total={totalSteps} />
      <Title>좋아하는 아티스트가 있나요?</Title>
      <Subtitle>선택하신 아티스트의 공연소식을 빠르게 만나볼 수 있어요!</Subtitle>

      <ArtistSearchBox value={query} onChange={onQueryChange} />

      <ArtistResults results={results} selected={selectedArtists} onToggle={onToggleArtist} />

      <CtaBar disabled={!canProceed} onClick={onNext}>
        완료
      </CtaBar>
    </>
  );
}
