import styled from "styled-components";
import type { AlarmTarget } from "../../types";
import { Icon } from "../common/Icon";
import { PosterPlaceholder } from "../common/PosterPlaceholder";
import { Card, Pill } from "../common/ui";

export interface TargetCardProps {
  target: AlarmTarget;
}

const Box = styled(Card)`
  display: flex;
  gap: var(--space-3);
  padding: var(--space-4);
  margin-bottom: var(--space-6);
`;

const Thumb = styled.div`
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  border-radius: var(--radius-md);
  overflow: hidden;
`;

const Body = styled.div`
  min-width: 0;
  flex: 1;
`;

const Tags = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 6px;
`;

const Title = styled.p`
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 4px;
`;

const Time = styled.p`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12.5px;
  color: var(--color-text-sub);

  svg {
    width: 13px;
    height: 13px;
    flex-shrink: 0;
  }
`;

/** org/js/alarm.js의 renderTargetCard 이식 (알람설정 대상 공연 카드) */
export function TargetCard({ target }: TargetCardProps) {
  return (
    <Box>
      <Thumb>
        <PosterPlaceholder $theme={target.theme} imageUrl={target.imageUrl} alt={target.title} />
      </Thumb>
      <Body>
        <Tags>
          {target.tags.map((t) => (
            <Pill key={t} $variant="purple">
              {t}
            </Pill>
          ))}
        </Tags>
        <Title>{target.title}</Title>
        <Time>
          <Icon name="calendar" />
          {target.datetime}
        </Time>
      </Body>
    </Box>
  );
}
