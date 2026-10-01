import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Loading } from "../../components/Box";
import { get } from "../../config/api";
import { CardLibro, CardLibroDetalle } from "./Dashboard/Components/TaskCard";

export default function Catalogo() {
  const [loading, setLoading] = useState(false);
  const [libros, setLibros] = useState([]);
  const [detalleCard, setDetalleCard] = useState([]);
  const [detalleCardDisable, setDetalleCardDisable] = useState(true);
  const { search, filter } = useOutletContext();

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

  const cargarDatos = async () => {
    setLoading(true);

    await Promise.all([
      getLibros()
    ]);

    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    cargarDatos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
              onClick={() => {
                setDetalleCard(x);
                setDetalleCardDisable(false);
              }}
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
      {loading && <Loading />}
    </div>
  );
}
