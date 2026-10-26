import { useState, useEffect } from "react";
import Logo from "./Logo_t.png";
import "./MainPage.css";
import { Footer } from "../../components/Footer";
import { get } from "../../config/api";
import { Navbar } from "./NavBar";

interface UserProfile {
  name: string;
  email: string;
  role: string;
}
interface Categoria {
  id: number;
  value: number;
  label: string;
  icon: string;
}

interface ResponseCategorias {
  id_categoria: number;
  nombre_categoria_es: string;
  icono: string;
}
// Encima del componente, junto a los otros tipos
interface LibroMini {
  id: number;
  portada_url: string;
  titulo: string;
  autor: string;
  precio: number;
}

interface LibroAPI {
  id_book: number;
  portada_url: string;
  titulo: string;
  autor: string;
  precio: number;
}

export function MainPage() {
  // Categorías del backend (misma lógica que SearchFilter)
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loadingCategorias, setLoadingCategorias] = useState(true);

  // Mini catálogo
  const [librosMini, setLibrosMini] = useState<LibroMini[]>([]);
  const [loadingLibros, setLoadingLibros] = useState(true);

  useEffect(() => {
    let mounted = true;
    const cargarLibros = async () => {
      try {
        const response = (await get("libros", null)) as LibroAPI[];
        if (!mounted) return;

        // Toma los primeros 5 (o filtra con stock > 0 si quieres)
        const primeros5 = response.slice(0, 5).map((x) => ({
          id: x.id_book,
          portada_url: x.portada_url,
          titulo: x.titulo,
          autor: x.autor,
          precio: x.precio,
        }));

        setLibrosMini(primeros5);
      } finally {
        if (mounted) setLoadingLibros(false);
      }
    };
    const cargarCategorias = async () => {
      try {
        const response: ResponseCategorias[] = await get("categorias", null);
        if (!mounted) return;

        setCategorias([
          ...response.map((x) => ({
            id: x.id_categoria,
            value: x.id_categoria,
            label: x.nombre_categoria_es,
            icon: x.icono,
          })),
        ]);
      } finally {
        if (mounted) setLoadingCategorias(false);
      }
    };

    cargarLibros();
    cargarCategorias();
    return () => {
      mounted = false;
    };
  }, []);

  const navigateTo = (sectionId: string) => {
    //setMobileMenuOpen(false);

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

  return (
    <>
      <Navbar />

      {/* Contenido de ejemplo */}
      <main id="inicio" className="mallow-main">
        <section className="mallow-hero">
          <span className="hero-label">TU PRÓXIMA HISTORIA COMIENZA AQUÍ</span>

          <h1>
            Un mundo de historias,
            <br />
            <span>esperando por ti.</span>
          </h1>

          <p>
            Explora nuestro catálogo, descubre nuevos autores y encuentra tu
            próxima lectura favorita.
          </p>
        </section>

        <section id="catalogo" className="mini-catalog">
          <div className="mini-catalog-header">
            <span className="section-label">NUESTRO CATÁLOGO</span>
            <h2>Libros que te pueden gustar</h2>
            <p>Una pequeña muestra de lo que encontrarás en Mallow Books.</p>
          </div>

          {loadingLibros ? (
            <p className="mini-catalog-status">Cargando libros…</p>
          ) : librosMini.length === 0 ? (
            <p className="mini-catalog-status">
              Aún no hay libros disponibles.
            </p>
          ) : (
            <>
              <div className="mini-catalog-grid">
                {librosMini.map((libro) => (
                  <div key={libro.id} className="mini-book-card">
                    <div className="mini-book-cover">
                      <img
                        src={libro.portada_url}
                        alt={`Portada de ${libro.titulo}`}
                        loading="lazy"
                      />
                    </div>

                    <div className="mini-book-info">
                      <h3 title={libro.titulo}>{libro.titulo}</h3>
                      <p>{libro.autor}</p>
                      <span className="mini-book-price">
                        ${libro.precio}
                        <small> MXN</small>
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mini-catalog-cta">
                <button
                  className="hero-button"
                  onClick={() => navigateTo("login")}
                >
                  Ver catálogo completo <span>→</span>
                </button>
              </div>
            </>
          )}
        </section>

        <section id="categorias" className="mallow-categories">
          <div className="categories-header">
            <span className="section-label">CATEGORÍAS</span>
            <h2>Explora por categorías</h2>
            <p>Encuentra libros según tus intereses.</p>
          </div>

          {loadingCategorias ? (
            <p className="categories-status">Cargando categorías…</p>
          ) : (
            <div className="categories-grid">
              {categorias.map((cat) => (
                <button key={cat.id} className={`category-card`}>
                  <span className="category-icon">
                    <i className={cat.icon} />
                  </span>
                  <span className="category-label">{cat.label}</span>
                </button>
              ))}
            </div>
          )}
        </section>

        <section id="sobre-nosotros" className="about-section">
          <div className="about-text">
            <span className="section-label">SOBRE NOSOTROS</span>
            <h2>Sobre Mallow Books</h2>

            <p>
              En Mallow Books creemos que cada libro tiene el poder de abrir
              nuevas puertas, despertar la imaginación y transformar vidas.
              Nacimos como un punto de encuentro para lectores, mentes curiosas
              y amantes de las buenas historias, ofreciendo un catálogo diverso
              y cuidadosamente seleccionado para todos los gustos y edades.
            </p>

            <p>
              Nuestro compromiso es brindar una experiencia cercana y ágil,
              combinando la calidez de la librería tradicional con la
              practicidad de herramientas digitales modernas. Queremos que
              explorar nuestro catálogo, encontrar tu próxima lectura o
              gestionar tus pedidos sea un proceso sencillo, cómodo y
              disfrutable.
            </p>
          </div>

          <div className="about-image">
            <img
              src={Logo}
              alt="Logo de Mallow Books"
              className="mallow-logo-about"
            />
          </div>
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
