import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { NoliLogo } from "../../components/common/NoliLogo";
import { useAppState } from "../../context/AppStateContext";
import { ROUTES } from "../../router/routes";

/** org/js/splash.js의 자동 전환 지연(ms) */
const AUTO_TRANSITION_DELAY = 1800;

const Screen = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: var(--gradient-splash-bg);
`;

const LogoWrap = styled.div`
  width: 66%;
  max-width: 300px;
  animation: splash-logo-in 0.8s cubic-bezier(0.22, 0.85, 0.3, 1) both;

  svg {
    width: 100%;
    height: auto;
    display: block;
    filter: drop-shadow(0 10px 18px rgba(91, 33, 182, 0.18));
  }

  @keyframes splash-logo-in {
    from {
      opacity: 0;
      transform: scale(0.86) translateY(6px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

/**
 * 로고 노출 후 세션/취향설정 완료 여부에 따라 자동으로 다음 화면으로 이동한다.
 * - 로그인 전 → /login
 * - 로그인 O, 취향설정 미완료 → /favorite
 * - 로그인 O, 취향설정 완료 → /main
 */
export function SplashPage() {
  const navigate = useNavigate();
  const { session, userPreference } = useAppState();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!session.isLoggedIn) {
        navigate(ROUTES.login, { replace: true });
        return;
      }
      navigate(userPreference.completed ? ROUTES.main : ROUTES.favorite, { replace: true });
    }, AUTO_TRANSITION_DELAY);

    return () => clearTimeout(timer);
  }, [navigate, session.isLoggedIn, userPreference.completed]);

  return (
    <Screen>
      <LogoWrap>
        <NoliLogo />
      </LogoWrap>
    </Screen>
  );
}
