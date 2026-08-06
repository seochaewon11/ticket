// org/mypage.css 이식
import styled from 'styled-components'

export const MyPageWrap = styled.div`
  padding-bottom: 100px; /* 하단 고정 탭바 높이만큼 여유 */
`

export const ProfileCard = styled.section`
  position: relative;
  margin: 14px 20px 0;
  padding: 20px 18px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.card};
`

export const ProfileEditIcon = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.accentSoft};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textMute};

  svg {
    width: 15px;
    height: 15px;
  }
`

export const ProfileTopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 18px;
`

export const ProfileAvatarWrap = styled.div`
  position: relative;
  width: 68px;
  height: 68px;
  flex-shrink: 0;
`

export const ProfileAvatar = styled.div`
  width: 68px;
  height: 68px;
  border-radius: 50%;
  overflow: hidden;
  background: linear-gradient(135deg, #c9b8fb, #f3b9c6);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const LevelBadge = styled.span`
  position: absolute;
  bottom: -3px;
  left: 50%;
  transform: translateX(-50%);
  padding: 2px 9px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background-color: ${({ theme }) => theme.colors.primaryStrong};
  color: ${({ theme }) => theme.colors.white};
  font-size: 10.5px;
  font-weight: 800;
  border: 2px solid ${({ theme }) => theme.colors.surface};
  white-space: nowrap;
`

export const ProfileName = styled.p`
  font-size: 19px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
`

export const ProfileTitles = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`

export const TitleBadge = styled.span`
  padding: 4px 11px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background-color: ${({ theme }) => theme.colors.primarySoft};
  color: ${({ theme }) => theme.colors.primaryStrong};
  font-size: 11.5px;
  font-weight: 700;
`

export const ProfileBottomRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

export const GenreIconStack = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const GenreIconCircle = styled.span<{ $extra?: boolean }>`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ $extra }) => ($extra ? '12px' : '16px')};
  font-weight: ${({ $extra }) => ($extra ? 700 : 400)};
  background-color: ${({ theme, $extra }) => ($extra ? theme.colors.disabledBg : theme.colors.accentSoft)};
  color: ${({ theme, $extra }) => ($extra ? theme.colors.textMute : 'inherit')};
`

export const MoreLink = styled.a`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSub};
`

export const SectionBlock = styled.section`
  padding: 30px 20px 0;

  h3 {
    font-size: 17px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 14px;
  }
`

export const SectionTitleRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 14px;

  h3 {
    margin-bottom: 0;
  }
`

export const DashboardCards = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`

export const DashboardCard = styled.div<{ $highlight?: boolean }>`
  padding: 20px 12px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background-color: ${({ theme, $highlight }) => ($highlight ? theme.colors.primarySoft : theme.colors.surface)};
  box-shadow: ${({ theme, $highlight }) => ($highlight ? 'none' : theme.shadow.card)};
  text-align: center;
`

export const DashboardIcon = styled.span<{ $highlight?: boolean }>`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: ${({ theme, $highlight }) => ($highlight ? theme.colors.white : theme.colors.accentSoft)};
  color: ${({ theme, $highlight }) => ($highlight ? theme.colors.primaryStrong : 'inherit')};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 19px;
  margin: 0 auto 12px;
`

export const DashboardLabel = styled.p`
  font-size: 12.5px;
  color: ${({ theme }) => theme.colors.textSub};
  margin-bottom: 4px;
`

export const DashboardValue = styled.p<{ $highlight?: boolean }>`
  font-size: 17px;
  font-weight: 800;
  color: ${({ theme, $highlight }) => ($highlight ? theme.colors.primaryStrong : theme.colors.text)};
`

export const MemoryGridWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`

export const MemoryCard = styled.div`
  position: relative;
`

export const MemoryPoster = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.disabledBg};
  margin-bottom: 8px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const MemoryDateBadge = styled.span`
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 4px 9px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background-color: rgba(20, 15, 30, 0.6);
  color: ${({ theme }) => theme.colors.white};
  font-size: 11px;
  font-weight: 700;
`

export const MemoryTitle = styled.p`
  font-size: 13.5px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 2px;
`

export const MemoryVenue = styled.p`
  font-size: 11.5px;
  color: ${({ theme }) => theme.colors.textSub};
`

export const MenuList = styled.section`
  margin: 30px 20px 0;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.card};
  overflow: hidden;
`

export const MenuRow = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 18px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }

  .menu-icon {
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.colors.textSub};
    flex-shrink: 0;
  }

  .chevron {
    width: 16px;
    height: 16px;
    color: ${({ theme }) => theme.colors.textMute};
  }
`

export const MenuLabel = styled.span`
  flex: 1;
  font-size: 14.5px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`

export const LogoutWrap = styled.div`
  margin: 22px 20px 0;
`

export const FabTicket = styled.button`
  position: fixed;
  right: calc(50% - (${({ theme }) => theme.layout.appMaxWidth} / 2) + 20px);
  bottom: 78px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primaryStrong};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadow.float};
  z-index: 11;

  svg {
    width: 21px;
    height: 21px;
  }

  @media (max-width: 480px) {
    right: 20px;
  }
`
