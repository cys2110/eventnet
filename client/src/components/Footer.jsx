import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faSquareXTwitter, faInstagram, faGithub, faLinkedin, faSnapchat } from '@fortawesome/free-brands-svg-icons'

function Footer() {
  return (
    <footer className="footer">
        <div className="footer-company">
          <div className="footer-company-title">Company</div>
          <div className="footer-company-links">
            <Link to='#'>About</Link>
            <Link to='#'>Careers</Link>
            <Link to='#'>Terms</Link>
            <Link to='#'>Privacy</Link>
          </div>
        </div>
        <div className="footer-contact">
          <div className="footer-appname">Venyou</div>
          <div className="footer-social-icons">
            <FontAwesomeIcon icon={faFacebook} />
            <FontAwesomeIcon icon={faSquareXTwitter} />
            <FontAwesomeIcon icon={faInstagram} />
            <FontAwesomeIcon icon={faGithub} />
            <FontAwesomeIcon icon={faLinkedin} />
            <FontAwesomeIcon icon={faSnapchat} />
          </div>
        </div>
        <div className="footer-support">
          <div className="footer-support-title">Support</div>
          <div className="footer-support-links">
            <Link to='#'>FAQs</Link>
            <Link to='#'>Trust and Safety</Link>
            <Link to='#'>Cookie Preferences</Link>
            <Link to='#'>Report Issue</Link>
          </div>
        </div>
    </footer>
  );
}

export default Footer;

