import styled from "styled-components";

export interface ProgressBarProps {
  step: number;
  total: number;
}

const Track = styled.div`
  height: 6px;
  border-radius: var(--radius-full);
  background: var(--color-primary-soft);
  overflow: hidden;
  margin-bottom: var(--space-2);
`;

const Fill = styled.div<{ $percent: number }>`
  height: 100%;
  border-radius: var(--radius-full);
  background: var(--gradient-primary);
  transition: width 0.3s ease;
  width: ${(props) => props.$percent}%;
`;

const StepLabel = styled.p`
  text-align: right;
  font-size: 12px;
  color: var(--color-text-sub);
  margin-bottom: var(--space-6);
`;

/** org/js/favorite.js의 renderProgress(step, total) 이식 */
export function ProgressBar({ step, total }: ProgressBarProps) {
  const percent = Math.round((step / total) * 100);
  return (
    <>
      <Track>
        <Fill $percent={percent} />
      </Track>
      <StepLabel>
        Step {step} of {total}
      </StepLabel>
    </>
  );
}
