/**
 * org/css/common.css :root 변수를 타입 있는 테마 객체로 이식.
 * GlobalStyle에서 동일한 값을 CSS 커스텀 프로퍼티로도 노출한다.
 */
export const theme = {
  colors: {
    primary: "#7136DB",
    primaryDark: "#5B21B6",
    primaryDarker: "#4C1D95",
    primarySoft: "#EDE4FB",
    primarySofter: "#F5F0FC",
    text: "#1B1B23",
    textSub: "#8C8C9A",
    textPlaceholder: "#B7B4C4",
    white: "#FFFFFF",
    bg: "#FFFFFF",
    bgMuted: "#FAF9FC",
    border: "#ECE8F5",
    borderStrong: "#DCD5EE",
    badgePinkBg: "#FDE7ED",
    badgePinkText: "#D6336C",
    badgeGrayBg: "#F1F1F4",
    badgeGrayText: "#6B6B76",
    ddayUrgent: "#E0355B",
  },
  gradients: {
    primary: "linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)",
    splashBg: "linear-gradient(160deg, #EDE7FB 0%, #FBEFF6 100%)",
  },
  radius: {
    sm: "8px",
    md: "14px",
    lg: "20px",
    xl: "26px",
    full: "999px",
  },
  spacing: {
    1: "4px",
    2: "8px",
    3: "12px",
    4: "16px",
    5: "20px",
    6: "24px",
    8: "32px",
  },
  shadow: {
    card: "0 4px 16px rgba(113, 54, 219, 0.08)",
    float: "0 8px 20px rgba(113, 54, 219, 0.28)",
  },
  layout: {
    appMaxWidth: "480px",
    tabbarHeight: "64px",
  },
  font: {
    family:
      '"Pretendard Variable", "Pretendard", -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Segoe UI", Roboto, "Malgun Gothic", sans-serif',
  },
} as const;

export type AppTheme = typeof theme;
