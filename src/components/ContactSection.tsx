import { useEffect, useRef, useState, type CSSProperties } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { site } from '../data/content';
import { HoverText } from './HoverText';
import './ContactSection.css';
import './Section.css';

gsap.registerPlugin(ScrollTrigger);

const SWEEP_DURATION = 8;
const GLOW_DECAY = 2.4;
const HIT_WINDOW = 5;

const contacts = [
  {
    id: 'email',
    label: 'Email',
    value: site.email,
    href: `mailto:${site.email}`,
    external: false,
    angle: 218,
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'github.com/avabirtwistle',
    href: site.github,
    external: true,
    angle: 308,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'ca.linkedin.com/in/avabirtwistle',
    href: site.linkedin,
    external: true,
    angle: 138,
  },
  {
    id: 'resume',
    label: 'Resume',
    value: 'Download PDF',
    href: site.resumeUrl,
    external: true,
    angle: 48,
  },
] as const;

function blipPosition(angle: number, radius = 34) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    x: 50 + radius * Math.cos(rad),
    y: 50 + radius * Math.sin(rad),
  };
}

function leadingEdgeAt(elapsedSec: number) {
  return ((elapsedSec % SWEEP_DURATION) / SWEEP_DURATION) * 360;
}

function hitIntensity(blipAngle: number, leading: number) {
  const passed = (leading - blipAngle + 360) % 360;
  if (passed > HIT_WINDOW) return 0;
  return 1 - passed / HIT_WINDOW;
}

export function ContactSection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const scopeRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const sweepStartRef = useRef<number | null>(null);
  const lastTickRef = useRef<number | null>(null);
  const glowRef = useRef<Record<string, number>>({});
  const rafRef = useRef(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    let running = false;

    const tick = () => {
      const scope = scopeRef.current;
      const sweep = sweepRef.current;
      const start = sweepStartRef.current;

      if (!running || !scope || !sweep || start === null) return;

      const now = performance.now();
      const elapsed = (now - start) / 1000;
      const leading = leadingEdgeAt(elapsed);
      const lastTick = lastTickRef.current ?? now;
      const dt = Math.min((now - lastTick) / 1000, 0.05);

      sweep.style.transform = `rotate(${leading}deg)`;

      const blipEls = scope.querySelectorAll<HTMLAnchorElement>('.radar-scope__blip');
      contacts.forEach((contact, i) => {
        const el = blipEls[i];
        if (!el) return;

        const isHover = el.matches(':hover') || document.activeElement === el;
        let glow = glowRef.current[contact.id] ?? 0;

        if (!isHover) {
          const hit = hitIntensity(contact.angle, leading);
          if (hit > 0) {
            glow = Math.max(glow, hit);
          } else {
            glow *= Math.exp(-GLOW_DECAY * dt);
            if (glow < 0.015) glow = 0;
          }
        } else {
          glow = 1;
        }

        glowRef.current[contact.id] = glow;
        el.style.setProperty('--blip-glow', String(glow));
      });

      lastTickRef.current = now;

      rafRef.current = requestAnimationFrame(tick);
    };

    const startSweep = () => {
      if (running) return;
      running = true;
      sweepStartRef.current = performance.now();
      lastTickRef.current = null;
      glowRef.current = {};
      setLive(true);
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: 'top 82%',
          once: true,
          onEnter: startSweep,
        },
      });

      tl.fromTo(wrap, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });

      tl.fromTo(
        '.radar-scope__ring',
        { scale: 0.88, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.55, stagger: 0.06, ease: 'power2.out' },
        0.12,
      );

      tl.fromTo(
        '.radar-scope__sweep',
        { opacity: 0 },
        { opacity: 1, duration: 0.45, ease: 'power2.out' },
        0.2,
      );
    }, wrap);

    ScrollTrigger.refresh();
    if (ScrollTrigger.isInViewport(wrap, 0.18)) {
      startSweep();
    }

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
      sweepStartRef.current = null;
      setLive(false);
      ctx.revert();
    };
  }, []);

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <p className="section-label" data-reveal>
          Contact
        </p>
        <h2 className="section-title" data-reveal>
          <HoverText text="Let's connect" className="hover-text--title" />
        </h2>
        <p className="section-intro" data-reveal>
          Open to co-op opportunities in embedded systems, firmware, and hardware-adjacent software roles.
        </p>

        <div ref={wrapRef} className="radar-contact">
          <div
            ref={scopeRef}
            className={`radar-scope ${live ? 'radar-scope--live' : ''}`}
            aria-label="Contact links"
          >
            <svg className="radar-scope__svg" viewBox="0 0 400 400" aria-hidden="true">
              <defs>
                <radialGradient id="scopeBg" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#101014" />
                  <stop offset="100%" stopColor="#080809" />
                </radialGradient>
              </defs>

              <circle cx="200" cy="200" r="196" fill="url(#scopeBg)" />
              <circle cx="200" cy="200" r="196" className="radar-scope__bezel" fill="none" />

              {[170, 128, 86, 44].map((r) => (
                <circle key={r} cx="200" cy="200" r={r} className="radar-scope__ring" fill="none" />
              ))}

              <line x1="200" y1="24" x2="200" y2="376" className="radar-scope__axis" />
              <line x1="24" y1="200" x2="376" y2="200" className="radar-scope__axis" />
            </svg>

            <div
              ref={sweepRef}
              className={`radar-scope__sweep ${live ? 'radar-scope__sweep--on' : ''}`}
              aria-hidden="true"
            />

            <div className="radar-scope__center" aria-hidden="true">
              <span className="radar-scope__center-dot" />
            </div>

            {contacts.map((contact) => {
              const { x, y } = blipPosition(contact.angle);
              const isHover = hoveredId === contact.id;

              return (
                <a
                  key={contact.id}
                  href={contact.href}
                  className={`radar-scope__blip ${isHover ? 'radar-scope__blip--hover' : ''}`}
                  style={{ left: `${x}%`, top: `${y}%` } as CSSProperties}
                  target={contact.external ? '_blank' : undefined}
                  rel={contact.external ? 'noopener noreferrer' : undefined}
                  onMouseEnter={() => setHoveredId(contact.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onFocus={() => setHoveredId(contact.id)}
                  onBlur={() => setHoveredId(null)}
                  aria-label={`${contact.label}: ${contact.value}`}
                >
                  <span className="radar-scope__blip-dot" />
                  <span className="radar-scope__blip-hint">{contact.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
