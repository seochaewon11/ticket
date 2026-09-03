import styled from "styled-components";
import { Icon } from "../common/Icon";

export interface MatchCardProps {
  userName: string;
  matchRate: number;
  matchReasonHtml?: string;
  genrePreferenceText?: string;
  trendingText?: string;
}

const Card = styled.div`
  background: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  padding: var(--space-5);
  margin-bottom: var(--space-6);
`;

const Head = styled.p`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 15px;
  font-weight: 700;
  margin-bottom: var(--space-3);

  svg {
    width: 18px;
    height: 18px;
    color: var(--color-primary);
    flex-shrink: 0;
  }
`;

const MatchRate = styled.span`
  color: var(--color-primary);
  font-weight: 800;
`;

const Reason = styled.p`
  font-size: 13.5px;
  line-height: 1.6;
  color: var(--color-text);
  margin-bottom: var(--space-4);

  em {
    font-style: normal;
    font-weight: 700;
    color: var(--color-primary-dark);
  }
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3);
  border-radius: var(--radius-md);
  background: var(--color-primary-softer);
  margin-bottom: var(--space-2);

  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: var(--radius-full);
  background: var(--color-white);
  color: var(--color-primary);
  flex-shrink: 0;

  svg {
    width: 17px;
    height: 17px;
  }
`;

const InfoTitle = styled.p`
  font-size: 13.5px;
  font-weight: 700;
  margin-bottom: 2px;
`;

const InfoSub = styled.p`
  font-size: 12px;
  color: var(--color-text-sub);
`;

/** org/js/detail.js의 renderMatchCard 이식 */
export function MatchCard({ userName, matchRate, matchReasonHtml, genrePreferenceText, trendingText }: MatchCardProps) {
  return (
    <Card>
      <Head>
        <Icon name="sparkleOutline" />
        {userName} 님의 취향일치 <MatchRate>{matchRate}%</MatchRate>
      </Head>
      {matchReasonHtml && <Reason dangerouslySetInnerHTML={{ __html: matchReasonHtml }} />}

      <InfoRow>
        <InfoIcon>
          <Icon name="genre" />
        </InfoIcon>
        <div>
          <InfoTitle>장르 선호도</InfoTitle>
          <InfoSub>{genrePreferenceText}</InfoSub>
        </div>
      </InfoRow>
      <InfoRow>
        <InfoIcon>
          <Icon name="trendUp" />
        </InfoIcon>
        <div>
          <InfoTitle>인기 급상승</InfoTitle>
          <InfoSub>{trendingText}</InfoSub>
        </div>
      </InfoRow>
    </Card>
  );
}
