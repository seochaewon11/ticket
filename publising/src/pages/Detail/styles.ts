// org/detail.css 이식
import styled from 'styled-components'

export const DetailPageWrap = styled.div`
  padding-bottom: 158px; /* 하단 고정 액션바 + 탭바 높이만큼 여유 */
`

/* ---------- 상단 히어로(포스터) 영역 ---------- */
export const PosterHero = styled.div<{ $fallbackGradient: boolean }>`
  position: relative;
  width: 100%;
  height: 640px;
  overflow: hidden;
  background-color: #1c1428;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(10, 5, 20, 0.35) 0%,
      rgba(10, 5, 20, 0) 26%,
      rgba(10, 5, 20, 0.55) 62%,
      rgba(10, 5, 20, 0.94) 100%
    );
    pointer-events: none;
  }

  ${({ $fallbackGradient }) =>
    $fallbackGradient &&
    `
      background: linear-gradient(160deg, #2A2140 0%, #7C5CFC 60%, #F7F0EC 100%);
    `}
`

export const HeroImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const HeroTopbar = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 16px 0;
  z-index: 3;
`

export const TopbarRight = styled.div`
  display: flex;
  gap: 8px;
`

export const IconBtn = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.22);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.white};
  transition: transform 0.15s ease;

  &:active {
    transform: scale(0.92);
  }

  svg {
    width: 19px;
    height: 19px;
  }
`

export const StatusBadgeWrap = styled.div`
  position: absolute;
  top: 78px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 2;
`

export const StatusBadge = styled.span`
  padding: 7px 16px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background-color: rgba(255, 255, 255, 0.85);
  color: ${({ theme }) => theme.colors.text};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
`

export const HeroBottom = styled.div`
  position: absolute;
  left: 22px;
  right: 22px;
  bottom: 24px;
  z-index: 2;
`

export const MatchBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background-color: ${({ theme }) => theme.colors.primaryStrong};
  color: ${({ theme }) => theme.colors.white};
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 14px;

  svg {
    width: 14px;
    height: 14px;
    fill: ${({ theme }) => theme.colors.white};
  }
`

export const PerfTitle = styled.h1`
  color: ${({ theme }) => theme.colors.white};
  font-size: 27px;
  font-weight: 800;
  line-height: 1.25;
  margin-bottom: 6px;
`

export const PerfTagline = styled.p`
  color: rgba(255, 255, 255, 0.75);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 14px;
`

export const TagChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

export const TagChip = styled.span`
  padding: 6px 13px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background-color: rgba(255, 255, 255, 0.85);
  color: ${({ theme }) => theme.colors.text};
  font-size: 12px;
  font-weight: 600;
`

/* ---------- 본문 공통 ---------- */
export const DetailContent = styled.main`
  padding: 22px 20px 0;
  display: flex;
  flex-direction: column;
  gap: 22px;
`

export const SectionHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 14px;

  h3 {
    font-size: 17px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.text};
  }
`

export const MoreLink = styled.a`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSub};
`

/* ---------- 추천 이유 카드 ---------- */
export const ReasonCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.card};
  padding: 20px;
`

export const ReasonHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;

  .sparkle {
    font-size: 18px;
  }

  h3 {
    font-size: 16px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.text};
  }
`

export const ReasonSummary = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSub};
  line-height: 1.6;
  margin-bottom: 16px;
`

export const ReasonStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const ReasonStatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.accentSoft};
`

export const StatIcon = styled.span`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primarySoft};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
`

export const StatLabel = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSub};
  margin-bottom: 2px;
`

export const StatValue = styled.p`
  font-size: 13.5px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`

/* ---------- 공연 상세 정보 ---------- */
export const InfoCardWrap = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.card};
  display: flex;
  flex-direction: column;
`

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`

export const InfoIcon = styled.span`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.accentSoft};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  flex-shrink: 0;
  margin-left: 10px;
`

export const InfoLabel = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSub};
  width: 68px;
  flex-shrink: 0;
`

export const InfoValue = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`

/* ---------- 시놉시스 ---------- */
export const SynopsisSection = styled.section``

export const SynopsisCard = styled.div`
  background-color: ${({ theme }) => theme.colors.pink};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 18px 20px;
`

export const SynopsisText = styled.p<{ $expanded: boolean }>`
  font-size: 14px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text};
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: ${({ $expanded }) => ($expanded ? 'unset' : 3)};
  -webkit-box-orient: vertical;
`

export const SynopsisToggle = styled.button<{ $expanded: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 10px;
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.pinkStrong};

  svg {
    width: 14px;
    height: 14px;
    transition: transform 0.2s ease;
    transform: rotate(${({ $expanded }) => ($expanded ? 180 : 0)}deg);
  }
`

/* ---------- 출연진 ---------- */
export const CastSection = styled.section`
  padding-bottom: 8px;
`

export const CastScroll = styled.div`
  display: flex;
  gap: 18px;
  overflow-x: auto;
  padding-bottom: 4px;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const CastItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 76px;
  text-align: center;
`

export const CastPhoto = styled.div`
  width: 68px;
  height: 68px;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.disabledBg};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  svg {
    width: 28px;
    height: 28px;
    color: ${({ theme }) => theme.colors.textMute};
  }
`

export const CastName = styled.p`
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 2px;
`

export const CastRole = styled.p`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textSub};
`

/* ---------- 하단 고정 액션바 + 탭바 ---------- */
export const DetailActionBar = styled.div`
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 100%;
  max-width: ${({ theme }) => theme.layout.appMaxWidth};
  box-shadow: ${({ theme }) => theme.shadow.nav};
  z-index: 10;
`

export const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  padding: 14px 20px 10px;

  > * {
    flex: 1;
    padding: 14px 10px;
  }
`

// index.html과 동일한 보관함 버튼 아이콘 크기 (🔖)
export const BtnIcon = styled.span`
  font-size: 15px;
`

// detail 페이지 전용 이전 버튼 (공통 Button의 outline 변형과 배색이 달라 별도 정의)
export const PrevBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: 16px;
  font-weight: 700;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textSub};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  transition: transform 0.15s ease;

  &:active {
    transform: scale(0.98);
  }
`

export const EmptyState = styled.p`
  padding: 40px 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSub};
`
