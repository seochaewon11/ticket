// org/login.html + login.js 이식: 실제 OAuth 없이 버튼 클릭 시 /home 으로 이동하는 mock 로그인
import { useNavigate } from 'react-router-dom'
import { Icon } from '../../components/common/icon'
import {
  DotSep,
  LoginBrand,
  LoginBrandSub,
  LoginBrandTitle,
  LoginBtnEmail,
  LoginBtnGoogle,
  LoginBtnKakao,
  LoginBtnNaver,
  LoginButtons,
  LoginIllustration,
  LoginIllustrationImg,
  LoginLegal,
  LoginLinks,
  LoginLogoImg,
  LoginPageWrap,
} from './styles'

// Google 로고는 4색 고정이라 공통 Icon(currentColor) 체계에 맞지 않아 이 페이지에서만 인라인으로 둔다
function GoogleIcon() {
  return (
    <svg viewBox="0 0 18 18" width={18} height={18}>
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
      />
    </svg>
  )
}

export function LoginPage() {
  const navigate = useNavigate()

  function goToHome() {
    navigate('/home')
  }

  return (
    <LoginPageWrap>
      <LoginBrand>
        <LoginLogoImg src="/img/logo.png" alt="NOLI" />
        <LoginBrandTitle>반가워요!</LoginBrandTitle>
        <LoginBrandSub>더 즐거운 문화생활의 시작, 노리</LoginBrandSub>
      </LoginBrand>

      <LoginIllustration>
        <LoginIllustrationImg src="/img/login.png" alt="" />
      </LoginIllustration>

      <LoginButtons>
        <LoginBtnGoogle type="button" onClick={goToHome}>
          <GoogleIcon />
          구글로 로그인
        </LoginBtnGoogle>
        <LoginBtnKakao type="button" onClick={goToHome}>
          <Icon name="kakao" size={18} />
          카카오로 로그인
        </LoginBtnKakao>
        <LoginBtnNaver type="button" onClick={goToHome}>
          <Icon name="naver" size={18} />
          네이버로 로그인
        </LoginBtnNaver>
        <LoginBtnEmail type="button" onClick={goToHome}>
          <Icon name="email" size={18} />
          이메일로 로그인
        </LoginBtnEmail>
      </LoginButtons>

      <LoginLinks>
        <a href="#">회원가입</a>
        <DotSep>·</DotSep>
        <a href="#">비밀번호 찾기</a>
      </LoginLinks>

      <LoginLegal>
        계속 진행함으로써 NOLI의 <a href="#">이용약관</a> 및
        <br />
        <a href="#">개인정보 처리방침</a>에 동의하게 됩니다.
      </LoginLegal>
    </LoginPageWrap>
  )
}
