import { services } from '../data';

export default function Services() {
  return (
    <section id="services" className="section services">
      <span className="section-num" aria-hidden="true" />
      <div className="container">
        <p className="section__eyebrow" data-reveal>
          What I Can Help With
        </p>
        <h2 className="section__title" data-reveal>
          Services
        </h2>

        <div className="services__list">
          {services.map((service, index) => (
            <div
              className="service-row"
              data-reveal
              data-reveal-delay={index * 50}
              key={service.num}
            >
              <span className="service-row__num">{service.num}</span>
              <i className={service.icon} />
              <div className="service-row__body">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
              <span className="service-row__arrow">
                <i className="fa-solid fa-arrow-right" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
