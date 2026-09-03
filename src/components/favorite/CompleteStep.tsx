import styled from "styled-components";
import { ProgressBar } from "./ProgressBar";

export interface CompleteStepProps {
  step: number;
  totalSteps: number;
  userName: string;
  greetingName: string;
  tags: string[];
  onFinish: () => void;
}

const Wrap = styled.div`
  padding-bottom: var(--space-6);
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 800;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: var(--color-text-sub);
  margin-bottom: var(--space-6);
`;

const AnalysisCard = styled.div`
  background: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  padding: var(--space-6) var(--space-5);
  margin-bottom: var(--space-6);
`;

const Eyebrow = styled.span`
  display: block;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: var(--color-primary);
  margin-bottom: var(--space-2);
`;

const Heading = styled.h2`
  font-size: 20px;
  font-weight: 800;
  line-height: 1.4;
  margin-bottom: var(--space-5);
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-6);
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: var(--radius-full);
  font-size: 13px;
  font-weight: 600;
  background: var(--color-primary-soft);
  color: var(--color-primary-dark);
`;

const Footer = styled.p`
  font-size: 14px;
  font-weight: 600;
  line-height: 1.6;
  color: var(--color-text);
`;

const FinishButton = styled.button`
  width: 100%;
  padding: 13px 16px;
  border-radius: var(--radius-full);
  font-size: 14px;
  font-weight: 700;
  background: var(--gradient-primary);
  color: var(--color-white);
  box-shadow: var(--shadow-float);
  transition: transform 0.15s ease;

  &:active {
    transform: scale(0.98);
  }
`;

/** org/js/favorite.js의 renderCompleteStep (Sub-step 3: 분석 결과 요약) 이식 */
export function CompleteStep({ step, totalSteps, userName, greetingName, tags, onFinish }: CompleteStepProps) {
  return (
    <Wrap>
      <ProgressBar step={step} total={totalSteps} />
      <Title>설정이 완료되었습니다!</Title>
      <Subtitle>NOLI가 {greetingName}님 취향을 찾았어요.</Subtitle>

      <AnalysisCard>
        <Eyebrow>ANALYSIS</Eyebrow>
        <Heading>
          {userName}님을 위한
          <br />
          맞춤 공연을 준비했어요
        </Heading>
        <Tags>
          {tags.map((tag, index) => (
            <Tag key={`${tag}-${index}`}>{tag}</Tag>
          ))}
        </Tags>
        <Footer>
          {greetingName}님이 좋아할 만한
          <br />
          공연 정보들을 매일 배달해 드릴게요!
        </Footer>
      </AnalysisCard>

      <FinishButton type="button" onClick={onFinish}>
        NOLI 시작하기
      </FinishButton>
    </Wrap>
  );
}
