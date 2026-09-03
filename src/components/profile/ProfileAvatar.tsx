/** org/js/profile.js의 AVATAR_SVG를 이식한 일러스트풍 아바타 (실제 사진 대신 벡터로 대체) */
export function ProfileAvatar({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="프로필 아바타">
      <circle cx={26} cy={26} r={26} fill="#EFE7DD" />
      <circle cx={26} cy={23} r={10} fill="#F6CBA3" />
      <path d="M12 27c1-9 6-15 14-15s13 6 14 15" fill="none" stroke="#4A3B2A" strokeWidth={3} strokeLinecap="round" />
      <circle cx={21.5} cy={23} r={1.4} fill="#4A3B2A" />
      <circle cx={30.5} cy={23} r={1.4} fill="#4A3B2A" />
      <path d="M22 27.5c1.4 1.4 6.6 1.4 8 0" fill="none" stroke="#4A3B2A" strokeWidth={1.6} strokeLinecap="round" />
      <path d="M6 52c1-10 9-17 20-17s19 7 20 17" fill="#8A7CF0" />
    </svg>
  );
}
