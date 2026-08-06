import { useState } from 'react'
import { Icon } from '../../../components/common/icon'
import type { CastMember } from '../../../types'
import { CastItem, CastName, CastPhoto, CastRole, CastScroll } from '../styles'

function CastAvatar({ member }: { member: CastMember }) {
  const [imgError, setImgError] = useState(!member.photoUrl)

  return (
    <CastPhoto>
      {!imgError && member.photoUrl ? (
        <img src={member.photoUrl} alt={member.name} onError={() => setImgError(true)} />
      ) : (
        <Icon name="profile" size={28} />
      )}
    </CastPhoto>
  )
}

export function CastList({ cast }: { cast: CastMember[] }) {
  return (
    <CastScroll>
      {cast.map((member) => (
        <CastItem key={member.name}>
          <CastAvatar member={member} />
          <CastName>{member.name}</CastName>
          <CastRole>{member.role}</CastRole>
        </CastItem>
      ))}
    </CastScroll>
  )
}
