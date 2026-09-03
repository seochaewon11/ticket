import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ROUTES } from "../../router/routes";
import { Icon } from "./Icon";
import { NoliLogo } from "./NoliLogo";

export interface HeaderProps {
  /** 뒤로가기 버튼 표시 여부 */
  back?: boolean;
  /** 가운데 제목(없으면 NOLI 로고 표시) */
  title?: string;
  /** 뒤로가기 버튼 클릭 핸들러 (back=true일 때만 사용) */
  onBack?: () => void;
}

const Bar = styled.header<{ $withBack: boolean }>`
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 52px;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(6px);

  ${(props) =>
    props.$withBack &&
    `
      position: relative;
      padding: 0 var(--space-4);
    `}
`;

const Logo = styled(NoliLogo)`
  height: 22px;
  width: auto;
`;

const LogoButton = styled.button`
  display: flex;
  align-items: center;
`;

const BackButton = styled.button`
  position: absolute;
  left: var(--space-4);
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: var(--color-text);

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
export function Header({ back = false, title = "", onBack }: HeaderProps) {
  const navigate = useNavigate();
  const goMain = () => navigate(ROUTES.main);

  if (!back) {
    return (
      <Bar $withBack={false}>
        <LogoButton type="button" aria-label="NOLI 홈으로" onClick={goMain}>
          <Logo />
        </LogoButton>
      </Bar>
    );
  }

  return (
    <Bar $withBack>
      <BackButton type="button" onClick={onBack} aria-label="뒤로가기">
        <Icon name="back" />
      </BackButton>
      {title ? (
        <Title>{title}</Title>
      ) : (
        <LogoButton type="button" aria-label="NOLI 홈으로" onClick={goMain}>
          <Logo />
        </LogoButton>
      )}
    </Bar>
  );
}
