import { useState } from "react";
import Logo from "../../pages/MainPage/Logo_t.png";
import "./MainPage.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

interface UserProfile {
  name: string;
  email: string;
  role: string;
}

interface NavbarProps {
  currentUser?: UserProfile | null;
}

export function Navbar({ currentUser = null }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigateTo = (sectionId: string) => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);

    if (sectionId === "login") {
      navigate("/login");
      return;
    }

    if (sectionId === "register") {
      navigate("/register");
      return;
    }

    // Si estamos en otra página, ir al inicio
    // y guardar la sección de destino.
    if (location.pathname !== "/") {
      navigate("/", {
        state: { sectionId },
      });
      return;
    }

    // Si ya estamos en MainPage, desplazarnos directamente.
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  useEffect(() => {
    if (location.pathname !== "/") return;

    const sectionId = location.state?.sectionId;

    if (!sectionId) return;

    // Esperar a que se renderice la página de inicio.
    requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Limpiar el destino para evitar repetir el desplazamiento.
      navigate("/", {
        replace: true,
        state: null,
      });
    });
  }, [location.pathname, location.state, navigate]);

  return (
    <header className="mallow-header">
      <div className="mallow-announcement">
        <span className="announcement-dot" />
        <span>
          Librería física y catálogo digital · Genera tu orden online y paga al
          retirar en mostrador
        </span>
      </div>

      <div className="mallow-navbar">
        <button
          className="mallow-brand"
          onClick={() => navigateTo("inicio")}
          aria-label="Ir al inicio"
        >
          <img src={Logo} alt="Logo de Mallow Books" className="mallow-logo" />

          <span className="mallow-brand-text">
            <strong>Mallow Books</strong>
            <small>LIBRERÍA &amp; BIBLIOTECA</small>
          </span>
        </button>

        <nav className="mallow-nav-links">
          <button onClick={() => navigateTo("inicio")}>Inicio</button>

          <button onClick={() => navigateTo("catalogo")}>Catálogo</button>

          <button onClick={() => navigateTo("categorias")}>Categorías</button>

          <button onClick={() => navigateTo("sobre-nosotros")}>
            Sobre nosotros
          </button>
        </nav>

        <div className="mallow-actions">
          <div className="mallow-auth">
            {currentUser ? (
              <div className="user-menu-container">
                <button
                  className="user-menu-trigger"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  aria-expanded={userMenuOpen}
                >
                  <span className="user-avatar">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </span>

                  <span>{currentUser.name}</span>
                  <span>⌄</span>
                </button>

                {userMenuOpen && (
                  <div className="user-dropdown">
                    <strong>{currentUser.name}</strong>
                    <small>{currentUser.email}</small>

                    <span className="user-role">{currentUser.role}</span>

                    <button onClick={() => navigateTo("catalogo")}>
                      Mis préstamos y órdenes
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <a href="/login" className="login-link">
                Iniciar sesión
              </a>
              
            )}
          </div>

          <button
            className="mobile-menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="mobile-navigation">
          <button onClick={() => navigateTo("inicio")}>Inicio</button>

          <button onClick={() => navigateTo("catalogo")}>Catálogo</button>

          <button onClick={() => navigateTo("categorias")}>Categorías</button>

          <button onClick={() => navigateTo("sobre-nosotros")}>
            Sobre nosotros
          </button>

          <div className="mobile-auth">
            {currentUser ? (
              <>
                <strong>{currentUser.name}</strong>
                <small>{currentUser.email}</small>
              </>
            ) : (
              <a href="/login">Iniciar sesión</a>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
