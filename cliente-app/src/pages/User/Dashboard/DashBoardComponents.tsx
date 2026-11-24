import { useState, useEffect, type ReactNode } from "react";
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

function Carrusel<T>({ titulo, data, renderItem, itemsPorPagina }: CarruselProps<T>) {
  const [pagina, setPagina] = useState(0);
  
  // 👇 ESTADO PARA CALCULAR CUÁNTOS ELEMENTOS CABEN
  const [itemsPerPage, setItemsPerPage] = useState(itemsPorPagina || 3);

  useEffect(() => {
    // Función que calcula cuántos libros caben según el ancho de la pantalla
    const calcularItems = () => {
      if (itemsPorPagina) return; // Si se pasa por prop, lo respetamos
      
      const anchoPantalla = window.innerWidth;
      // 200px aprox por tarjeta + márgenes
      if (anchoPantalla < 600) setItemsPerPage(1);       // Celular
      else if (anchoPantalla < 900) setItemsPerPage(2);  // Tablet
      else if (anchoPantalla < 1200) setItemsPerPage(3); // Laptop
      else setItemsPerPage(4);                           // PC Grande
    };

    calcularItems();
    window.addEventListener("resize", calcularItems);
    return () => window.removeEventListener("resize", calcularItems);
  }, [itemsPorPagina]);

  const totalPaginas = Math.ceil(data.length / itemsPerPage);

  const elementosPagina = data.slice(
    pagina * itemsPerPage,
    (pagina + 1) * itemsPerPage
  );

  const cambiarPagina = (direccion: "left" | "right") => {
    setPagina((actual) => {
      if (direccion === "left") return Math.max(0, actual - 1);
      return Math.min(totalPaginas - 1, actual + 1);
    });
  };

  // Si cambia la cantidad de items, reseteamos la página para evitar bugs
  useEffect(() => {
    setPagina(0);
  }, [itemsPerPage]);

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <h3 className="section-title mb-3">{titulo}</h3>

      <div style={{ display: "flex", alignItems: "center", width: "100%", gap: "0.5rem" }}>
        <button
          type="button"
          onClick={() => cambiarPagina("left")}
          disabled={pagina === 0}
          className="btn-icon"
        >
          ◀
        </button>

        <div className="recomendaciones-container" style={{ flex: 1 }}>
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

      <div className="text-center mt-2" style={{ color: "var(--color-gris)", fontSize: "0.9rem" }}>
        {totalPaginas > 0 ? `${pagina + 1} / ${totalPaginas}` : "0 / 0"}
      </div>
    </div>
  );
}