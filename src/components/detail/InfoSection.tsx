import styled from "styled-components";
import { Icon } from "../common/Icon";
import { IconButton } from "../common/ui";

export interface InfoSectionProps {
  period?: string;
  runningTime?: string;
  priceRange?: string;
}

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 17px;
  font-weight: 800;
  margin-bottom: var(--space-4);
`;

const InfoRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
`;

const InfoIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  color: var(--color-text-sub);
  margin-top: 2px;
  flex-shrink: 0;

  svg {
    width: 19px;
    height: 19px;
  }
`;

const Label = styled.p`
  font-size: 12.5px;
  color: var(--color-text-sub);
  margin-bottom: 2px;
`;

const Value = styled.p`
  font-size: 14.5px;
  font-weight: 700;
`;

/** org/js/detail.js의 renderInfoSection 이식 */
export function InfoSection({ period, runningTime, priceRange }: InfoSectionProps) {
  return (
    <>
      <TitleRow>
        공연 상세정보
        <IconButton type="button" aria-label="더 보기">
          <Icon name="plus" />
        </IconButton>
      </TitleRow>

      <InfoRow>
        <InfoIcon>
          <Icon name="calendar" />
        </InfoIcon>
        <div>
          <Label>기간</Label>
          <Value>{period}</Value>
        </div>
      </InfoRow>
      <InfoRow>
        <InfoIcon>
          <Icon name="clock" />
        </InfoIcon>
        <div>
          <Label>러닝타임</Label>
          <Value>{runningTime}</Value>
        </div>
      </InfoRow>
      <InfoRow>
        <InfoIcon>
          <Icon name="ticket" />
        </InfoIcon>
        <div>
          <Label>티켓 가격</Label>
          <Value>{priceRange}</Value>
        </div>
      </InfoRow>
    </>
  );
}
