import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BottomNav } from "../../components/common/BottomNav";
import { Header } from "../../components/common/Header";
import { Icon } from "../../components/common/Icon";
import { MemoryGrid } from "../../components/profile/MemoryGrid";
import { MenuList } from "../../components/profile/MenuList";
import { ProfileAvatar } from "../../components/profile/ProfileAvatar";
import { useAppState } from "../../context/AppStateContext";
import { memoryList, profileMenu, profileTags } from "../../data";
import { ROUTES } from "../../router/routes";

const PageBg = styled.div`
  background: var(--gradient-primary);
  min-height: 100vh;
`;

const Body = styled.div`
  padding: var(--space-2) var(--space-5) calc(var(--tabbar-height) + var(--space-6));
  color: var(--color-white);
`;

const GreetRow = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-5);
`;

const Avatar = styled(ProfileAvatar)`
  width: 52px;
  height: 52px;
  border-radius: var(--radius-full);
  background: var(--color-white);
  flex-shrink: 0;
`;

const GreetText = styled.div`
  flex: 1;
  min-width: 0;
`;

const GreetHi = styled.p`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2px;
`;

const GreetName = styled.p`
  font-size: 19px;
  font-weight: 800;
`;

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.18);
  color: var(--color-white);
  flex-shrink: 0;

  svg {
    width: 18px;
    height: 18px;
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-6);
`;

const Tag = styled.span`
  padding: 8px 14px;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.16);
  font-size: 12.5px;
  font-weight: 600;
`;

const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: 800;
  margin-bottom: var(--space-4);
`;

const LogoutButton = styled.button`
  width: 100%;
  padding: 15px;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.22);
  color: var(--color-white);
  font-size: 14.5px;
  font-weight: 700;
`;

/** org/js/profile.js를 이식 (인사 + 취향 태그 + 나의 공연 기억 + 메뉴 + 로그아웃) */
export function ProfilePage() {
  const navigate = useNavigate();
  const { userPreference, logout } = useAppState();

  const handleMenuSelect = (id: string) => {
    // "취향 프로필 수정"만 실제 이동, 나머지(설정/고객센터/공지사항)는 원본과 동일하게 자리만 유지한다.
    if (id === "edit-preference") {
      navigate(ROUTES.favorite);
    }
  };

  const handleLogout = () => {
    logout();
    navigate(ROUTES.login);
  };

  return (
    <PageBg>
      <Header back variant="transparent" onBack={() => navigate(ROUTES.main)} />
      <Body>
        <GreetRow>
          <Avatar />
          <GreetText>
            <GreetHi>오늘도 반가워요!</GreetHi>
            <GreetName>{userPreference.userName}님!</GreetName>
          </GreetText>
          <SearchButton type="button" aria-label="보관함으로 이동" onClick={() => navigate(ROUTES.storage)}>
            <Icon name="search" />
          </SearchButton>
        </GreetRow>

        <Tags>
          {profileTags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Tags>

        <SectionTitle>나의 공연 기억</SectionTitle>
        <MemoryGrid items={memoryList} />

        <MenuList items={profileMenu} onSelect={handleMenuSelect} />

        <LogoutButton type="button" onClick={handleLogout}>
          로그아웃
        </LogoutButton>
      </Body>
      <BottomNav active="profile" />
    </PageBg>
  );
}
