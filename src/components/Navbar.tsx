import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { navLinks, socials, workMenu } from '../data';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);

  const dropdownRef = useRef<HTMLLIElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>('main section[id]')];

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);

      let current = sections[0]?.id ?? 'home';
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= 140) current = section.id;
      }
      setActive(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!workOpen) return;

    const onDocumentClick = (event: globalThis.MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setWorkOpen(false);
      }
    };
    const onDocumentKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setWorkOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => setWorkOpen(false);

    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onDocumentKeyDown);
    window.addEventListener('resize', onResize);

    return () => {
      document.removeEventListener('click', onDocumentClick);
      document.removeEventListener('keydown', onDocumentKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, [workOpen]);

  const closeMenus = () => {
    setWorkOpen(false);
    setMobileOpen(false);
  };

  const focusItem = (index: number) => {
    const items = menuRef.current ? [...menuRef.current.querySelectorAll<HTMLAnchorElement>('a')] : [];
    if (!items.length) return;
    const next = ((index % items.length) + items.length) % items.length;
    items[next].focus();
  };

  const handleToggleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setWorkOpen(true);
      requestAnimationFrame(() => focusItem(0));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setWorkOpen(true);
      requestAnimationFrame(() => focusItem(-1));
    } else if (event.key === 'Escape') {
      setWorkOpen(false);
    }
  };

  const handleMenuKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    const items = menuRef.current ? [...menuRef.current.querySelectorAll<HTMLAnchorElement>('a')] : [];
    const index = items.indexOf(document.activeElement as HTMLAnchorElement);

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        focusItem(index + 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        focusItem(index - 1);
        break;
      case 'Home':
        event.preventDefault();
        focusItem(0);
        break;
      case 'End':
        event.preventDefault();
        focusItem(items.length - 1);
        break;
      case 'Escape':
        event.preventDefault();
        setWorkOpen(false);
        toggleRef.current?.focus();
        break;
      case 'Tab':
        setWorkOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <header className={`navbar${scrolled ? ' is-scrolled' : ''}`}>
      <nav className="navbar__inner">
        <a href="#home" className="navbar__logo">
          Graceselle<span className="dot">.</span>
        </a>

        <ul className={`navbar__links${mobileOpen ? ' is-open' : ''}`} id="navLinks">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`nav-link${active === link.href.slice(1) ? ' active' : ''}`}
                data-link
                onClick={closeMenus}
              >
                {link.label}
              </a>
            </li>
          ))}

          <li className={`nav-dropdown${workOpen ? ' is-open' : ''}`} ref={dropdownRef}>
            <button
              type="button"
              className="nav-link nav-dropdown__toggle"
              id="workMenuBtn"
              ref={toggleRef}
              aria-haspopup="true"
              aria-expanded={workOpen}
              aria-controls="workMenu"
              onClick={() => setWorkOpen((open) => !open)}
              onKeyDown={handleToggleKeyDown}
            >
              Work
              <svg className="nav-dropdown__caret" viewBox="0 0 10 6" aria-hidden="true">
                <path
                  d="M1 1l4 4 4-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <ul
              className="nav-dropdown__menu"
              id="workMenu"
              role="menu"
              aria-labelledby="workMenuBtn"
              ref={menuRef}
              onKeyDown={handleMenuKeyDown}
            >
              {workMenu.map((item) => (
                <li key={item.label} role="none">
                  <a
                    role="menuitem"
                    href={item.href}
                    {...(item.external ? { target: '_blank', rel: 'noopener' } : {})}
                    onClick={closeMenus}
                  >
                    <i className={item.icon} /> {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </li>

          <li>
            <a
              href="#contact"
              className={`nav-link${active === 'contact' ? ' active' : ''}`}
              data-link
              onClick={closeMenus}
            >
              Contact
            </a>
          </li>
        </ul>

        <div className="navbar__socials">
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

        <button
          id="navToggle"
          className={`navbar__toggle${mobileOpen ? ' is-open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
    </header>
  );
}
