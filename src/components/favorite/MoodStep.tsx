import styled from "styled-components";
import type { CategoryOption, MoodOption } from "../../types";
import { CategoryGrid } from "./CategoryGrid";
import { CtaBar } from "./CtaBar";
import { MoodList } from "./MoodList";
import { ProgressBar } from "./ProgressBar";

export interface MoodStepProps {
  step: number;
  totalSteps: number;
  categoryOptions: CategoryOption[];
  moodOptions: MoodOption[];
  selectedCategories: string[];
  selectedMoods: string[];
  onToggleCategory: (id: string) => void;
  onToggleMood: (id: string) => void;
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

const SectionTitle = styled.h2`
  font-size: 17px;
  font-weight: 800;
  margin: var(--space-8) 0 var(--space-4);
`;

/** org/js/favorite.js의 renderMoodStep (Sub-step 1: 장르·분위기) 이식 */
export function MoodStep({
  step,
  totalSteps,
  categoryOptions,
  moodOptions,
  selectedCategories,
  selectedMoods,
  onToggleCategory,
  onToggleMood,
  onNext,
}: MoodStepProps) {
  const canProceed = selectedCategories.length > 0 && selectedMoods.length > 0;

  return (
    <>
      <ProgressBar step={step} total={totalSteps} />
      <Title>어떤 공연을 좋아하세요?</Title>
      <Subtitle>취향에 맞는 공연을 추천해 드릴게요.</Subtitle>
      <CategoryGrid options={categoryOptions} selected={selectedCategories} onToggle={onToggleCategory} />

      <SectionTitle>좋아하는 분위기는?</SectionTitle>
      <MoodList options={moodOptions} selected={selectedMoods} onToggle={onToggleMood} />

      <CtaBar disabled={!canProceed} onClick={onNext}>
        다음 단계로
      </CtaBar>
    </>
  );
}
