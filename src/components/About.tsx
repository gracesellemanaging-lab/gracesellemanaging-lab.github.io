import profileImage from '../assets/profile.png';

export default function About() {
  return (
    <section id="about" className="section about">
      <span className="section-num" aria-hidden="true" />
      <div className="container">
        <div className="about__grid">
          <div className="about__media" data-reveal>
            <div className="about__photo">
              <img
                loading="lazy"
                decoding="async"
                src={profileImage}
                alt="Graceselle Managing"
                onError={(event) => {
                  event.currentTarget.style.display = 'none';
                  (event.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex';
                }}
              />
              <div className="about__photo-fallback" aria-hidden="true">
                GM
              </div>
            </div>
          </div>

          <div className="about__copy" data-reveal data-reveal-delay="100">
            <p className="section__eyebrow">About Me</p>
            <p>
              Hi, I'm <strong>Graceselle Managing</strong> a 20-year-old{' '}
              <strong>Computer Science student</strong> who is a loving, friendly, and kind person.
              I enjoy spending time doing the things that make me happy while continuously learning
              and growing as a person.
            </p>
            <p>
              Outside academics, I love singing, dancing, watching K-Dramas, and listening to K-Pop.
              I'm also a Barbie lover and enjoy reading Wattpad stories whenever I have free time.
              These hobbies help me express my creativity and give me inspiration in my everyday
              life.
            </p>
            <p>
              As a Computer Science student, I also enjoy coding and creating things through
              technology. I like exploring how websites, applications, and digital interfaces work,
              and I enjoy turning ideas into something functional and useful. For me, coding is not
              just about writing lines of code it's also about solving problems, being creative, and
              continuously learning something new.
            </p>
            <p>
              I believe that being a good person, staying curious, and enjoying the things you love
              can make the journey more meaningful.
            </p>
            <ul className="about__facts">
              <li>
                <i className="fa-solid fa-graduation-cap" /> BSCS, Tangub City Global College
              </li>
              <li>
                <i className="fa-solid fa-location-dot" /> Bintana, Tangub City, Misamis Occidental
              </li>
              <li>
                <i className="fa-solid fa-language" /> English, Filipino, Cebuano/Bisaya
              </li>
              <li>
                <i className="fa-solid fa-crosshairs" /> UI/UX Design &amp; Frontend
              </li>
            </ul>
            <ul className="about__facts about__hobbies" aria-label="Hobbies">
              <li>
                <i className="fa-solid fa-music" /> Dancing
              </li>
              <li>
                <i className="fa-solid fa-book-open" /> Reading Wattpad
              </li>
              <li>
                <i className="fa-solid fa-star" /> Barbie Everything
              </li>
              <li>
                <i className="fa-solid fa-paintbrush" /> Makeup Artistry
              </li>
              <li>
                <i className="fa-solid fa-microphone" /> Singing
              </li>
              <li>
                <i className="fa-solid fa-tv" /> K-Drama Marathons
              </li>
              <li>
                <i className="fa-solid fa-headphones" /> K-Pop
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
