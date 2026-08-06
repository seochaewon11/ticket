import { useNavigate } from 'react-router-dom'
import { Icon } from '../../../components/common/icon'
import type { TicketOpenAlert } from '../../../types'
import { AlertCard, AlertClockIcon, AlertDday, AlertSchedule, AlertScrollWrap, AlertTitle } from '../styles'

export function AlertScroll({ alerts }: { alerts: TicketOpenAlert[] }) {
  const navigate = useNavigate()

  return (
    <AlertScrollWrap>
      {alerts.map((alert) => {
        const muted = alert.theme !== 'primary'
        return (
          <AlertCard
            key={alert.id}
            $theme={alert.theme}
            onClick={() => navigate(`/alarm/${alert.id}`)}
          >
            <AlertDday>D-{alert.dDay}</AlertDday>
            <AlertClockIcon>
              <Icon name="clock" size={15} />
            </AlertClockIcon>
            <AlertTitle $muted={muted}>{alert.title}</AlertTitle>
            <AlertSchedule $muted={muted}>{alert.scheduleText}</AlertSchedule>
          </AlertCard>
        )
      })}
    </AlertScrollWrap>
  )
}
