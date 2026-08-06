// common.css의 :root 디자인 토큰을 그대로 이식한 테마 객체

export const theme = {
  fontFamily:
    "'42dot Sans', -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Malgun Gothic', system-ui, sans-serif",

  colors: {
    primary: '#A78BFA',
    primaryStrong: '#7C5CFC',
    primarySoft: '#EDE7FE',

    accent: '#F7F0EC',
    accentSoft: '#FBF5F2',

    pink: '#F6D9DC',
    pinkStrong: '#D97C8C',

    text: '#1F2024',
    textSub: '#8B8B98',
    textMute: '#ADADB8',
    white: '#FFFFFF',

    surface: '#FFFFFF',
    disabledBg: '#EDE6E2',
    disabledText: '#B7AFAA',
    border: '#EEE7E2',
  },

  radius: {
    sm: '10px',
    md: '16px',
    lg: '22px',
    pill: '999px',
  },

  shadow: {
    card: '0 8px 24px rgba(31, 26, 40, 0.06)',
    float: '0 10px 30px rgba(124, 92, 252, 0.18)',
    nav: '0 -4px 20px rgba(31, 26, 40, 0.05)',
  },

  layout: {
    appMaxWidth: '480px',
  },
} as const

export type AppTheme = typeof theme
