import { Link } from "react-router-dom";
import styled from "styled-components";
import { ROUTES } from "../../router/routes";
import calendarIcon from "../../assets/icons/calendar.png";
import storageIcon from "../../assets/icons/storage.png";
import centerIcon from "../../assets/icons/center.png";
import reportIcon from "../../assets/icons/report.png";
import profileIcon from "../../assets/icons/profile.png";

export type BottomNavKey = "calendar" | "storage" | "report" | "profile" | "";

export interface BottomNavProps {
  /** 현재 활성화된 탭 (원본 renderBottomNav(activeKey)와 동일하게 화면에서 명시적으로 지정) */
  active?: BottomNavKey;
}

const Nav = styled.nav`
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 100%;
  max-width: var(--app-max-width);
  height: var(--tabbar-height);
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: var(--color-white);
  border-top: 1px solid var(--color-border);
  z-index: 30;
`;

const NavItem = styled(Link)<{ $active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  color: ${(props) => (props.$active ? "var(--color-primary)" : "var(--color-text-placeholder)")};
  flex: 1;
`;

const NavIcon = styled.span<{ $src: string }>`
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: currentColor;
  -webkit-mask-image: url(${(props) => props.$src});
  mask-image: url(${(props) => props.$src});
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-size: contain;
  mask-size: contain;
`;

const CenterItem = styled(Link)`
  position: relative;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CenterButton = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  margin-top: -26px;
  border-radius: var(--radius-full);
  background: var(--gradient-primary);
  box-shadow: var(--shadow-float);
`;

const CenterIcon = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: var(--color-white);
  -webkit-mask-image: url(${centerIcon});
  mask-image: url(${centerIcon});
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-size: contain;
  mask-size: contain;
`;

/** org/js/common.js의 NOLI_COMMON.renderBottomNav를 이식한 하단탭바(캘린더·보관함·홈·리포트·프로필) */
export function BottomNav({ active = "" }: BottomNavProps) {
  return (
    <Nav>
      <NavItem to={ROUTES.calendar} $active={active === "calendar"}>
        <NavIcon $src={calendarIcon} />
        <span>캘린더</span>
      </NavItem>
      <NavItem to={ROUTES.storage} $active={active === "storage"}>
        <NavIcon $src={storageIcon} />
        <span>보관함</span>
      </NavItem>
      <CenterItem to={ROUTES.main} aria-label="홈">
        <CenterButton>
          <CenterIcon />
        </CenterButton>
      </CenterItem>
      <NavItem to={ROUTES.report} $active={active === "report"}>
        <NavIcon $src={reportIcon} />
        <span>리포트</span>
      </NavItem>
      <NavItem to={ROUTES.profile} $active={active === "profile"}>
        <NavIcon $src={profileIcon} />
        <span>프로필</span>
      </NavItem>
    </Nav>
  );
}
