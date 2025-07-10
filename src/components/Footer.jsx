import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'; // Iconos de redes sociales
import '../css/Footer.css'

export const Footer = () => {
  return (
    <footer id="contactos">
      <div className="footer-contenedor footer-content">
        <div className="contact-us">
          <h2 className="brand">Biblioteca Digital</h2>
          <h2 className="brand-name">Pedro Zulen</h2>
          <p>¡Síguenos en nuestras redes sociales!</p>
          <div className="social-icons">
            <a href="https://www.facebook.com/" className="social-icon">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://twitter.com/" className="social-icon">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://www.instagram.com/" className="social-icon">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>
        <div className="team-members">
          <h3>Equipo de Desarrollo</h3>
          <ul>
            <li>Erick Martin Estrada Briceño</li>
          </ul>
        </div>
      </div>
      <div className="line"></div>
      <p className="rights">© 2024 Biblioteca Digital - Pedro Zulen . Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;
