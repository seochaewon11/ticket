// org/artist.css 이식
import styled from 'styled-components'

export const ArtistPageWrap = styled.div`
  padding-bottom: 110px; /* 하단 고정 CTA 버튼 높이만큼 여유 */
`

export const ArtistTopbar = styled.header`
  padding: 18px 20px 0;
`

export const ArtistTopbarRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`

export const BackBtn = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text};
`

export const MiniLogo = styled.img`
  width: 84px;
  height: 84px;
  object-fit: contain;
`

export const TopbarSpacer = styled.div`
  width: 32px;
`

export const StepLabel = styled.p`
  margin-top: 10px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSub};
`

export const ArtistTitle = styled.section`
  padding: 22px 20px 0;

  h2 {
    font-size: 24px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.35;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.textSub};
    line-height: 1.5;
  }
`

export const ArtistSearch = styled.section`
  padding: 20px 20px 0;
`

export const SearchInputWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 13px 18px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background-color: ${({ theme }) => theme.colors.accentSoft};

  svg {
    width: 18px;
    height: 18px;
    color: ${({ theme }) => theme.colors.textMute};
    flex-shrink: 0;
  }

  input {
    border: none;
    background: none;
    outline: none;
    font-family: inherit;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text};
    width: 100%;

    &::placeholder {
      color: ${({ theme }) => theme.colors.textMute};
    }
  }
`

export const ArtistGridWrap = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px 12px;
  padding: 26px 20px 0;
`

export const ArtistPhotoWrap = styled.span`
  position: relative;
  width: 78px;
  height: 78px;
`

export const ArtistPhoto = styled.span<{ $bg: string; $selected: boolean }>`
  width: 78px;
  height: 78px;
  border-radius: 50%;
  overflow: hidden;
  border: 2.5px solid ${({ theme, $selected }) => ($selected ? theme.colors.primaryStrong : 'transparent')};
  box-shadow: ${({ theme }) => theme.shadow.card};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.white};
  background: ${({ $bg }) => $bg};
  transition:
    border-color 0.15s ease,
    transform 0.15s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const ArtistCard = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background: none;

  &:active ${ArtistPhoto} {
    transform: scale(0.95);
  }
`

export const CheckBadge = styled.span<{ $selected: boolean }>`
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primaryStrong};
  border: 2px solid ${({ theme }) => theme.colors.surface};
  display: ${({ $selected }) => ($selected ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;

  svg {
    width: 12px;
    height: 12px;
    stroke: ${({ theme }) => theme.colors.white};
  }
`

export const ArtistName = styled.span`
  font-size: 13.5px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`

export const ArtistEmptyState = styled.p`
  grid-column: 1 / -1;
  text-align: center;
  padding: 40px 0;
  color: ${({ theme }) => theme.colors.textMute};
  font-size: 14px;
`

export const ArtistCta = styled.div`
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 100%;
  max-width: ${({ theme }) => theme.layout.appMaxWidth};
  padding: 14px 20px calc(14px + env(safe-area-inset-bottom, 0px));
  background-color: ${({ theme }) => theme.colors.accent};
`
