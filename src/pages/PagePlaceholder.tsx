import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ROUTES } from "../router/routes";

/**
 * Phase 5에서 실제 화면으로 교체되기 전까지 라우팅 확인용으로 쓰는 임시 페이지 뼈대.
 * 화면 전체를 클릭으로 오갈 수 있도록 모든 라우트로의 링크를 함께 보여준다.
 */

const navLinks: Array<[string, string]> = [
  ["스플래시", ROUTES.splash],
  ["로그인", ROUTES.login],
  ["취향설정", ROUTES.favorite],
  ["메인", ROUTES.main],
  ["캘린더", ROUTES.calendar],
  ["알람설정", ROUTES.alarm],
  ["보관함", ROUTES.storage],
  ["리포트", ROUTES.report],
  ["프로필", ROUTES.profile],
];

const Wrap = styled.div<{ $hasBottomNav?: boolean }>`
  min-height: 100vh;
  padding: var(--space-6) var(--space-5) var(--space-8);

  ${(props) =>
    props.$hasBottomNav &&
    `
      padding-bottom: calc(var(--tabbar-height) + var(--space-6));
    `}
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 800;
  margin-bottom: var(--space-2);
`;

const Desc = styled.p`
  font-size: 13px;
  color: var(--color-text-sub);
  margin-bottom: var(--space-6);
`;

const NavList = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-6);
`;

const NavLink = styled(Link)`
  padding: 8px 12px;
  border-radius: var(--radius-full);
  background: var(--color-primary-softer);
  color: var(--color-primary-dark);
  font-size: 12.5px;
  font-weight: 600;
`;

export const ActionButton = styled.button`
  padding: 12px 20px;
  border-radius: var(--radius-full);
  background: var(--gradient-primary);
  color: var(--color-white);
  font-weight: 700;
  font-size: 13px;
  box-shadow: var(--shadow-float);
`;

export interface PagePlaceholderProps {
  title: string;
  children?: ReactNode;
  /** 하단탭바가 함께 있는 화면이면 탭바 높이만큼 아래 여백을 준다 (원본 .has-bottom-nav) */
  hasBottomNav?: boolean;
}

export function PagePlaceholder({ title, children, hasBottomNav = false }: PagePlaceholderProps) {
  return (
    <Wrap $hasBottomNav={hasBottomNav}>
      <Title>{title}</Title>
      <Desc>Phase 5에서 실제 화면으로 교체될 라우팅/상태 확인용 임시 페이지입니다.</Desc>
      <NavList>
        {navLinks.map(([label, to]) => (
          <NavLink key={to} to={to}>
            {label}
          </NavLink>
        ))}
      </NavList>
      {children}
    </Wrap>
  );
}
