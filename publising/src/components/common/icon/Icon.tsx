import { ICONS, type IconName } from './iconPaths'

interface IconProps {
  name: IconName
  size?: number
  strokeWidth?: number
  className?: string
}

// org/*.html 전역에서 반복되던 인라인 SVG를 대체하는 공통 아이콘 컴포넌트
export function Icon({ name, size = 22, strokeWidth = 2, className }: IconProps) {
  const def = ICONS[name]

  return (
    <svg
      viewBox={def.viewBox}
      width={size}
      height={size}
      className={className}
      fill={def.filled ? 'currentColor' : 'none'}
      stroke={def.filled ? 'none' : 'currentColor'}
      strokeWidth={def.filled ? undefined : strokeWidth}
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: def.markup }}
    />
  )
}
