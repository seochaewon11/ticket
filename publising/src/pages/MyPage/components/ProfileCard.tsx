import { useState } from 'react'
import { Icon } from '../../../components/common/icon'
import { GENRE_OPTIONS } from '../../../data/constants'
import type { User } from '../../../types'
import {
  GenreIconCircle,
  GenreIconStack,
  LevelBadge,
  MoreLink,
  ProfileAvatar,
  ProfileAvatarWrap,
  ProfileBottomRow,
  ProfileCard as Wrap,
  ProfileEditIcon,
  ProfileName,
  ProfileTitles,
  ProfileTopRow,
  TitleBadge,
} from '../styles'

function genreIcon(genreName: string): string {
  const found = GENRE_OPTIONS.find((g) => g.key === genreName)
  return found ? found.icon : '🎪'
}

export function ProfileCard({ user }: { user: User }) {
  const [imgError, setImgError] = useState(false)

  return (
    <Wrap>
      <ProfileEditIcon type="button" aria-label="프로필 편집">
        <Icon name="edit" />
      </ProfileEditIcon>
      <ProfileTopRow>
        <ProfileAvatarWrap>
          <ProfileAvatar>
            {!imgError && (
              <img src={user.avatarUrl} alt="프로필 사진" onError={() => setImgError(true)} />
            )}
          </ProfileAvatar>
          <LevelBadge>LV.{user.level}</LevelBadge>
        </ProfileAvatarWrap>
        <div>
          <ProfileName>{user.name} 님</ProfileName>
          <ProfileTitles>
            {user.titles.map((t) => (
              <TitleBadge key={t}>{t}</TitleBadge>
            ))}
          </ProfileTitles>
        </div>
      </ProfileTopRow>
      <ProfileBottomRow>
        <GenreIconStack>
          {user.favoriteGenreIcons.map((g) => (
            <GenreIconCircle key={g} title={g}>
              {genreIcon(g)}
            </GenreIconCircle>
          ))}
          {user.favoriteGenreExtraCount > 0 && (
            <GenreIconCircle $extra>+{user.favoriteGenreExtraCount}</GenreIconCircle>
          )}
        </GenreIconStack>
        <MoreLink href="#">전체보기 &gt;</MoreLink>
      </ProfileBottomRow>
    </Wrap>
  )
}
