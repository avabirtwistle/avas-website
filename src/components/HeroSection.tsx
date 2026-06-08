import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { site } from '../data/content';
import { ChipScene } from './ChipScene';
import { HoverText } from './HoverText';
import './HeroSection.css';

gsap.registerPlugin(ScrollTrigger);

type HeroSectionProps = {
  showChip?: boolean;
};

export function HeroSection({ showChip = true }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollProgress = useRef(0);
  const heroScrollTrigger = useRef<ScrollTrigger | null>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const syncScrollProgress = () => {
      if (heroScrollTrigger.current) {
        scrollProgress.current = heroScrollTrigger.current.progress;
      }
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 1.1,
          onUpdate: (self) => {
            heroScrollTrigger.current = self;
          },
        },
      });

      tl.fromTo(
        canvasWrapRef.current,
        { scale: 0.85, opacity: 0.3 },
        { scale: 1, opacity: 1, duration: 0.35, ease: 'power2.out' },
        0,
      );

      tl.fromTo(
        nameRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.25, ease: 'power3.out' },
        0.15,
      );

      tl.fromTo(
        metaRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.2, ease: 'power3.out' },
        0.28,
      );

      tl.fromTo(
        taglineRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.2, ease: 'power3.out' },
        0.38,
      );

      tl.to(
        introRef.current,
        { y: -60, opacity: 0, duration: 0.35, ease: 'power2.in' },
        0.65,
      );

      tl.to(
        canvasWrapRef.current,
        { scale: 1.2, opacity: 0.15, duration: 0.35, ease: 'power2.in' },
        0.65,
      );
    }, section);

    gsap.ticker.add(syncScrollProgress);

    return () => {
      gsap.ticker.remove(syncScrollProgress);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="hero" id="top">
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__inner">
        <div ref={introRef} className="hero__intro">
          <p className="hero__eyebrow">Portfolio</p>
          <h1 ref={nameRef} className="hero__name">
            <HoverText text={site.name} className="hover-text--title" />
          </h1>
          <div ref={metaRef} className="hero__meta">
            <span>{site.role}</span>
            <span className="hero__dot" aria-hidden="true" />
            <span>{site.minor}</span>
            <span className="hero__dot" aria-hidden="true" />
            <span>{site.location}</span>
          </div>
          <p ref={taglineRef} className="hero__tagline">
            {site.tagline}
          </p>
        </div>
        <div ref={canvasWrapRef} className="hero__canvas">
          {showChip ? <ChipScene key="hero-chip" scrollProgress={scrollProgress} /> : null}
        </div>
      </div>
      <div className="hero__scroll-hint" aria-hidden="true">
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
