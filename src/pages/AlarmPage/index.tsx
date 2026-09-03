import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { TargetCard } from "../../components/alarm/TargetCard";
import { ToggleList } from "../../components/alarm/ToggleList";
import { Header } from "../../components/common/Header";
import { CtaBar } from "../../components/favorite/CtaBar";
import { alarmOptions as initialAlarmOptions, alarmTarget } from "../../data";
import { ROUTES } from "../../router/routes";

const Screen = styled.div`
  padding: var(--space-5) var(--space-5) calc(96px + var(--space-6));
`;

const GuideTitle = styled.p`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 4px;

  em {
    font-style: normal;
    color: var(--color-primary);
    font-weight: 800;
  }
`;

const GuideSub = styled.p`
  font-size: 13px;
  color: var(--color-text-sub);
  margin-bottom: var(--space-5);
`;

/** 알람설정 화면은 원본과 동일하게 하단탭바가 없다 (org/js/alarm.js 이식) */
export function AlarmPage() {
  const navigate = useNavigate();
  const [options, setOptions] = useState(initialAlarmOptions);

  const handleToggle = (id: string) => {
    setOptions((prev) => prev.map((o) => (o.id === id ? { ...o, checked: !o.checked } : o)));
  };

  return (
    <>
      <Header back title="알람설정" onBack={() => navigate(ROUTES.calendar)} />
      <Screen>
        <TargetCard target={alarmTarget} />
        <GuideTitle>
          <em>원하는</em> 알람 시간을 <em>모두 선택</em>해주세요
        </GuideTitle>
        <GuideSub>티켓 오픈 전 푸시 알림을 보내드려요.</GuideSub>
        <ToggleList options={options} onToggle={handleToggle} />
      </Screen>
      <CtaBar onClick={() => navigate(ROUTES.calendar)}>설정 완료</CtaBar>
    </>
  );
}
