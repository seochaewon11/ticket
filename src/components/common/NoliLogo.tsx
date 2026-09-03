import { useId } from "react";

export interface NoliLogoProps {
  className?: string;
}

const sparkles = [
  { opacity: 0.9, transform: "translate(151,8) scale(1.15)", values: "0.5;1;0.5", dur: "2.2s", begin: "0s" },
  { opacity: 0.7, transform: "translate(200,2) scale(0.6)", values: "0.4;0.9;0.4", dur: "2.2s", begin: "0.4s" },
  { opacity: 0.85, transform: "translate(228,58) scale(0.85)", values: "0.5;1;0.5", dur: "2.4s", begin: "0.8s" },
  { opacity: 0.6, transform: "translate(103,52) scale(0.55)", values: "0.35;0.85;0.35", dur: "2s", begin: "0.2s" },
  { opacity: 0.55, transform: "translate(96,122) scale(0.45)", values: "0.3;0.8;0.3", dur: "2.6s", begin: "1s" },
  { opacity: 0.8, transform: "translate(216,142) scale(0.7)", values: "0.45;0.95;0.45", dur: "2.3s", begin: "0.6s" },
];

const sparklePath =
  "M0,-11 C2,-3 3,-2 11,0 C3,2 2,3 0,11 C-2,3 -3,2 -11,0 C-3,-2 -2,-3 0,-11 Z";

/**
 * 앱 전역에서 쓰는 NOLI 로고 (org/js/splash.js의 buildLogoSvg를 이식).
 * 래스터 이미지가 아닌 벡터 SVG라서 스플래시처럼 크게 확대해도 깨지지 않는다.
 * 그라디언트 id는 한 문서에 여러 곳에서 동시에 렌더링돼도 충돌하지 않도록 useId()로 매번 고유하게 만든다.
 */
export function NoliLogo({ className }: NoliLogoProps) {
  const uid = useId();
  const letterGradId = `letterGrad-${uid}`;
  const ticketGradId = `ticketGrad-${uid}`;

  return (
    <svg className={className} viewBox="0 0 420 170" role="img" aria-label="NOLI">
      <defs>
        <linearGradient id={letterGradId} gradientUnits="userSpaceOnUse" x1="0" y1="18" x2="0" y2="152">
          <stop offset="0%" stopColor="#B7A2F7" />
          <stop offset="45%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#5B21B6" />
        </linearGradient>
        <linearGradient id={ticketGradId} gradientUnits="userSpaceOnUse" x1="121" y1="25" x2="199" y2="147">
          <stop offset="0%" stopColor="#C9B7FA" />
          <stop offset="55%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#5B21B6" />
        </linearGradient>
      </defs>

      {/* N */}
      <path
        d="M35,148 L35,22 L100,148 L100,22"
        fill="none"
        stroke={`url(#${letterGradId})`}
        strokeWidth={30}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* O 자리 : 티켓 + 음표 아이콘 */}
      <g transform="translate(160,85) rotate(-9) translate(-160,-85)">
        <path
          fillRule="evenodd"
          fill={`url(#${ticketGradId})`}
          d="M142,25 h36 a21,21 0 0 1 21,21 v78 a21,21 0 0 1 -21,21 h-36
            a21,21 0 0 1 -21,-21 v-78 a21,21 0 0 1 21,-21 Z
            M199,38 m-13,0 a13,13 0 1,0 26,0 a13,13 0 1,0 -26,0
            M121,132 m-13,0 a13,13 0 1,0 26,0 a13,13 0 1,0 -26,0"
        />
        <g fill="#FFFFFF">
          <rect x={147} y={50} width={6} height={38} rx={3} />
          <rect x={171} y={43} width={6} height={45} rx={3} />
          <rect x={147} y={46} width={30} height={9} rx={4} />
          <ellipse cx={145} cy={90} rx={10} ry={7.5} transform="rotate(-12 145 90)" />
          <ellipse cx={169} cy={90} rx={10} ry={7.5} transform="rotate(-12 169 90)" />
        </g>
      </g>

      {/* L */}
      <path
        d="M235,22 L235,148 L296,148"
        fill="none"
        stroke={`url(#${letterGradId})`}
        strokeWidth={30}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* I */}
      <path d="M347,22 L347,148" fill="none" stroke={`url(#${letterGradId})`} strokeWidth={30} strokeLinecap="round" />

      {/* 반짝임 */}
      <g fill="#9F7DEB">
        {sparkles.map((s, i) => (
          <path key={i} opacity={s.opacity} transform={s.transform} d={sparklePath}>
            <animate attributeName="opacity" values={s.values} dur={s.dur} repeatCount="indefinite" begin={s.begin} />
          </path>
        ))}
      </g>
    </svg>
  );
}
