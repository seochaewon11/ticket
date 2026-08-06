// org/alarm.html + alarm.js 이식 (알람 설정)
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppShell } from '../../components/layout/AppShell'
import { BackTopbar } from '../../components/layout/BackTopbar'
import { Button } from '../../components/common/Button'
import { Icon } from '../../components/common/icon'
import { useNoliData } from '../../hooks/useNoliData'
import { ReminderToggle } from './components/ReminderToggle'
import {
  AlarmCta,
  AlarmPageWrap,
  BellIconWrap,
  EmptyState,
  ReminderHeading,
  ReminderList,
  ScheduleDivider,
  TargetCard,
  TargetInfo,
  TargetSchedule,
  TargetTag,
  TargetTags,
  TargetThumb,
  TargetTitle,
} from './styles'

export function AlarmPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { getAlertWithReminderState, toggleAlertReminder } = useNoliData()
  const [imgError, setImgError] = useState(false)

  const alertId = id || 'alert_001'
  const alert = getAlertWithReminderState(alertId)

  function goBack() {
    navigate(-1)
  }

  if (!alert) {
    return (
      <AppShell>
        <EmptyState>알람 정보를 찾을 수 없어요.</EmptyState>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <AlarmPageWrap>
        <BackTopbar variant="title" title="알람 설정" onBack={goBack} />

        <TargetCard>
          <TargetThumb
            style={imgError ? { background: 'linear-gradient(160deg, #2A2140 0%, #7C5CFC 60%, #F7F0EC 100%)' } : undefined}
          >
            {!imgError && (
              <img src={alert.posterUrl} alt="공연 포스터" onError={() => setImgError(true)} />
            )}
          </TargetThumb>
          <TargetInfo>
            <TargetTags>
              {alert.genreTags.map((tag) => (
                <TargetTag key={tag}>{tag}</TargetTag>
              ))}
            </TargetTags>
            <TargetTitle>{alert.title}</TargetTitle>
            <TargetSchedule>
              <Icon name="calendar" size={13} />
              <span>{alert.dateText}</span>
              <ScheduleDivider>|</ScheduleDivider>
              <Icon name="clock" size={13} />
              <span>{alert.timeText}</span>
            </TargetSchedule>
          </TargetInfo>
        </TargetCard>

        <ReminderHeading>
          <BellIconWrap>
            <Icon name="bell" size={22} />
          </BellIconWrap>
          <div>
            <h2>원하는 알람 시간을 모두 선택해주세요</h2>
            <p>티켓 오픈 전 푸시 알림을 보내드려요.</p>
          </div>
        </ReminderHeading>

        <ReminderList>
          {alert.reminderOptions.map((opt) => (
            <ReminderToggle key={opt.key} option={opt} onToggle={(key) => toggleAlertReminder(alertId, key)} />
          ))}
        </ReminderList>

        <AlarmCta>
          <Button type="button" $variant="primary" onClick={goBack}>
            설정 완료
          </Button>
        </AlarmCta>
      </AlarmPageWrap>
    </AppShell>
  )
}
