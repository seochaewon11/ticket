// org/login.css 이식
import styled from 'styled-components'

export const LoginPageWrap = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 28px 32px;
  background: linear-gradient(165deg, #dcd2fb 0%, #e9dcee 30%, #f3e3e4 60%, #fbede6 100%);
`

export const LoginBrand = styled.div`
  text-align: center;
  margin-bottom: 26px;
`

export const LoginLogoImg = styled.img`
  width: 160px;
  height: auto;
  margin: 0 auto 18px;
  display: block;
`

export const LoginBrandTitle = styled.h1`
  font-size: 21px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 6px;
`

export const LoginBrandSub = styled.p`
  font-size: 13.5px;
  color: ${({ theme }) => theme.colors.textSub};
`

export const LoginIllustration = styled.div`
  position: relative;
  width: 100%;
  max-width: 260px;
  height: 230px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: radial-gradient(circle at 50% 30%, #fbf5f2 0%, #f3e8f5 70%, #efe4ee 100%);
  box-shadow: ${({ theme }) => theme.shadow.card};
  margin: 8px 0 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

export const LoginIllustrationImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

export const LoginButtons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`

export const LoginBtn = styled.button`
  width: 100%;
  padding: 15px 16px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: 15px;
  font-weight: 700;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition:
    transform 0.15s ease,
    opacity 0.15s ease;

  &:active {
    transform: scale(0.98);
  }

  svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }
`

export const LoginBtnGoogle = styled(LoginBtn)`
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.text};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
`

export const LoginBtnKakao = styled(LoginBtn)`
  background-color: #fee500;
  color: #3a2e00;
`

export const LoginBtnNaver = styled(LoginBtn)`
  background-color: #03c75a;
  color: ${({ theme }) => theme.colors.white};
`

export const LoginBtnEmail = styled(LoginBtn)`
  background-color: ${({ theme }) => theme.colors.primaryStrong};
  color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.float};
`

export const LoginLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13.5px;
  color: ${({ theme }) => theme.colors.textSub};
  margin-bottom: 22px;

  a {
    color: ${({ theme }) => theme.colors.textSub};
  }
`

export const DotSep = styled.span`
  color: ${({ theme }) => theme.colors.textMute};
`

export const LoginLegal = styled.p`
  text-align: center;
  font-size: 11.5px;
  color: ${({ theme }) => theme.colors.textMute};
  line-height: 1.6;

  a {
    color: ${({ theme }) => theme.colors.textSub};
    text-decoration: underline;
  }
`
