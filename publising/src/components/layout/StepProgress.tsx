// common.css의 .step-progress(점 트랙)만 이식.
// add/artist에서 바깥 padding과 "Step X of Y" 라벨의 위치/스타일이 서로 달라 각 페이지에서 별도로 감싼다.
import styled from 'styled-components'

const Track = styled.div`
  display: flex;
  gap: 6px;
`

const Step = styled.span<{ $filled: boolean }>`
  flex: 1;
  height: 5px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background-color: ${({ theme, $filled }) => ($filled ? theme.colors.primaryStrong : theme.colors.disabledBg)};
`

interface StepProgressProps {
  currentStep: number
  totalSteps: number
  className?: string
}

export function StepProgress({ currentStep, totalSteps, className }: StepProgressProps) {
  return (
    <Track className={className}>
      {Array.from({ length: totalSteps }, (_, i) => (
        <Step key={i} $filled={i < currentStep} />
      ))}
    </Track>
  )
}
