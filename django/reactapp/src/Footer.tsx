import './css/footer.css';

function Footer() {
  return (
    <footer id="footer">
      <div className="cs-container">
        <div className="cs-top">
          <ul className="cs-ul">
            <li className="cs-li">
              <a href="/home" className="cs-link">Home</a>
            </li>
            <li className="cs-li">
              <a href="/courses" className="cs-link">Classes</a>
            </li>
          </ul>
        </div>
        <div className="cs-bottom">
          <ul className="cs-social">
            <li className="cs-social-li">
              <a href="https://www.facebook.com/rippleeffects2024/" className="cs-social-link" aria-label="facebook" target="_blank" rel="noopener">
                <img className="cs-social-icon cs-default"
                  src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons/facebook-white.svg" alt="icon" loading="lazy"
                  decoding="async" width="12" height="12" aria-hidden="true" />
              </a>
            </li>
            <li className="cs-social-li">
              <a href="https://www.instagram.com/_ref_2024/#" className="cs-social-link" aria-label="instagram" target="_blank" rel="noopener">
                <img className="cs-social-icon cs-default"
                  src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons/instagram-transparent.svg" alt="icon"
                  loading="lazy" decoding="async" width="12" height="12" aria-hidden="true" />
              </a>
            </li>
          </ul>
          <span className="cs-copyright">
            &copy; Copyright {new Date().getFullYear()} - <a href="#" className="cs-copyright-link">Ripple Effects Foundation</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;