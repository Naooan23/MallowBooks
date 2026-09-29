import { useEffect, useState } from "react";
import { Loading } from "../../../components/Box";
import { get } from "../../../config/api";
import { useAuth } from "../../../services/useAuth";
import SearchFilter from "./Components/SearchFilter";
import { CardLibro, CardLibroDetalle } from "./Components/TaskCard";
import "./DashboardModern.css";

export default function DashBoard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [libros, setLibros] = useState([]);
  const [detalleCard, setDetalleCard] = useState([]);
  const [detalleCardDisable, setDetalleCardDisable] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(0);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Buenos días";
    if (h < 18) return "Buenas tardes";
    return "Buenas noches";
  };

  const cargarCategorias = async () => {
    const response = await get("categorias", null);

    setCategorias([
      { id: 0, value: 0, label: "Todas" },
      ...response.map((x) => ({
        id: x.id_categoria,
        value: x.id_categoria,
        label: x.nombre_categoria_es
      }))
    ]);
  };

  const getLibros = async () => {
    const response = await get("libros", null);

    setLibros(
      response.map((x) => ({
        id: x.id_book,
        id_categoria: x.id_categoria,
        url: x.portada_url,
        titulo: x.titulo,
        autor: x.autor,
        sinopsis: x.sinopsis,
        precio: x.precio,
        stock: x.stock,
      }))
    );
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    cargarCategorias();
    getLibros();
  }, []);

  // vaciarCarrito();

  //   const cargarUsuarios = async () => {
  //     // const data = await get("libros");

  //     //ADD
  //     // const libro = {
  //     //   "id_categoria": 5,
  //     //   "titulo": "Libro1",
  //     //   "autor": "Libro1",
  //     //   "sinopsis": "Libro1",
  //     //   "portada_url": "Libro1",
  //     //   "fecha_publicacion": "2018-01-01",
  //     //   "status": "Disponible",
  //     //   "precio": "279.67",
  //     //   "stock": 21,
  //     // }
  //     // const data = await post("libros", libro); // Update

  //     //DELETE
  //     // const data = await del("libros", 105);
  //     // console.log(data);

  //     //UPDATE
  //     // const libro = await get("libros", 96);
  //     // libro.titulo = "The Cruel Prince";
  //     // console.log(libro);
  //     // const data = await put("libros", libro); // Update

  //     //GET
  //     // const data = await get("libros", 96);
  //   };

  //   cargarUsuarios();

  // }, []);
  useEffect(() => {
    const cargarDatos = async () => {
      setLoading(true);

      await Promise.all([
        cargarCategorias(),
        getLibros()
      ]);

      setLoading(false);
    };

    cargarDatos();
  }, []);

  return (
    <div className="dashboard-modern">
      <main className="main-modern">
        {/* <div className="header-modern">
          <div>
            <h1>{greeting()}, {user?.nombre_usuario} 👋</h1>
            <p>
              {new Date().toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div> */}

        <SearchFilter
          data={categorias}
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
        />

        <div className="books-grid">
          <div className="books-container">
            {libros
              .filter((x) => {
                const coincideCategoria =
                  filter === 0 || x.id_categoria === filter;

                const coincideBusqueda =
                  x.titulo.toLowerCase().includes(search.toLowerCase()) ||
                  x.autor.toLowerCase().includes(search.toLowerCase());

                return coincideCategoria && coincideBusqueda;
              })
              .map((x) => (
                <CardLibro
                  key={x.id}
                  data={x}
                  onClick={() => { setDetalleCard(x); setDetalleCardDisable(false) }}
                />
              ))}
          </div>

          {detalleCard && !detalleCardDisable && (
            <CardLibroDetalle
              data={detalleCard}
              onClose={() => {
                setDetalleCard(null);
                setDetalleCardDisable(true);
              }}
            />
          )}
        </div>
      </main>
      {loading && (<Loading />)}
    </div>
  );
}
