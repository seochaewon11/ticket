import { createGlobalStyle } from 'styled-components'

// common.css의 리셋 + body 기본 스타일을 이식
// (.btn/.badge/.card/.bottom-nav 등 재사용 UI 클래스는 각 공통 컴포넌트로 이식하며 여기서는 다루지 않음)
export const GlobalStyle = createGlobalStyle`
  @import url('https://cdn.jsdelivr.net/npm/@fontsource/42dot-sans@5.2.9/index.css');

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: ${({ theme }) => theme.fontFamily};
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.accent};
    -webkit-font-smoothing: antialiased;
    line-height: 1.4;
  }

  ul,
  ol {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    font-family: inherit;
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
    color: inherit;
  }

  button:focus-visible,
  a:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primaryStrong};
    outline-offset: 2px;
  }

  img {
    display: block;
    max-width: 100%;
  }

  h1, h2, h3, h4, p {
    margin: 0;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }
`
