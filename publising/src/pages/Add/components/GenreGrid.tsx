import { GENRE_OPTIONS } from '../../../data/constants'
import { GenreCard, GenreGridWrap, GenreIcon, GenreLabel } from '../styles'

interface GenreGridProps {
  selected: string[]
  onToggle: (genre: string) => void
}

export function GenreGrid({ selected, onToggle }: GenreGridProps) {
  return (
    <GenreGridWrap>
      {GENRE_OPTIONS.map((opt) => (
        <GenreCard
          key={opt.key}
          type="button"
          $selected={selected.includes(opt.key)}
          onClick={() => onToggle(opt.key)}
        >
          <GenreIcon $tone={opt.color}>{opt.icon}</GenreIcon>
          <GenreLabel>{opt.key}</GenreLabel>
        </GenreCard>
      ))}
    </GenreGridWrap>
  )
}
