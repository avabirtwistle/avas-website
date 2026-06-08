import { useEffect, useState } from 'react';
import { site, navLinks } from '../data/content';
import './Header.css';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header__inner container">
        <a href="#top" className="header__logo" onClick={() => setMenuOpen(false)}>
          <span className="header__logo-mark" aria-hidden="true" />
          <span>{site.name.split(' ')[0]}</span>
        </a>

        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`} aria-label="Main">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
          <a
            className="header__resume header__resume--mobile"
            href={site.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
        </nav>

        <a
          className="header__resume header__resume--desktop"
          href={site.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Resume
        </a>

        <button
          type="button"
          className={`header__menu ${menuOpen ? 'header__menu--open' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
