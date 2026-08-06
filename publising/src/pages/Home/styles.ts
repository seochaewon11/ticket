// org/index.css 이식
import styled from 'styled-components'

export const HomePageWrap = styled.div`
  padding-bottom: 100px; /* 하단 고정 nav 높이만큼 여유 */
`

export const Header = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px 20px 8px;
`

export const LogoImg = styled.img`
  height: 84px;
  width: auto;
  display: block;
`

export const SettingsBtn = styled.button`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text};
`

export const Intro = styled.section`
  padding: 14px 20px 4px;

  h2 {
    font-size: 23px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 4px;
  }

  p {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.textSub};
  }
`

export const RecommendSection = styled.section`
  padding: 22px 20px 0;
`

export const SectionHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 14px;

  h3 {
    font-size: 17px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
  }
`

export const MoreLink = styled.a`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primaryStrong};
`

export const CtaGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 30px;
`

export const BtnIcon = styled.span`
  font-size: 15px;
`

export const PlaylistSection = styled.section`
  padding: 6px 20px 0;
`

export const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 14px;
`

export const PlaylistList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

// mypage.html의 플로팅 티켓 버튼과 동일 (누르면 /play로 이동)
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
