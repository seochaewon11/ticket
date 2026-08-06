import type { ReminderOption } from '../../../types'
import { ReminderLabel, ReminderRow, SwitchInput, SwitchLabel, SwitchThumb, SwitchTrack } from '../styles'

interface ReminderToggleProps {
  option: ReminderOption
  onToggle: (key: string) => void
}

export function ReminderToggle({ option, onToggle }: ReminderToggleProps) {
  return (
    <ReminderRow>
      <ReminderLabel>{option.label}</ReminderLabel>
      <SwitchLabel>
        <SwitchInput
          type="checkbox"
          role="switch"
          checked={option.enabled}
          onChange={() => onToggle(option.key)}
        />
        <SwitchTrack>
          <SwitchThumb />
        </SwitchTrack>
      </SwitchLabel>
    </ReminderRow>
  )
}
