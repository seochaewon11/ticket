import styled from "styled-components";
import alarmBadgeIcon from "../../assets/icons/alarm-badge.png";
import type { TicketAlarm } from "../../types";
import { Icon } from "../common/Icon";
import { IconButton } from "../common/ui";

/** 티켓 오픈 알림 섹션에 노출할 최대 개수 */
const MAX_VISIBLE_ALARMS = 5;

export interface AlarmListProps {
  items: TicketAlarm[];
  onMoreClick: () => void;
  onAlarmClick: (id: string) => void;
}

const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 17px;
  font-weight: 800;
  margin-bottom: var(--space-4);
`;

const AlarmCard = styled.div<{ $urgent: boolean }>`
  position: relative;
  overflow: hidden;
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  background: ${(props) =>
    props.$urgent
      ? "linear-gradient(120deg, #FBDCE1, #FDEEF0)"
      : "linear-gradient(120deg, var(--color-primary-soft), var(--color-primary-softer))"};
  margin-bottom: var(--space-3);
`;

const CardTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-2);
`;

const DdayBadge = styled.span<{ $urgent: boolean }>`
  display: inline-flex;
  padding: 4px 10px;
  border-radius: var(--radius-full);
  font-size: 11px;
  font-weight: 700;
  background: ${(props) => (props.$urgent ? "#E0355B" : "var(--color-white)")};
  color: ${(props) => (props.$urgent ? "var(--color-white)" : "var(--color-primary-dark)")};
`;

const AlarmIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 20px;
    height: 20px;
  }
`;

const CardTitle = styled.p<{ $urgent: boolean }>`
  font-size: 15px;
  font-weight: 800;
  color: ${(props) => (props.$urgent ? "#C22449" : "var(--color-primary-dark)")};
  margin-bottom: 4px;
`;

const CardTime = styled.p`
  font-size: 12.5px;
  color: var(--color-text-sub);
`;

/** org/js/calendar.js의 renderAlarmList 이식 (티켓 오픈 알림 카드 리스트) */
export function AlarmList({ items, onMoreClick, onAlarmClick }: AlarmListProps) {
  return (
    <>
      <SectionTitle>
        티켓 오픈 알림
        <IconButton type="button" aria-label="더 보기" onClick={onMoreClick}>
          <Icon name="plus" />
        </IconButton>
      </SectionTitle>
      {items.slice(0, MAX_VISIBLE_ALARMS).map((a) => (
        <AlarmCard key={a.id} $urgent={a.urgent}>
          <CardTop>
            <DdayBadge $urgent={a.urgent}>D-{a.dday}</DdayBadge>
            <AlarmIconButton type="button" aria-label="알람 설정 열기" onClick={() => onAlarmClick(a.id)}>
              <img src={alarmBadgeIcon} alt="" />
            </AlarmIconButton>
          </CardTop>
          <CardTitle $urgent={a.urgent}>{a.title}</CardTitle>
          <CardTime>{a.datetime}</CardTime>
        </AlarmCard>
      ))}
    </>
  );
}
