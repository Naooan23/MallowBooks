import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import type { SearchFilterProps } from "../../../../components/menu/SideBar/TypesSideBar";
import { get } from "../../../../config/api";
import "./SearchFilter.css";

export interface Categorias {
  id: number,
  value: string,
  label: string,
  icon: string,
}

export interface ResponseCategorias {
  id_categoria: number,
  nombre_categoria_es: string,
  icono: string,
}

const SearchFilter = ({ search, setSearch, filter, setFilter }: SearchFilterProps) => {
  const [categorias, setCategorias] = useState<Categorias[]>();

  const cargarCategorias = async () => {
    const response = await get("categorias", undefined);

    setCategorias([
      { id: 0, value: 0, label: "Todas", icon: "bi bi-bookmark-star" },
      ...response.map((x: ResponseCategorias) => ({
        id: x.id_categoria,
        value: x.id_categoria,
        label: x.nombre_categoria_es,
        icon: x.icono,
      })),
    ]);
  };

  useEffect(() => {

    // eslint-disable-next-line react-hooks/set-state-in-effect
    cargarCategorias();
  }, []);

  return (
    <>
      <div className="search-box">
        <span>🔍</span>

        {search != null && setSearch != null && (
          <input
            type="text"
            placeholder="Buscar libros..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        )}
      </div>

      <div className="categories-container">

        <Col className="filter-group-label" xs={2}>
          <label>Categorías:</label>
        </Col>

        <div className="filter-group">
          <div className="filter-buttons">
            {filter != null && setFilter != null && (categorias?.map((x) => (
              <button
                key={x.id}
                style={{
                  display: "flex", alignItems: "center"
                }}
                className={`filter-btn ${filter === x.id ? "active" : ""}`}
                onClick={() => setFilter(x.id)}
              >
                <Col xs={3}>
                  <i className={x.icon} style={{ height: "2rem" }} />
                </Col>
                <Col xs={9} style={{ textAlign: "left" }}>
                  <span>{x.label}</span>
                </Col>
              </button>
            )))}
          </div>
        </div>

      </div>

    </>
  );
};

export default SearchFilter;