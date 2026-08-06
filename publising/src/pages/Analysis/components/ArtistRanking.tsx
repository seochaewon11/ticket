import { useState } from 'react'
import type { ArtistRankingItem } from '../../../types'
import {
  ArtistRankCount,
  ArtistRankInfo,
  ArtistRankName,
  ArtistRankPhoto,
  ArtistRankRole,
  ArtistRankRow,
  ArtistRankingList,
  RankBadge,
} from '../styles'

function RankPhoto({ artist }: { artist: ArtistRankingItem }) {
  const [imgError, setImgError] = useState(false)

  return (
    <ArtistRankPhoto>
      {!imgError ? (
        <img src={artist.photoUrl} alt={artist.name} onError={() => setImgError(true)} />
      ) : (
        artist.name.charAt(0)
      )}
    </ArtistRankPhoto>
  )
}

export function ArtistRanking({ list }: { list: ArtistRankingItem[] }) {
  return (
    <ArtistRankingList>
      {list.map((artist) => (
        <ArtistRankRow key={artist.rank}>
          <RankBadge $isFirst={artist.rank === 1}>{artist.rank}</RankBadge>
          <RankPhoto artist={artist} />
          <ArtistRankInfo>
            <ArtistRankName>{artist.name}</ArtistRankName>
            <ArtistRankRole>{artist.role}</ArtistRankRole>
          </ArtistRankInfo>
          <ArtistRankCount>{artist.count}회</ArtistRankCount>
        </ArtistRankRow>
      ))}
    </ArtistRankingList>
  )
}
