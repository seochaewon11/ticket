import { Icon } from '../../../components/common/icon'
import { GENRE_OPTIONS } from '../../../data/constants'
import type { TasteDashboard } from '../../../types'
import { DashboardCard, DashboardCards as Grid, DashboardIcon, DashboardLabel, DashboardValue } from '../styles'

function genreIcon(genreName: string): string {
  const found = GENRE_OPTIONS.find((g) => g.key === genreName)
  return found ? found.icon : '🎪'
}

export function DashboardCards({ dashboard }: { dashboard: TasteDashboard }) {
  return (
    <Grid>
      <DashboardCard>
        <DashboardIcon>{genreIcon(dashboard.topGenre)}</DashboardIcon>
        <DashboardLabel>최애 장르</DashboardLabel>
        <DashboardValue>{dashboard.topGenre}</DashboardValue>
      </DashboardCard>
      <DashboardCard $highlight>
        <DashboardIcon $highlight>
          <Icon name="check" strokeWidth={2.5} size={18} />
        </DashboardIcon>
        <DashboardLabel>큐레이션 매칭률</DashboardLabel>
        <DashboardValue $highlight>{dashboard.curationMatchRate}%</DashboardValue>
      </DashboardCard>
    </Grid>
  )
}
