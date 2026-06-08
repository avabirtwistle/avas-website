import { useRef, type MouseEvent } from 'react';
import './GlowPill.css';

type GlowPillProps = {
  label: string;
};

export function GlowPill({ label }: GlowPillProps) {
  const ref = useRef<HTMLLIElement>(null);

  const handleMove = (e: MouseEvent<HTMLLIElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--y', `${e.clientY - rect.top}px`);
  };

  return (
    <li ref={ref} className="glow-pill" onMouseMove={handleMove}>
      <span className="glow-pill__label">{label}</span>
    </li>
  );
}
