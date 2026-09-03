import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { createGlobalStyle, keyframes, styled } from "styled-components";
import { tweaks } from "../../config/tweaks";

interface Spark {
  id: number;
  x: number;
  y: number;
  size: number;
  rotate: number;
  color: string;
  dx: number;
  dy: number;
  duration: number;
}

let sparkUid = 0;
const SPARK_COLORS = ["#B7A2F7", "#8B5CF6", "#7136DB", "#FF8F70", "#FFB199"];
const TRAIL_INTERVAL_MS = 45;
const HALO_EASE = 0.18;

const sparkleFloat = keyframes`
  0% {
    opacity: 1;
    transform: translate(var(--sx), var(--sy)) rotate(var(--r)) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(calc(var(--sx) + var(--dx)), calc(var(--sy) + var(--dy))) rotate(calc(var(--r) + 100deg)) scale(0.15);
  }
`;

/** 커서를 대체하는 동안 실제 OS 커서는 숨긴다 (데스크톱 포인터 전용 효과가 활성화됐을 때만 마운트됨) */
const HideNativeCursor = createGlobalStyle`
  html, body, * {
    cursor: none !important;
  }
`;

const Layer = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 2147483647;
`;

const Halo = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 36px;
  height: 36px;
  margin: -18px 0 0 -18px;
  border-radius: 50%;
  background:
    radial-gradient(circle at 35% 35%, rgba(139, 92, 246, 0.5), transparent 60%),
    radial-gradient(circle at 65% 65%, rgba(255, 127, 107, 0.4), transparent 60%);
  filter: blur(3px);
  will-change: transform;
`;

const Core = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 8px;
  height: 8px;
  margin: -4px 0 0 -4px;
  background: #ffffff;
  transform: rotate(45deg);
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.95), 0 0 3px rgba(139, 92, 246, 0.7);
  will-change: transform;
`;

const SparkShape = styled.svg<{ $size: number; $color: string }>`
  position: fixed;
  top: 0;
  left: 0;
  width: ${(p) => p.$size}px;
  height: ${(p) => p.$size}px;
  color: ${(p) => p.$color};
  animation: ${sparkleFloat} var(--dur) ease-out forwards;
`;

const SPARK_PATH =
  "M12 2c.5 3.6 1.9 5 5.5 5.5-3.6.5-5 1.9-5.5 5.5-.5-3.6-1.9-5-5.5-5.5C10.1 7 11.5 5.6 12 2Z";

function isCoarsePointerDevice() {
  return typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
}

/**
 * 흰 다이아 코어 + 보라/코랄 헤일로가 마우스를 따라오고, 움직이면 별 스파클이 흩날리는 커스텀 커서.
 * 클릭하면 스파클 7개가 한 번에 터진다. 터치 기기에서는 자동으로 비활성화되고,
 * config/tweaks.ts의 sparkleCursor로 끌 수 있다.
 */
export function SparkleCursor() {
  const [active, setActive] = useState(false);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const coreRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: -100, y: -100 });
  const haloPos = useRef({ x: -100, y: -100 });
  const lastSpawn = useRef(0);

  useEffect(() => {
    if (tweaks.sparkleCursor && !isCoarsePointerDevice()) {
      setActive(true);
    }
  }, []);

  const spawnSpark = useCallback((x: number, y: number, angle?: number) => {
    const a = angle ?? Math.random() * Math.PI * 2;
    const distance = 24 + Math.random() * 20;
    const spark: Spark = {
      id: sparkUid++,
      x,
      y,
      size: 8 + Math.random() * 8,
      rotate: Math.random() * 360,
      color: SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)],
      dx: Math.cos(a) * distance,
      dy: Math.sin(a) * distance,
      duration: 500 + Math.random() * 300,
    };
    setSparks((prev) => [...prev.slice(-28), spark]);
    window.setTimeout(() => {
      setSparks((prev) => prev.filter((s) => s.id !== spark.id));
    }, spark.duration + 60);
  }, []);

  useEffect(() => {
    if (!active) return;

    const handleMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (coreRef.current) {
        coreRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) rotate(45deg)`;
      }
      const now = performance.now();
      if (now - lastSpawn.current > TRAIL_INTERVAL_MS) {
        lastSpawn.current = now;
        spawnSpark(e.clientX, e.clientY);
      }
    };

    const handleClick = (e: MouseEvent) => {
      const BURST_COUNT = 7;
      for (let i = 0; i < BURST_COUNT; i++) {
        spawnSpark(e.clientX, e.clientY, (i / BURST_COUNT) * Math.PI * 2);
      }
    };

    const handleLeave = () => {
      if (coreRef.current) coreRef.current.style.opacity = "0";
      if (haloRef.current) haloRef.current.style.opacity = "0";
    };
    const handleEnter = () => {
      if (coreRef.current) coreRef.current.style.opacity = "1";
      if (haloRef.current) haloRef.current.style.opacity = "1";
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("click", handleClick);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    let raf: number;
    const loop = () => {
      haloPos.current.x += (targetPos.current.x - haloPos.current.x) * HALO_EASE;
      haloPos.current.y += (targetPos.current.y - haloPos.current.y) * HALO_EASE;
      if (haloRef.current) {
        haloRef.current.style.transform = `translate(${haloPos.current.x}px, ${haloPos.current.y}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("click", handleClick);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
      cancelAnimationFrame(raf);
    };
  }, [active, spawnSpark]);

  if (!active) return null;

  return (
    <>
      <HideNativeCursor />
      <Layer>
        <Halo ref={haloRef} />
        <Core ref={coreRef} />
        {sparks.map((s) => (
          <SparkShape
            key={s.id}
            $size={s.size}
            $color={s.color}
            viewBox="0 0 24 24"
            fill="currentColor"
            style={
              {
                "--sx": `${s.x}px`,
                "--sy": `${s.y}px`,
                "--dx": `${s.dx}px`,
                "--dy": `${s.dy}px`,
                "--r": `${s.rotate}deg`,
                "--dur": `${s.duration}ms`,
              } as CSSProperties
            }
          >
            <path d={SPARK_PATH} />
          </SparkShape>
        ))}
      </Layer>
    </>
  );
}
