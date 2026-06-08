import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/content';
import { HoverText } from './HoverText';
import './ProjectsSection.css';

gsap.registerPlugin(ScrollTrigger);

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 901px)', () => {
      const getScroll = () => track.scrollWidth - window.innerWidth + 120;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getScroll()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      tl.to(track, { x: () => -getScroll(), ease: 'none' });

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="projects-section" id="projects">
      <div ref={headerRef} className="projects-section__header container">
        <p className="section-label" data-reveal>
          Projects
        </p>
        <h2 className="section-title" data-reveal>
          <HoverText text="Selected work" className="hover-text--title" />
        </h2>
      </div>

      <div className="projects-section__track-wrap">
        <div ref={trackRef} className="projects-section__track">
          {projects.map((project, index) => (
            <article key={project.title} className="project-panel">
              <div className="project-panel__bg" aria-hidden="true">
                <span className="project-panel__index">{String(index + 1).padStart(2, '0')}</span>
                <svg className="project-panel__schematic" viewBox="0 0 200 200" preserveAspectRatio="none">
                  <path d="M20 160 L60 160 L60 80 L120 80 L120 40 L180 40" fill="none" stroke="currentColor" strokeWidth="0.8" />
                  <path d="M30 30 L30 100 L100 100 L100 170 L170 170" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
                  <circle cx="60" cy="80" r="3" fill="currentColor" />
                  <circle cx="120" cy="40" r="3" fill="currentColor" />
                </svg>
              </div>

              <div className="project-panel__content">
                <div className="project-panel__meta">
                  <span className="project-panel__year">{project.year}</span>
                  <div className="project-panel__tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>

                <h3 className="project-panel__title">{project.title}</h3>
                <p className="project-panel__desc">{project.description}</p>

                {(project.links.github || project.links.demo) && (
                  <div className="project-panel__links">
                    {project.links.github && (
                      <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                        <HoverText text="View code" />
                      </a>
                    )}
                    {project.links.demo && (
                      <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                        <HoverText text="Live demo" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
          <div className="project-panel project-panel--spacer" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
