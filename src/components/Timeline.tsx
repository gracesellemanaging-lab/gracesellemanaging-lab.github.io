import { timeline } from '../data';

export default function Timeline() {
  return (
    <section id="timeline" className="section timeline">
      <span className="section-num" aria-hidden="true" />
      <div className="container">
        <p className="section__eyebrow" data-reveal>
          My Journey
        </p>
        <h2 className="section__title" data-reveal>
          Education &amp; Milestones
        </h2>

        <div className="timeline">
          {timeline.map((item) => (
            <div
              className="timeline__item"
              data-reveal
              data-reveal-delay={item.delay}
              key={item.num}
            >
              <div className="timeline__marker">
                <i className={item.icon} />
              </div>
              <div className="timeline__card">
                <span className="timeline__num">{item.num}</span>
                <span className="timeline__date">{item.date}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
