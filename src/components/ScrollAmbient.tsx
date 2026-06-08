import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollAmbient.css';

gsap.registerPlugin(ScrollTrigger);

export function ScrollAmbient() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const main = document.querySelector('main');
      if (!main) return;

      gsap.to('.scroll-ambient__glow--teal', {
        yPercent: -22,
        xPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: main,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.4,
        },
      });

      gsap.to('.scroll-ambient__glow--copper', {
        yPercent: 18,
        xPercent: -14,
        ease: 'none',
        scrollTrigger: {
          trigger: main,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2,
        },
      });

      gsap.to('.scroll-ambient__grid', {
        y: -160,
        ease: 'none',
        scrollTrigger: {
          trigger: main,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
        },
      });
    }, root);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="scroll-ambient" aria-hidden="true">
      <div className="scroll-ambient__grid" />
      <div className="scroll-ambient__glow scroll-ambient__glow--teal" />
      <div className="scroll-ambient__glow scroll-ambient__glow--copper" />
    </div>
  );
}
