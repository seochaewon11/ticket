// org/play.css 이식
import styled from 'styled-components'

export const PlayPageWrap = styled.div`
  padding-bottom: 100px; /* 하단 고정 탭바 높이만큼 여유 */
`

export const PlayTitle = styled.section`
  padding: 14px 20px 0;

  h2 {
    font-size: 23px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 6px;
  }

  p {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.textSub};
  }
`

export const PlaylistList = styled.section`
  padding: 26px 20px 0;
  display: flex;
  flex-direction: column;
  gap: 40px;
`

export const PlaylistCardWrap = styled.article`
  position: relative;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.card};
  overflow: hidden;

  /* 카드 위쪽에 살짝 보이는 "다음 카드" 손잡이 느낌의 장식 바 */
  &::before {
    content: '';
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 56px;
    height: 8px;
    border-radius: ${({ theme }) => theme.radius.pill};
    background-color: rgba(167, 139, 250, 0.28);
    z-index: -1;
  }
`

export const PlaylistCover = styled.div<{ $gradient: string }>`
  position: relative;
  height: 230px;
  width: 100%;
  background: ${({ $gradient }) => $gradient};
`

export const PlaylistCoverImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const LikeBadge = styled.span`
  position: absolute;
  top: 14px;
  right: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 7px 12px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(4px);
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};

  svg {
    width: 14px;
    height: 14px;
    fill: none;
    stroke: ${({ theme }) => theme.colors.text};
    stroke-width: 2;
  }
`

export const PlaylistBody = styled.div`
  padding: 16px 18px 18px;
`

export const PlaylistCardTitle = styled.h3<{ $color: string }>`
  font-size: 19px;
  font-weight: 800;
  margin-bottom: 6px;
  color: ${({ $color }) => $color};
`

export const PlaylistTagline = styled.p`
  font-size: 13.5px;
  color: ${({ theme }) => theme.colors.textSub};
  margin-bottom: 16px;
`

export const PlaylistFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const AvatarStack = styled.div`
  display: flex;
`

export const AvatarDot = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.surface};
  margin-left: -10px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &:first-child {
    margin-left: 0;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const FooterActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const ShareBtn = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.accentSoft};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSub};

  svg {
    width: 16px;
    height: 16px;
  }
`

export const SaveBtn = styled.button<{ $bg: string; $saved: boolean }>`
  padding: 9px 18px;
  border-radius: ${({ theme }) => theme.radius.pill};
  color: ${({ theme }) => theme.colors.white};
  font-size: 13.5px;
  font-weight: 700;
  transition: opacity 0.15s ease;
  background-color: ${({ $bg }) => $bg};
  opacity: ${({ $saved }) => ($saved ? 0.55 : 1)};
`

export const FabAdd = styled.button`
  position: fixed;
  right: calc(50% - (${({ theme }) => theme.layout.appMaxWidth} / 2) + 20px);
  bottom: 112px;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primaryStrong};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadow.float};
  z-index: 11;

  svg {
    width: 22px;
    height: 22px;
  }

  @media (max-width: 480px) {
    right: 20px;
  }
`
