import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollStatements } from '../data/content';
import './StatementSection.css';

gsap.registerPlugin(ScrollTrigger);

export function StatementSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${scrollStatements.length * 80}%`,
          pin: true,
          scrub: 0.5,
        },
      });

      linesRef.current.forEach((line, i) => {
        if (!line) return;
        const start = i / scrollStatements.length;
        const end = (i + 1) / scrollStatements.length;
        const mid = (start + end) / 2;

        tl.fromTo(
          line,
          { opacity: 0, y: 60, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.15, ease: 'power3.out' },
          start,
        );

        if (i < scrollStatements.length - 1) {
          tl.to(
            line,
            { opacity: 0, y: -50, scale: 1.02, duration: 0.12, ease: 'power2.in' },
            mid,
          );
        }
      });

      tl.fromTo(
        labelRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.1 },
        0,
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="statement" aria-label="Focus areas">
      <div className="statement__inner">
        <p ref={labelRef} className="statement__label">
          I work on
        </p>
        <div className="statement__lines">
          {scrollStatements.map((text, i) => (
            <div
              key={text}
              ref={(el) => {
                linesRef.current[i] = el;
              }}
              className="statement__line"
              aria-hidden={i > 0}
            >
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
