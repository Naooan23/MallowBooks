
import React from "react";
import "./Footer.css";
import Logo from "../pages/MainPage/Logo_t.png";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenPrivacy: () => void;
  onOpenFaq: () => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenPrivacy,
  onOpenFaq,
  onOpenContact,
}) => {
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
              servicios de consulta para estudiantes, docentes y el público
              general.
            </p>

            <div className="footer-project">
              <p className="footer-project-label">Proyecto institucional:</p>
              <p className="footer-project-name">
                Sistema Integrado para la Optimización del Control de
                Inventarios, Prestación de Servicios Bibliotecarios y
                Automatización de Procesos de Préstamos en Entornos Educativos.
              </p>
            </div>
          </div>

          {/* Columna 2: Navegación */}
          <div className="footer-column">
            <h3 className="footer-heading">Navegación</h3>

            <ul className="footer-links">
              <li>
                <button onClick={() => onNavigate("inicio")}>
                  Inicio
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("catalogo")}>
                  Catálogo completo
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("categorias")}>
                  Categorías de lectura
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("sobre-nosotros")}>
                  Sobre nosotros
                </button>
              </li>
            </ul>
          </div>

          {/* Columna 3: Ayuda y legal */}
          <div className="footer-column">
            <h3 className="footer-heading">Ayuda y legal</h3>

            <ul className="footer-links footer-icon-links">
              <li>
                <button onClick={onOpenFaq}>
                  <span className="footer-icon" aria-hidden="true">ⓘ</span>
                  Preguntas frecuentes
                </button>
              </li>
              <li>
                <button onClick={onOpenPrivacy}>
                  <span className="footer-icon" aria-hidden="true">◆</span>
                  Políticas de privacidad
                </button>
              </li>
              <li>
                <button onClick={onOpenContact}>
                  <span className="footer-icon" aria-hidden="true">▤</span>
                  Términos de compra
                </button>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto */}
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
