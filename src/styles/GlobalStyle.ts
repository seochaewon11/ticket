import { createGlobalStyle } from "styled-components";

/**
 * org/css/common.css의 :root 변수 + 리셋 + 앱 셸(app-shell)만 이식한다.
 * 버튼/칩/카드/헤더/하단탭바 같은 재사용 UI는 GlobalStyle이 아니라
 * 각 컴포넌트의 styled-components로 만든다 (요구사항: css = 스타일 컴포넌트).
 */
export const GlobalStyle = createGlobalStyle`
  :root {
    /* Color - Primary */
    --color-primary: ${({ theme }) => theme.colors.primary};
    --color-primary-dark: ${({ theme }) => theme.colors.primaryDark};
    --color-primary-darker: ${({ theme }) => theme.colors.primaryDarker};
    --color-primary-soft: ${({ theme }) => theme.colors.primarySoft};
    --color-primary-softer: ${({ theme }) => theme.colors.primarySofter};

    /* Color - Gradient */
    --gradient-primary: ${({ theme }) => theme.gradients.primary};
    --gradient-splash-bg: ${({ theme }) => theme.gradients.splashBg};

    /* Color - Text */
    --color-text: ${({ theme }) => theme.colors.text};
    --color-text-sub: ${({ theme }) => theme.colors.textSub};
    --color-text-placeholder: ${({ theme }) => theme.colors.textPlaceholder};
    --color-white: ${({ theme }) => theme.colors.white};

    /* Color - Surface / Border */
    --color-bg: ${({ theme }) => theme.colors.bg};
    --color-bg-muted: ${({ theme }) => theme.colors.bgMuted};
    --color-border: ${({ theme }) => theme.colors.border};
    --color-border-strong: ${({ theme }) => theme.colors.borderStrong};

    /* Color - Accent badges */
    --color-badge-pink-bg: ${({ theme }) => theme.colors.badgePinkBg};
    --color-badge-pink-text: ${({ theme }) => theme.colors.badgePinkText};
    --color-badge-gray-bg: ${({ theme }) => theme.colors.badgeGrayBg};
    --color-badge-gray-text: ${({ theme }) => theme.colors.badgeGrayText};

    /* Radius */
    --radius-sm: ${({ theme }) => theme.radius.sm};
    --radius-md: ${({ theme }) => theme.radius.md};
    --radius-lg: ${({ theme }) => theme.radius.lg};
    --radius-xl: ${({ theme }) => theme.radius.xl};
    --radius-full: ${({ theme }) => theme.radius.full};

    /* Spacing scale */
    --space-1: ${({ theme }) => theme.spacing[1]};
    --space-2: ${({ theme }) => theme.spacing[2]};
    --space-3: ${({ theme }) => theme.spacing[3]};
    --space-4: ${({ theme }) => theme.spacing[4]};
    --space-5: ${({ theme }) => theme.spacing[5]};
    --space-6: ${({ theme }) => theme.spacing[6]};
    --space-8: ${({ theme }) => theme.spacing[8]};

    /* Shadow */
    --shadow-card: ${({ theme }) => theme.shadow.card};
    --shadow-float: ${({ theme }) => theme.shadow.float};

    /* Layout */
    --app-max-width: ${({ theme }) => theme.layout.appMaxWidth};
    --tabbar-height: ${({ theme }) => theme.layout.tabbarHeight};

    /* Font */
    --font-family: ${({ theme }) => theme.font.family};
  }

  /* ---------- Reset ---------- */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
  }

  body {
    margin: 0;
    font-family: var(--font-family);
    color: var(--color-text);
    background: var(--color-bg-muted);
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
  }

  ul, ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  h1, h2, h3, h4, p {
    margin: 0;
  }

  button {
    font-family: inherit;
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
    color: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  img {
    display: block;
    max-width: 100%;
  }

  input, select, textarea {
    font-family: inherit;
  }

  button:focus-visible,
  a:focus-visible,
  input:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  /* ---------- App shell (mobile-first, max 480px) ---------- */
  .app-shell {
    position: relative;
    max-width: var(--app-max-width);
    margin: 0 auto;
    min-height: 100vh;
    background: var(--color-bg);
    overflow-x: hidden;
  }
`;
