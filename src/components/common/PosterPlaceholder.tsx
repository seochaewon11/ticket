import type { ReactNode } from "react";
import styled from "styled-components";

/**
 * org/css/common.css의 .img-ph[data-theme="..."] 그라디언트 세트를 이식.
 * 공연/아티스트 포스터는 실제 이미지가 아니라 테마별 그라디언트로 표현된다.
 */
export type PosterTheme =
  | "wicked"
  | "marie-curie"
  | "beetlejuice"
  | "deathnote"
  | "chicago"
  | "elizabeth"
  | "orchestra"
  | "bts"
  | "dracula"
  | "phantom"
  | "rebecca"
  | "frankenstein"
  | "ppallae"
  | "taeyeon"
  | "magic-forest"
  | "artist-1"
  | "artist-2"
  | "artist-3"
  | "artist-4"
  | "artist-5"
  | "artist-6"
  | "artist-7"
  | "opera-ghost";

const gradientByTheme: Record<PosterTheme, string> = {
  wicked: "linear-gradient(155deg, #23331f 0%, #3c3d63 45%, #6a3fa0 75%, #8a4fc4 100%)",
  "marie-curie": "linear-gradient(155deg, #123b3a 0%, #1f5c56 55%, #2f8f7a 100%)",
  beetlejuice: "linear-gradient(155deg, #12131f 0%, #201c3d 55%, #38235c 100%)",
  deathnote: "linear-gradient(155deg, #16161c 0%, #262336 55%, #3d2f55 100%)",
  chicago: "linear-gradient(155deg, #1c1c1c 0%, #2e2a2a 55%, #4a3a2c 100%)",
  elizabeth: "linear-gradient(155deg, #2a1c2e 0%, #4a2c46 55%, #6b3f5c 100%)",
  orchestra: "linear-gradient(155deg, #1c2333 0%, #2c3a5c 100%)",
  bts: "linear-gradient(155deg, #1a1a1a 0%, #3a3a3a 100%)",
  dracula: "linear-gradient(155deg, #1a1414 0%, #3a1414 55%, #5c1c22 100%)",
  phantom: "linear-gradient(155deg, #2a1414 0%, #4a1c1c 55%, #6b2020 100%)",
  rebecca: "linear-gradient(155deg, #14202a 0%, #1c3446 55%, #204a5c 100%)",
  frankenstein: "linear-gradient(155deg, #14201a 0%, #1c3424 55%, #204a2c 100%)",
  ppallae: "linear-gradient(155deg, #2a1c14 0%, #46301c 55%, #5c4020 100%)",
  taeyeon: "linear-gradient(155deg, #2a1420 0%, #461c34 55%, #5c2048 100%)",
  "magic-forest": "linear-gradient(155deg, #14261e 0%, #1c4030 55%, #205c40 100%)",
  "artist-1": "linear-gradient(155deg, #1c1c1c 0%, #34302e 100%)",
  "artist-2": "linear-gradient(155deg, #1c1c22 0%, #2e2e3a 100%)",
  "artist-3": "linear-gradient(155deg, #201c1c 0%, #3a2e2e 100%)",
  "artist-4": "linear-gradient(155deg, #16161c 0%, #262336 55%, #3d2f55 100%)",
  "artist-5": "linear-gradient(155deg, #142230 0%, #1c3a52 100%)",
  "artist-6": "linear-gradient(155deg, #201828 0%, #3a2846 100%)",
  "artist-7": "linear-gradient(155deg, #2a1620 0%, #462238 100%)",
  "opera-ghost": "linear-gradient(155deg, #241012 0%, #401820 55%, #601c28 100%)",
};

const PlaceholderBase = styled.div<{ $theme: PosterTheme }>`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: ${(props) => gradientByTheme[props.$theme]};
`;

const PlaceholderImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export interface PosterPlaceholderProps {
  $theme: PosterTheme;
  /** 실제 사진이 있으면 그라디언트 대신 이 이미지를 채운다 */
  imageUrl?: string;
  alt?: string;
  className?: string;
  children?: ReactNode;
}

/**
 * 부모 요소의 width/height를 그대로 채우는 포스터(공연/아티스트) 자리표시자.
 * imageUrl이 없으면 테마 그라디언트, 있으면 실제 이미지를 보여준다.
 */
export function PosterPlaceholder({ $theme, imageUrl, alt = "", className, children }: PosterPlaceholderProps) {
  return (
    <PlaceholderBase $theme={$theme} className={className}>
      {imageUrl ? <PlaceholderImage src={imageUrl} alt={alt} /> : null}
      {children}
    </PlaceholderBase>
  );
}
