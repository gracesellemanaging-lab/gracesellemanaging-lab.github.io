import { useEffect, useRef, useState, type MouseEvent } from 'react';
import ActionButton from './ActionButton';
import { typingPhrases } from '../data';
import profileImage from '../assets/profile.png';

function useTyping(phrases: string[]) {
  const [text, setText] = useState('');

  useEffect(() => {
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const tick = () => {
      const phrase = phrases[phraseIndex];

      if (!deleting) {
        charIndex += 1;
        setText(phrase.slice(0, charIndex));
        if (charIndex === phrase.length) {
          deleting = true;
          timer = setTimeout(tick, 1500);
          return;
        }
      } else {
        charIndex -= 1;
        setText(phrase.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }

      timer = setTimeout(tick, deleting ? 35 : 65);
    };

    tick();
    return () => clearTimeout(timer);
  }, [phrases]);

  return text;
}

interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
}

function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;

    const resize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    const makeParticles = () => {
      const count = Math.min(60, Math.floor(width / 22));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.6 + 0.4,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(255, 201, 120, 0.55)';
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    };

    const onResize = () => {
      resize();
      makeParticles();
    };

    resize();
    makeParticles();
    draw();
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero__particles" aria-hidden="true" />;
}

export default function Hero() {
  const typed = useTyping(typingPhrases);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMediaMove = (event: MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(hover: none)').matches) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotateY(${x * 18}deg) rotateX(${-y * 18}deg)`;
  };

  const handleMediaLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = 'rotateY(0deg) rotateX(0deg)';
  };

  return (
    <section id="home" className="hero">
      <div className="hero__blobs" aria-hidden="true">
        <div className="blob blob--1" />
        <div className="blob blob--2" />
        <div className="blob blob--3" />
      </div>
      <Particles />
      <div className="hero__inner container">
        <div className="hero__content" data-reveal>
          <p className="hero__kicker">UI/UX Designer &amp; Frontend Developer</p>
          <h1 className="hero__name">
            Graceselle
            <br />
            <span>Managing.</span>
          </h1>
          <h2 className="hero__title">
            <span id="typed" className="typed">
              {typed}
            </span>
            <span className="typed-cursor">|</span>
          </h2>
          <p className="hero__desc">
            I design interfaces with <em className="accent">heart</em> playful,{' '}
            <em className="accent">purposeful</em>, and easy to fall in love with. I turn wireframes
            into experiences people actually want to use, one thoughtful screen at a time.
          </p>
          <div className="hero__cta">
            <ActionButton href="#projects" className="btn btn--primary" data-link>
              <i className="fa-solid fa-arrow-right" /> View My Work
            </ActionButton>
            <ActionButton href="#contact" className="btn btn--outline" data-link>
              <i className="fa-solid fa-envelope" /> Contact Me
            </ActionButton>
            <ActionButton
              href="assets/Resume.pdf"
              target="_blank"
              rel="noopener"
              className="btn btn--resume"
              download="Graceselle-Managing-Resume.pdf"
            >
              <i className="fa-solid fa-download" /> Download Resume
            </ActionButton>
          </div>
        </div>

        <div
          className="hero__media"
          data-reveal
          data-reveal-delay="150"
          onMouseMove={handleMediaMove}
          onMouseLeave={handleMediaLeave}
        >
          <div className="hero__photo" id="tiltCard" ref={cardRef}>
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
            <div className="hero__photo-fallback" aria-hidden="true">
              GM
            </div>
          </div>
        </div>
      </div>

      <a href="#about" className="scroll-hint" data-link aria-label="Scroll down">
        <span />
      </a>
    </section>
  );
}
