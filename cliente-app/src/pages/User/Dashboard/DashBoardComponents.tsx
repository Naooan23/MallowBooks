import { useState, type ReactNode } from "react";
import type { Libros } from "../../../services/ServicesTypes";
import { CardLibro } from "../Catalogo/Components/TaskCard";

interface RecomendacionesCarruselProps {
  data: Libros[];
  onSelectLibro: (libro: Libros) => void;
}

interface CarruselProps<T> {
  titulo: string;
  data: T[];
  itemsPorPagina?: number;
  renderItem: (item: T) => ReactNode;
}

export default function RecomendacionesCarrusel({ data, onSelectLibro }: RecomendacionesCarruselProps) {
  return (
    <Carrusel
      titulo="Recomendaciones para Ti"
      data={data}
      renderItem={(libro) => (
        <CardLibro
          key={libro.id}
          classname="card-movement"
          data={libro}
          onClick={() => onSelectLibro(libro)}
          CoverWidth="9rem"
          CoverHeigth="15rem"
        />
      )}
    />
  );
}

function Carrusel<T>({ titulo, data, renderItem, itemsPorPagina = Math.max(1, Math.floor((window.innerWidth - (40 * 16)) / 200)) }: CarruselProps<T>) {
  const [pagina, setPagina] = useState(0);

  const totalPaginas = Math.ceil(data.length / itemsPorPagina);

  const elementosPagina = data.slice(
    pagina * itemsPorPagina,
    (pagina + 1) * itemsPorPagina
  );

  const cambiarPagina = (direccion: "left" | "right") => {
    setPagina((actual) => {
      if (direccion === "left") {
        return Math.max(0, actual - 1);
      }

      return Math.min(totalPaginas - 1, actual + 1);
    });
  };

  return (
    <>
      <h3 className="section-title mb-3">{titulo}</h3>

      <div className="d-flex align-items-center justify-content-center">
        <button
          type="button"
          onClick={() => cambiarPagina("left")}
          disabled={pagina === 0}
          className="btn-icon"
        >
          ◀
        </button>

        <div className="recomendaciones-container">
          {elementosPagina.map(renderItem)}
        </div>

        <button
          type="button"
          onClick={() => cambiarPagina("right")}
          disabled={pagina >= totalPaginas - 1}
          className="btn-icon"
        >
          ▶
        </button>
      </div>

      <div className="text-center mt-2">
        {totalPaginas > 0 ? `${pagina + 1} / ${totalPaginas}` : "0 / 0"}
      </div>
    </>
  );
}