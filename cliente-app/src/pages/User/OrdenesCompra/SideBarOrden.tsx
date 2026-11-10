import type { Dispatch, SetStateAction } from "react";
import "./SearchFilterOrdenes.css";

interface SearchFilterOrdenesProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const estados = [
  { value: "Todas", label: "Todas", icon: "bi bi-receipt" },
  { value: "Pendiente", label: "Pendiente de Pago", icon: "bi bi-clock-history" },
  { value: "Pagado", label: "Pagado", icon: "bi bi-check-circle" },
  { value: "Cancelado", label: "Cancelado", icon: "bi bi-x-circle" },
];

export function SearchFilterOrdenes({ search, setSearch, filter, setFilter }: SearchFilterOrdenesProps) {
  return (
    <>
      <div className="search-box">
        <span>🔍</span>
        <input
          type="text"
          placeholder="Buscar órdenes, libros o autores..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="categories-container">
        <div className="filter-group-label">
          <label>Estado de las órdenes:</label>
        </div>

        <div className="filter-group">
          <div className="filter-buttons">
            {estados.map((estado) => (
              <button
                key={estado.value}
                type="button"
                className={`filter-btn ${filter === estado.value ? "active" : ""
                  }`}
                onClick={() => setFilter(estado.value)}
              >
                <i className={estado.icon} />
                <span>{estado.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}