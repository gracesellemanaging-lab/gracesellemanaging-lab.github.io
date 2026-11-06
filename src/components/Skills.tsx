import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { skillGroups, type Skill } from '../data';

function SkillCard({ skill, delay }: { skill: Skill; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('in-view');
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const pct = skill.pct ?? 0;

  return (
    <div className="skill-card" data-reveal data-reveal-delay={delay} ref={ref}>
      <i className={skill.icon} />
      <h4>{skill.name}</h4>
      <div className="bar">
        <span style={{ '--pct': `${pct}%` } as CSSProperties} />
      </div>
      <em>{pct}%</em>
      {skill.desc && <p>{skill.desc}</p>}
    </div>
  );
}

export default function Skills() {
  const [activeGroup, setActiveGroup] = useState(skillGroups[0].id);

  const handleTab = (id: string) => {
    setActiveGroup(id);
    if (window.innerWidth < 768) {
      requestAnimationFrame(() => {
        const group = document.querySelector<HTMLElement>(`[data-skill-group="${id}"]`);
        group?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    }
  };

  return (
    <section id="skills" className="section skills">
      <span className="section-num" aria-hidden="true" />
      <div className="container">
        <p className="section__eyebrow" data-reveal>
          What I Work With
        </p>
        <h2 className="section__title" data-reveal>
          Tools that bring ideas to life.
        </h2>
        <p className="projects__copy" data-reveal>
          From research to final pixel the craft behind every interface I ship.
        </p>

        <div className="skills__tabs" role="tablist" data-reveal>
          {skillGroups.map((group) => (
            <button
              key={group.id}
              className={`skills__tab${activeGroup === group.id ? ' active' : ''}`}
              data-skill-tab={group.id}
              onClick={() => handleTab(group.id)}
            >
              {group.title}
            </button>
          ))}
        </div>

        {skillGroups.map((group) => (
          <div
            key={group.id}
            className={`skills__group${activeGroup === group.id ? ' is-active' : ''}`}
            data-skill-group={group.id}
          >
            <h3 className="skills__group-title">{group.title}</h3>
            {group.type === 'soft' ? (
              <div className="soft-grid">
                {group.items.map((skill, index) => (
                  <div
                    className="soft-pill"
                    data-reveal
                    data-reveal-delay={index * 50}
                    key={skill.name}
                  >
                    <i className={skill.icon} /> {skill.name}
                  </div>
                ))}
              </div>
            ) : (
              <div className="skill-grid">
                {group.items.map((skill, index) => (
                  <SkillCard key={skill.name} skill={skill} delay={index * 50} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
