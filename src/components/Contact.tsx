import { useState, type ChangeEvent, type FormEvent } from 'react';
import ActionButton from './ActionButton';
import { socials } from '../data';

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FieldName = keyof FormValues;

const validators: Record<FieldName, (value: string) => boolean> = {
  name: (value) => value.trim().length > 1,
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  subject: (value) => value.trim().length > 1,
  message: (value) => value.trim().length > 5,
};

const emptyValues: FormValues = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [errors, setErrors] = useState<Partial<Record<FieldName, boolean>>>({});
  const [status, setStatus] = useState({ text: '', color: '' });

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const field = name as FieldName;
    setValues((current) => ({ ...current, [field]: value }));

    if (errors[field] && validators[field](value)) {
      setErrors((current) => ({ ...current, [field]: false }));
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Partial<Record<FieldName, boolean>> = {};
    (Object.keys(validators) as FieldName[]).forEach((field) => {
      if (!validators[field](values[field])) nextErrors[field] = true;
    });
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      setStatus({ text: 'Please fix the highlighted fields.', color: '#f87171' });
      return;
    }

    setStatus({
      text: "Message sent! I'll get back to you soon.",
      color: 'var(--success)',
    });
    setValues(emptyValues);
    setTimeout(() => setStatus({ text: '', color: '' }), 5000);
  };

  const fieldClass = (field: FieldName) => `field${errors[field] ? ' is-invalid' : ''}`;

  return (
    <section id="contact" className="section contact">
      <span className="section-num" aria-hidden="true" />
      <div className="container">
        <p className="section__eyebrow" data-reveal>
          Let's Talk
        </p>
        <h2 className="section__title" data-reveal>
          Got an idea? Let's design it together.
        </h2>

        <div className="contact__grid">
          <form
            className="contact__form"
            id="contactForm"
            data-reveal
            noValidate
            onSubmit={handleSubmit}
          >
            <div className={fieldClass('name')}>
              <input
                type="text"
                id="cName"
                name="name"
                placeholder=" "
                required
                value={values.name}
                onChange={handleChange}
              />
              <label htmlFor="cName">Your Name</label>
              <span className="field__error">Please enter your name.</span>
            </div>
            <div className={fieldClass('email')}>
              <input
                type="email"
                id="cEmail"
                name="email"
                placeholder=" "
                required
                value={values.email}
                onChange={handleChange}
              />
              <label htmlFor="cEmail">Your Email</label>
              <span className="field__error">Please enter a valid email.</span>
            </div>
            <div className={fieldClass('subject')}>
              <input
                type="text"
                id="cSubject"
                name="subject"
                placeholder=" "
                required
                value={values.subject}
                onChange={handleChange}
              />
              <label htmlFor="cSubject">Subject</label>
              <span className="field__error">Please enter a subject.</span>
            </div>
            <div className={fieldClass('message')}>
              <textarea
                id="cMessage"
                name="message"
                rows={5}
                placeholder=" "
                required
                value={values.message}
                onChange={handleChange}
              />
              <label htmlFor="cMessage">Message</label>
              <span className="field__error">Please enter a message.</span>
            </div>
            <ActionButton type="submit" className="btn btn--primary" id="contactSubmit">
              <i className="fa-solid fa-paper-plane" /> Send Message
            </ActionButton>
            <p className="form__status" id="formStatus" role="status" style={{ color: status.color }}>
              {status.text}
            </p>
          </form>

          <div className="contact__info" data-reveal data-reveal-delay="150">
            <p>
              Have a project, an internship opening, or just a question about one of my designs? My{' '}
              <em className="accent">inbox is open</em>.
            </p>
            <div className="contact__cards">
              <a className="contact-card" href="mailto:gracesellemanaging@gmail.com">
                <i className="fa-solid fa-envelope" />
                <span>Email</span>
                <small>gracesellemanaging@gmail.com</small>
              </a>
              <a className="contact-card" href="#">
                <i className="fa-solid fa-location-dot" />
                <span>Location</span>
                <small>Bintana, Tangub City, Misamis Occidental</small>
              </a>
            </div>
            <div className="navbar__socials contact__socials">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener"
                  aria-label={social.label}
                  className="social-icon"
                >
                  <i className={social.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
