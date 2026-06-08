import { experience } from '../data/content';
import { HoverText } from './HoverText';
import './Section.css';

export function ExperienceSection() {
  return (
    <section className="section section--alt" id="experience">
      <div className="container">
        <p className="section-label" data-reveal>
          Experience
        </p>
        <h2 className="section-title" data-reveal>
          <HoverText text="Education & roles" className="hover-text--title" />
        </h2>
        <p className="section-intro" data-reveal>
          Where I have been building skills and contributing so far.
        </p>

        <div className="timeline" data-stagger>
          {experience.map((item) => (
            <article key={item.title + item.period} className="timeline__item" data-stagger-item>
              <div className="timeline__marker" aria-hidden="true" />
              <div className="timeline__content">
                <div className="timeline__header">
                  <h3 className="timeline__title">
                    <HoverText text={item.title} />
                  </h3>
                  <time className="timeline__period">{item.period}</time>
                </div>
                <p className="timeline__org">{item.org}</p>
                <p className="timeline__details">{item.details}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
