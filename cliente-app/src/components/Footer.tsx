
import Logo from "../pages/MainPage/Logo_t.png";
import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="mallow-footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Columna 1: Logo y descripción */}
          <div className="footer-brand-column">
            <div className="footer-brand">
              <div className="footer-logo-container">
                <img
                  src={Logo}
                  alt="Logo de Mallow Books"
                  className="footer-logo"
                />
              </div>

              <div className="footer-brand-text">
                <span className="footer-brand-name">Mallow Books</span>
                <span className="footer-brand-subtitle">
                  Librería &amp; Biblioteca Digital
                </span>
              </div>
            </div>

            <p className="footer-description">
              Librería independiente dedicada a cultivar el amor por la lectura
              mediante un catálogo selecto, control digital de inventarios y
              servicios de consulta para el público general.
            </p>

            <div className="footer-project">
              <p className="footer-project-label">Proyecto institucional:</p>
              <p className="footer-project-name">
                Sistema Integrado para la Optimización del Control de
                Inventarios, Prestación de Servicios Bibliotecarios y
                Automatización de Procesos de Préstamos en Entornos de librerias.
              </p>
            </div>
          </div>



          {/* Columna 2: Contacto */}
          <div className="footer-column">
            <h3 className="footer-heading">Contacto</h3>

            <div className="footer-contact">
              <div className="footer-contact-item">
                <span className="footer-icon" aria-hidden="true">⌖</span>
                <p>
                  Librería Central, Sucursal 1
                  <span className="footer-contact-note">
                    [Ubicación provisional]
                  </span>
                </p>
              </div>

              <div className="footer-contact-item">
                <span className="footer-icon" aria-hidden="true">✉</span>
                <p>
                  contacto@mallowbooks.com
                  <span className="footer-contact-note">
                    [Correo provisional]
                  </span>
                </p>
              </div>

              <div className="footer-contact-item">
                <span className="footer-icon" aria-hidden="true">☎</span>
                <p>
                  +52 (55) 0000-0000
                  <span className="footer-contact-note">
                    [Teléfono provisional]
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="footer-bottom">
          <p>© 2026 Mallow Books. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
