// org/index.html의 .recommend-card 영역 이식 (포스터/좋아요/뱃지/제목/메타)
import { useState } from 'react'
import styled from 'styled-components'
import { Card } from '../../../components/common/Card'
import { Badge } from '../../../components/common/Badge'
import { ICONS } from '../../../components/common/icon'
import type { Performance } from '../../../types'

const GENRE_EMOJI: Record<string, string> = {
  콘서트: '🎤',
  뮤지컬: '🎭',
  밴드: '🎸',
  댄스: '💃',
  클래식: '🎻',
  전시: '🎨',
}

const GENRE_GRADIENT: Record<string, string> = {
  뮤지컬: 'linear-gradient(160deg, #3B2A66 0%, #6B4FA0 35%, #7ED6A5 70%, #F2C9DC 100%)',
  콘서트: 'linear-gradient(160deg, #241B3D 0%, #5B3E9E 45%, #A78BFA 100%)',
  댄스: 'linear-gradient(160deg, #33204A 0%, #8A4E86 50%, #F0A6B8 100%)',
  클래식: 'linear-gradient(160deg, #221C33 0%, #4F3E7A 50%, #C9B8FB 100%)',
  밴드: 'linear-gradient(160deg, #1E1E2B 0%, #4A3F73 50%, #8B8BFA 100%)',
  전시: 'linear-gradient(160deg, #2B1E2E 0%, #7A4B63 50%, #F6C9C0 100%)',
}
const DEFAULT_GRADIENT = 'linear-gradient(160deg, #2A2140 0%, #7C5CFC 60%, #F7F0EC 100%)'

const Wrap = styled(Card)`
  position: relative;
  overflow: hidden;
  margin-bottom: 18px;
`

const Poster = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;

  /* 뱃지 가독성을 위한 하단 그라디언트 오버레이 (실제 이미지 / 플레이스홀더 공통 적용) */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 45%, rgba(20, 10, 30, 0.55) 100%);
    pointer-events: none;
    z-index: 1;
  }
`

const PosterImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 38%;
`

const PosterPlaceholder = styled.div<{ $gradient: string }>`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: ${({ $gradient }) => $gradient};
`

const PosterEmoji = styled.span`
  position: relative;
  z-index: 1;
  font-size: 56px;
  margin-bottom: 28px;
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.25));
`

const LikeBtn = styled.button<{ $liked: boolean }>`
  position: absolute;
  top: 14px;
  right: 14px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: transform 0.15s ease;

  &:active {
    transform: scale(0.9);
  }

  svg {
    width: 19px;
    height: 19px;
    fill: ${({ theme, $liked }) => ($liked ? theme.colors.primaryStrong : 'none')};
    stroke: ${({ theme, $liked }) => ($liked ? theme.colors.primaryStrong : theme.colors.white)};
    stroke-width: 2;
    transition:
      fill 0.15s ease,
      stroke 0.15s ease;
  }
`

const CardBadges = styled.div`
  position: absolute;
  left: 16px;
  bottom: 20px;
  z-index: 2;
  display: flex;
  gap: 6px;
`

const CardBody = styled.div`
  padding: 16px 18px 20px;
`

const CardTitle = styled.p`
  font-size: 19px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 6px;
`

const CardMeta = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSub};
  line-height: 1.5;
`

const EmptyState = styled.p`
  padding: 40px 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSub};
`

interface RecommendCardProps {
  performance: Performance | undefined
  onToggleLike: (id: string) => void
}

export function RecommendCard({ performance, onToggleLike }: RecommendCardProps) {
  const [imgError, setImgError] = useState(false)

  if (!performance) {
    return (
      <Wrap>
        <EmptyState>추천할 공연이 아직 없어요.</EmptyState>
      </Wrap>
    )
  }

  const emoji = GENRE_EMOJI[performance.genre] || '🎪'
  const gradient = GENRE_GRADIENT[performance.genre] || DEFAULT_GRADIENT

  return (
    <Wrap as="article" aria-live="polite">
      <Poster>
        {!imgError ? (
          <PosterImg
            src={performance.posterUrl}
            alt={`${performance.title} 포스터`}
            onError={() => setImgError(true)}
          />
        ) : (
          <PosterPlaceholder $gradient={gradient}>
            <PosterEmoji>{emoji}</PosterEmoji>
          </PosterPlaceholder>
        )}
        <LikeBtn
          type="button"
          $liked={performance.liked}
          aria-pressed={performance.liked}
          aria-label="좋아요"
          onClick={() => onToggleLike(performance.id)}
          dangerouslySetInnerHTML={{ __html: `<svg viewBox="0 0 24 24">${ICONS.heart.markup}</svg>` }}
        />
        <CardBadges>
          <Badge $variant="primary">내 취향 일치 {performance.matchRate}%</Badge>
          <Badge $variant="frost">{performance.genre}</Badge>
        </CardBadges>
      </Poster>
      <CardBody>
        <CardTitle>{performance.title}</CardTitle>
        <CardMeta>
          {performance.period} | {performance.venue}
        </CardMeta>
      </CardBody>
    </Wrap>
  )
}
