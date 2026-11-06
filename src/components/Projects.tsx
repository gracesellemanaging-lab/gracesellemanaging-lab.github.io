import { useState } from 'react';
import { projectFilters, projects } from '../data';

export default function Projects() {
  const [filter, setFilter] = useState('all');

  return (
    <section id="projects" className="section projects">
      <span className="section-num" aria-hidden="true" />
      <div className="container">
        <p className="section__eyebrow" data-reveal>
          Selected Work
        </p>
        <h2 className="section__title" data-reveal>
          Featured Projects
        </h2>
        <p className="projects__copy" data-reveal>
          A small selection of what I've designed and built. Each project taught me something new
          and pushed me further.
        </p>

        <div className="filter-bar" data-reveal>
          {projectFilters.map((item) => (
            <button
              key={item.id}
              className={`filter-btn${filter === item.id ? ' active' : ''}`}
              data-filter={item.id}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="work-grid">
          {projects.map((project) => {
            const hidden = filter !== 'all' && filter !== project.category;
            return (
              <article
                className={`work-card${hidden ? ' is-hidden' : ''}`}
                data-category={project.category}
                data-reveal
                data-reveal-delay={project.delay}
                key={project.title}
              >
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener"
                  className="work-card__media"
                  aria-label={`Open ${project.title} live demo`}
                >
                  <img
                    src={project.image}
                    alt={project.alt}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </a>
                <span className="work-card__tag">{project.tag}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="work-card__links">
                  <a href={project.href} target="_blank" rel="noopener" className="btn-work">
                    {project.linkLabel}{' '}
                    <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
                  </a>
                  <a href="#" className="btn-work-outline">
                    Source
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
