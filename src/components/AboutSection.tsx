import { about } from '../data/content';
import { HoverText } from './HoverText';
import './Section.css';

export function AboutSection() {
  return (
    <section className="section" id="about">
      <div className="container">
        <p className="section-label" data-reveal>
          About
        </p>
        <h2 className="section-title" data-reveal>
          <HoverText text="Software close to the metal" className="hover-text--title" />
        </h2>
        <div className="about__grid">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="about__text" data-reveal>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
