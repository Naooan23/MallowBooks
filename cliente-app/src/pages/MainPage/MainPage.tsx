
import { useState } from "react";
import Logo from "./Logo_t.png";
import "./MainPage.css";
import { Footer } from "../../components/Footer";

interface UserProfile {
  name: string;
  email: string;
  role: string;
}

export function MainPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Por ahora no hay ningún usuario autenticado.
  // Después puedes conectar esto con tu sistema de login.
  const [currentUser, setCurrentUser] =
    useState<UserProfile | null>(null);

  const [cartCount] = useState(0);

  const navigateTo = (sectionId: string) => {
    setMobileMenuOpen(false);

    if (sectionId === "login") {
      window.location.href = "/login";
      return;
    }

    if (sectionId === "register") {
      window.location.href = "/register";
      return;
    }

    const section = document.getElementById(sectionId);

    section?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const logout = () => {
    setCurrentUser(null);
    setUserMenuOpen(false);
  };

  return (
    <>
      <header className="mallow-header">

        {/* Barra informativa */}
        <div className="mallow-announcement">
          <span className="announcement-dot"></span>
          <span>
            Librería física y catálogo digital ·
            Genera tu orden online y paga al retirar en mostrador
          </span>
        </div>

        {/* Navegación principal */}
        <div className="mallow-navbar">

          {/* Logo */}
          <button
            className="mallow-brand"
            onClick={() => navigateTo("inicio")}
            aria-label="Ir al inicio"
          >
            <img
              src={Logo}
              alt="Logo de Mallow Books"
              className="mallow-logo"
            />

            <span className="mallow-brand-text">
              <strong>Mallow Books</strong>
              <small>LIBRERÍA & BIBLIOTECA</small>
            </span>
          </button>

          {/* Menú de escritorio */}
          <nav className="mallow-nav-links">
            <button onClick={() => navigateTo("inicio")}>
              Inicio
            </button>

            <button onClick={() => navigateTo("catalogo")}>
              Catálogo
            </button>

            <button onClick={() => navigateTo("categorias")}>
              Categorías
            </button>

            <button onClick={() => navigateTo("sobre-nosotros")}>
              Sobre nosotros
            </button>
          </nav>

          {/* Acciones */}
          <div className="mallow-actions">

            <button
              className="mallow-icon-button"
              aria-label="Buscar libros"
              title="Buscar libros"
              onClick={() => navigateTo("buscador")}
            >
              ⌕
            </button>

            {/* <button
              className="mallow-icon-button cart-button"
              aria-label={`Carrito con ${cartCount} artículos`}
              title="Ver orden de compra"
              onClick={() => navigateTo("carrito")}
            >
              ♡
              {cartCount > 0 && (
                <span className="cart-count">
                  {cartCount}
                </span>
              )}
            </button> */}

            {/* Usuario */}
            <div className="mallow-auth">

              {currentUser ? (
                <div className="user-menu-container">

                  <button
                    className="user-menu-trigger"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
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

                      <span className="user-role">
                        {currentUser.role}
                      </span>

                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          navigateTo("catalogo");
                        }}
                      >
                        Mis préstamos y órdenes
                      </button>

                      <button
                        className="logout-button"
                        onClick={logout}
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <a
                    href="/login"
                    className="login-link"
                  >
                    Iniciar sesión
                  </a>

                  <a
                    href="/register"
                    className="register-link"
                  >
                    Registrarse
                  </a>
                </>
              )}

            </div>

            {/* Botón móvil */}
            <button
              className="mobile-menu-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={
                mobileMenuOpen ? "Cerrar menú" : "Abrir menú"
              }
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {mobileMenuOpen && (
          <nav className="mobile-navigation">

            <button onClick={() => navigateTo("inicio")}>
              Inicio
            </button>

            <button onClick={() => navigateTo("catalogo")}>
              Catálogo
            </button>

            <button onClick={() => navigateTo("categorias")}>
              Categorías
            </button>

            <button onClick={() => navigateTo("sobre-nosotros")}>
              Sobre nosotros
            </button>

            <div className="mobile-auth">
              {currentUser ? (
                <>
                  <strong>{currentUser.name}</strong>
                  <small>{currentUser.email}</small>

                  <button onClick={logout}>
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <>
                  <a href="/login">Iniciar sesión</a>
                  <a href="/register">Registrarse</a>
                </>
              )}
            </div>
          </nav>
        )}
      </header>

      {/* Contenido de ejemplo */}
      <main id="inicio" className="mallow-main">
        <section className="mallow-hero">
          <span className="hero-label">
            TU PRÓXIMA HISTORIA COMIENZA AQUÍ
          </span>

          <h1>
            Un mundo de historias,
            <br />
            <span>esperando por ti.</span>
          </h1>

          <p>
            Explora nuestro catálogo, descubre nuevos autores
            y encuentra tu próxima lectura favorita.
          </p>

          <button
            className="hero-button"
            onClick={() => navigateTo("catalogo")}
          >
            Explorar catálogo <span>→</span>
          </button>
        </section>

        <section id="catalogo" className="placeholder-section">
          <h2>Nuestro catálogo</h2>
          <p>Aquí podrás mostrar los libros disponibles.</p>
        </section>

        <section id="categorias" className="placeholder-section">
          <h2>Explora por categorías</h2>
          <p>Encuentra libros según tus intereses.</p>
          
        </section>

        <section
          id="sobre-nosotros"
          className="placeholder-section"
        >
          <h2>Sobre Mallow Books</h2>
          <p>Conoce nuestra librería y nuestros servicios.</p>
        </section>
      </main>
      
      <Footer
        onNavigate={navigateTo}
        onOpenPrivacy={() => {
          console.log("Abrir políticas de privacidad");
        }}
        onOpenFaq={() => {
          console.log("Abrir preguntas frecuentes");
        }}
        onOpenContact={() => {
          console.log("Abrir términos de compra");
        }}
      />
    </>
  );
}
