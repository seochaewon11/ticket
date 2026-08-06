import { useState } from 'react'
import type { RecentlyViewed } from '../../../types'
import { RecentItem, RecentPoster, RecentScrollWrap, RecentTitle, RecentVenue } from '../styles'

function RecentPosterImg({ item }: { item: RecentlyViewed }) {
  const [imgError, setImgError] = useState(false)

  return (
    <RecentPoster
      style={imgError ? { background: 'linear-gradient(160deg, #2A2140 0%, #7C5CFC 60%, #F7F0EC 100%)' } : undefined}
    >
      {!imgError && (
        <img src={item.posterUrl} alt={`${item.title} 포스터`} onError={() => setImgError(true)} />
      )}
    </RecentPoster>
  )
}

export function RecentScroll({ items }: { items: RecentlyViewed[] }) {
  return (
    <RecentScrollWrap>
      {items.map((item) => (
        <RecentItem key={item.id}>
          <RecentPosterImg item={item} />
          <RecentTitle>{item.title}</RecentTitle>
          <RecentVenue>{item.venue}</RecentVenue>
        </RecentItem>
      ))}
    </RecentScrollWrap>
  )
}
