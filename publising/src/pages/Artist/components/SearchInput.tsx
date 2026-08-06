import { Icon } from '../../../components/common/icon'
import { SearchInputWrap } from '../styles'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <SearchInputWrap>
      <Icon name="search" size={18} />
      <input
        type="text"
        placeholder="아티스트 이름을 검색해보세요"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </SearchInputWrap>
  )
}
