import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import alarmBadgeIcon from "../../assets/icons/alarm-badge.png";
import { Header } from "../../components/common/Header";
import { ticketAlarms } from "../../data";
import { alarmPath } from "../../router/routes";

const Screen = styled.div`
  padding: var(--space-5);
  padding-bottom: var(--space-8);
`;

const Subtitle = styled.p`
  font-size: 13px;
  color: var(--color-text-sub);
  margin-bottom: var(--space-5);
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

/** 캘린더 화면 "티켓 오픈 알림" 섹션의 + 버튼으로 진입하는 전체 목록 화면 */
export function TicketAlarmsPage() {
  const navigate = useNavigate();

  return (
    <>
      <Header back title="티켓 오픈 알림" onBack={() => navigate(-1)} />
      <Screen>
        <Subtitle>오픈 예정인 모든 티켓 알림을 한눈에 확인하세요.</Subtitle>
        {ticketAlarms.map((a) => (
          <AlarmCard key={a.id} $urgent={a.urgent}>
            <CardTop>
              <DdayBadge $urgent={a.urgent}>D-{a.dday}</DdayBadge>
              <AlarmIconButton
                type="button"
                aria-label="알람 설정 열기"
                onClick={() => navigate(alarmPath(a.id))}
              >
                <img src={alarmBadgeIcon} alt="" />
              </AlarmIconButton>
            </CardTop>
            <CardTitle $urgent={a.urgent}>{a.title}</CardTitle>
            <CardTime>{a.datetime}</CardTime>
          </AlarmCard>
        ))}
      </Screen>
    </>
  );
}
