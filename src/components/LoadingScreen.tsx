import { useEffect, useState, type CSSProperties } from 'react';
import type { LoaderPhase } from '../hooks/useAppLoader';
import './LoadingScreen.css';

type LoadingScreenProps = {
  phase: LoaderPhase;
};

export function LoadingScreen({ phase }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (phase === 'done') return;

    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyTouch = body.style.touchAction;

    window.scrollTo(0, 0);
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    body.style.touchAction = 'none';

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.touchAction = prevBodyTouch;
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== 'loading') {
      setProgress(100);
      return;
    }

    const start = performance.now();
    const duration = 1900;
    let frame = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      setProgress(Math.min(100, (elapsed / duration) * 100));
      if (elapsed < duration) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [phase]);

  if (phase === 'done') return null;

  return (
    <div
      className={`loader ${phase === 'exiting' ? 'loader--exiting' : ''}`}
      style={{ '--progress': `${progress}%` } as CSSProperties}
      role="status"
      aria-live="polite"
      aria-label={`Loading, ${Math.round(progress)} percent`}
    >
      <div className="loader__inner">
        <div className="loader__track" aria-hidden="true">
          <div className="loader__fill" />
        </div>
      </div>
    </div>
  );
}
