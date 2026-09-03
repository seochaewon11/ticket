import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logoImage from "../../assets/brand/logo.png";
import { Icon } from "../../components/common/Icon";
import { useAppState } from "../../context/AppStateContext";
import { ROUTES } from "../../router/routes";

/** 로그인 처리 시뮬레이션 지연(ms) — 실제 인증은 없지만 로딩 피드백을 보여주기 위함 */
const LOGIN_DELAY = 900;

/* ---------- 로그인 화면 전용 소셜 아이콘 (currentColor가 아닌 브랜드 고정 색상이라 공통 Icon과 분리) ---------- */
function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M23.5 12.27c0-.82-.07-1.6-.2-2.36H12v4.47h6.47c-.28 1.5-1.13 2.77-2.4 3.62v3h3.88c2.27-2.09 3.55-5.17 3.55-8.73Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.88-3c-1.08.72-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.95H1.26v3.1C3.24 21.3 7.29 24 12 24Z"
      />
      <path fill="#FBBC05" d="M5.27 14.3a7.2 7.2 0 0 1 0-4.6v-3.1H1.26a12 12 0 0 0 0 10.8l4.01-3.1Z" />
      <path
        fill="#EA4335"
        d="M12 4.75c1.76 0 3.34.6 4.59 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0 7.29 0 3.24 2.7 1.26 6.6l4.01 3.1C6.22 6.86 8.87 4.75 12 4.75Z"
      />
    </svg>
  );
}

function KakaoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#391B1B" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path
        d="M12 4.5c-5 0-9 3.1-9 7 0 2.5 1.7 4.7 4.2 6l-1 3.3c-.1.3.2.6.5.4l3.9-2.4c.5.05 1 .07 1.4.07 5 0 9-3.1 9-7s-4-7-9-7Z"
        fill="#391B1B"
        stroke="none"
        opacity={0.9}
      />
    </svg>
  );
}

function NaverIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#fff">
      <path d="M14.4 12.9 9.6 6H6v12h4.1v-6.9L14.9 18H18.5V6h-4.1v6.9Z" />
    </svg>
  );
}

/* ---------- styled ---------- */
const Screen = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--gradient-splash-bg);
`;

const LoadingBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  overflow: hidden;
  z-index: 50;
  background: var(--color-primary-softer);
`;

const LoadingBarInner = styled.div`
  height: 100%;
  width: 40%;
  border-radius: var(--radius-full);
  background: var(--gradient-primary);
  animation: loading-bar-slide 1s ease-in-out infinite;

  @keyframes loading-bar-slide {
    0% {
      transform: translateX(-100%);
    }
    50% {
      transform: translateX(60%);
    }
    100% {
      transform: translateX(220%);
    }
  }
`;

const Body = styled.div<{ $disabled: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 var(--space-6);
  ${(props) => props.$disabled && "opacity: 0.6; pointer-events: none;"}
`;

const Brand = styled.div`
  margin-top: 34vh;
  text-align: center;
`;

const LogoWrap = styled.div`
  width: 62%;
  max-width: 220px;
  margin: 0 auto 14px;

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const Tagline = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-sub);
`;

const SocialRow = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--space-4);
  margin: 56px 0 var(--space-6);
`;

const SocialButton = styled.button<{ $variant: "google" | "kakao" | "naver" }>`
  width: 56px;
  height: 56px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  background: ${(props) =>
    props.$variant === "google" ? "var(--color-white)" : props.$variant === "kakao" ? "#FEE500" : "#03C75A"};
  border: ${(props) => (props.$variant === "google" ? "1px solid var(--color-border)" : "none")};

  svg {
    width: 26px;
    height: 26px;
  }
`;

const EmailButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  padding: 13px 16px;
  margin-bottom: var(--space-4);
  border-radius: var(--radius-full);
  font-size: 14px;
  font-weight: 700;
  background: var(--gradient-primary);
  color: var(--color-white);
  box-shadow: var(--shadow-float);
  transition: transform 0.15s ease, opacity 0.15s ease;

  &:active {
    transform: scale(0.98);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const Links = styled.p`
  text-align: center;
  font-size: 13px;
  color: var(--color-text-sub);
`;

const LinkButton = styled.button`
  color: var(--color-text-sub);
  font-weight: 600;
`;

const Divider = styled.span`
  margin: 0 8px;
  color: var(--color-border-strong);
`;

const BottomSpace = styled.div`
  flex: 1;
`;

/**
 * org/js/login.js를 이식. 실제 OAuth/이메일 인증은 없고 UI 흐름만 동작하며,
 * 로그인 버튼 클릭 시 상단 로딩바를 보여준 뒤 다음 화면으로 이동한다.
 */
export function LoginPage() {
  const navigate = useNavigate();
  const { login, userPreference } = useAppState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isLoading) return;
    const timer = setTimeout(() => {
      login();
      navigate(userPreference.completed ? ROUTES.main : ROUTES.favorite);
    }, LOGIN_DELAY);
    return () => clearTimeout(timer);
  }, [isLoading, login, navigate, userPreference.completed]);

  const handleLogin = () => {
    if (isLoading) return;
    setIsLoading(true);
  };

  return (
    <Screen>
      {isLoading && (
        <LoadingBar>
          <LoadingBarInner />
        </LoadingBar>
      )}

      <Body $disabled={isLoading}>
        <Brand>
          <LogoWrap>
            <img src={logoImage} alt="NOLI" />
          </LogoWrap>
          <Tagline>일상에 문화를 더하다, NOLI</Tagline>
        </Brand>

        <SocialRow>
          <SocialButton type="button" $variant="google" aria-label="구글로 로그인" onClick={handleLogin}>
            <GoogleIcon />
          </SocialButton>
          <SocialButton type="button" $variant="kakao" aria-label="카카오로 로그인" onClick={handleLogin}>
            <KakaoIcon />
          </SocialButton>
          <SocialButton type="button" $variant="naver" aria-label="네이버로 로그인" onClick={handleLogin}>
            <NaverIcon />
          </SocialButton>
        </SocialRow>

        <EmailButton type="button" onClick={handleLogin}>
          <Icon name="mail" />
          이메일로 로그인
        </EmailButton>

        <Links>
          <LinkButton type="button" onClick={handleLogin}>
            NOLI 회원가입
          </LinkButton>
          <Divider>·</Divider>
          <LinkButton type="button" onClick={handleLogin}>
            비밀번호 찾기
          </LinkButton>
        </Links>

        <BottomSpace />
      </Body>
    </Screen>
  );
}
