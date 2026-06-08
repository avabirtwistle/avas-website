import { skills } from '../data/content';
import { GlowPill } from './GlowPill';
import { HoverText } from './HoverText';
import './SkillsSection.css';
import './Section.css';

export function SkillsSection() {
  return (
    <section className="section section--alt skills-section" id="skills">
      <div className="skills-section__bg" aria-hidden="true" />

      <div className="container skills-section__inner">
        <p className="section-label" data-reveal>
          Skills
        </p>
        <h2 className="section-title" data-reveal>
          <HoverText text="Tools I use to build systems" className="hover-text--title" />
        </h2>
        <p className="section-intro" data-reveal>
          From firmware and digital logic to the software stack that supports them.
        </p>

        <div className="skills-grid" data-stagger>
          {skills.map((group) => (
            <article key={group.category} className="skills-card" data-stagger-item>
              <h3 className="skills-card__title">
                <HoverText text={group.category} />
              </h3>
              <ul className="skills-card__list">
                {group.items.map((item) => (
                  <GlowPill key={item} label={item} />
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
