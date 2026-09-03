import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logoImage from "../../assets/brand/logo.png";
import { ROUTES } from "../../router/routes";
import { Icon } from "./Icon";

export interface HeaderProps {
  /** 뒤로가기 버튼 표시 여부 */
  back?: boolean;
  /** 가운데 제목(없으면 NOLI 로고 표시) */
  title?: string;
  /** 뒤로가기 버튼 클릭 핸들러 (back=true일 때만 사용) */
  onBack?: () => void;
  /** "transparent"면 배경이 투명해지고 로고/아이콘이 흰색이 된다 (프로필 화면의 보라 그라데이션 배경용) */
  variant?: "solid" | "transparent";
}

const Bar = styled.header<{ $withBack: boolean; $transparent: boolean }>`
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 52px;
  background: ${(props) => (props.$transparent ? "transparent" : "rgba(255, 255, 255, 0.96)")};
  backdrop-filter: ${(props) => (props.$transparent ? "none" : "blur(6px)")};

  ${(props) =>
    props.$withBack &&
    `
      position: relative;
      padding: 0 var(--space-4);
    `}
`;

const Logo = styled.img<{ $transparent: boolean }>`
  height: 22px;
  width: auto;
  ${(props) => props.$transparent && "filter: brightness(0) invert(1);"}
`;

const LogoButton = styled.button`
  display: flex;
  align-items: center;
`;

const BackButton = styled.button<{ $transparent: boolean }>`
  position: absolute;
  left: var(--space-4);
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: ${(props) => (props.$transparent ? "var(--color-white)" : "var(--color-text)")};

  svg {
    width: 22px;
    height: 22px;
  }
`;

const Title = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text);
`;

/** org/js/common.js의 NOLI_COMMON.renderHeader를 이식한 상단바(로고형 / 뒤로가기+타이틀형) */
export function Header({ back = false, title = "", onBack, variant = "solid" }: HeaderProps) {
  const navigate = useNavigate();
  const goMain = () => navigate(ROUTES.main);
  const transparent = variant === "transparent";

  if (!back) {
    return (
      <Bar $withBack={false} $transparent={transparent}>
        <LogoButton type="button" aria-label="NOLI 홈으로" onClick={goMain}>
          <Logo src={logoImage} alt="NOLI" $transparent={transparent} />
        </LogoButton>
      </Bar>
    );
  }

  return (
    <Bar $withBack $transparent={transparent}>
      <BackButton type="button" $transparent={transparent} onClick={onBack} aria-label="뒤로가기">
        <Icon name="back" />
      </BackButton>
      {title ? (
        <Title>{title}</Title>
      ) : (
        <LogoButton type="button" aria-label="NOLI 홈으로" onClick={goMain}>
          <Logo src={logoImage} alt="NOLI" $transparent={transparent} />
        </LogoButton>
      )}
    </Bar>
  );
}
