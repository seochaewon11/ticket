import { MOOD_OPTIONS } from '../../../data/constants'
import { MoodTag, MoodTagsWrap } from '../styles'

interface MoodTagsProps {
  selected: string[]
  onToggle: (mood: string) => void
}

export function MoodTags({ selected, onToggle }: MoodTagsProps) {
  return (
    <MoodTagsWrap>
      {MOOD_OPTIONS.map((mood) => (
        <MoodTag key={mood} type="button" $selected={selected.includes(mood)} onClick={() => onToggle(mood)}>
          {mood}
        </MoodTag>
      ))}
    </MoodTagsWrap>
  )
}
