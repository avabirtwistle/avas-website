import { site } from '../data/content';
import './Footer.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__copy">
          © {year} {site.name}
        </p>
        <p className="footer__note">University of Victoria · Software engineering · Computer systems</p>
      </div>
    </footer>
  );
}
