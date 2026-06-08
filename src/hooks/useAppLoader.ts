import { useEffect, useState } from 'react';

export type LoaderPhase = 'loading' | 'exiting' | 'done';

const EXIT_MS = 950;

export function useAppLoader(minDuration = 2000) {
  const [phase, setPhase] = useState<LoaderPhase>('loading');

  useEffect(() => {
    let cancelled = false;
    let doneTimer: ReturnType<typeof setTimeout> | undefined;

    const waitForReady = Promise.all([
      document.fonts?.ready ?? Promise.resolve(),
      new Promise<void>((resolve) => {
        if (document.readyState === 'complete') {
          resolve();
          return;
        }
        window.addEventListener('load', () => resolve(), { once: true });
      }),
      new Promise<void>((resolve) => {
        window.setTimeout(resolve, minDuration);
      }),
    ]);

    waitForReady.then(() => {
      if (cancelled) return;
      setPhase('exiting');
      doneTimer = window.setTimeout(() => {
        if (!cancelled) setPhase('done');
      }, EXIT_MS);
    });

    return () => {
      cancelled = true;
      if (doneTimer) window.clearTimeout(doneTimer);
    };
  }, [minDuration]);

  return phase;
}
