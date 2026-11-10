import type { Dispatch, SetStateAction } from "react";
import { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Loading } from "../../../components/Box";
import { get } from "../../../config/api";
import { useAuth } from "../../../services/useAuth";
import { OrdenCompra, OrdenResumen } from "../Carrito/Components/OrdenCompra";
import type { OrdenCompraState } from "../Carrito/Types";
import "./OrdenesCompra.css";

interface SearchFilterContext {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}

export function OrdenesCompra() {
  const [ordenes, setOrdenes] = useState<OrdenCompraState[]>([]);
  const [ordenSeleccionada, setOrdenSeleccionada] = useState<OrdenCompraState | null>(null);
  const [cargando, setCargando] = useState(true);
  const { user } = useAuth();
  const { search, filter: filtroOriginal } = useOutletContext<SearchFilterContext>();
  const filter = typeof filtroOriginal === "string" ? filtroOriginal : "Todas";

  const getOrdenes = async () => {
    try {
      setCargando(true);

      if (!user?.id_user) return;

      const listaOrdenes = await get("ordenes", user.id_user);

      setOrdenes(listaOrdenes ?? []);
    } catch (error) {
      console.error("Error al obtener las órdenes:", error);
      setOrdenes([]);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getOrdenes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id_user]);

  const ordenesFiltradas = useMemo(() => {
    const busqueda = String(search ?? "").trim().toLowerCase();

    const estadoSeleccionado = String(filter ?? "Todas");

    return ordenes.filter((item) => {
      const orden = item.orden;

      const estadoOrden = String(orden.status ?? "").toLowerCase();

      const coincideEstado =
        estadoSeleccionado.toLowerCase() === "todas" ||
        estadoOrden === estadoSeleccionado.toLowerCase();

      const coincideBusqueda =
        !busqueda ||
        String(orden.id_orden ?? "").toLowerCase().includes(busqueda) ||
        item.libros?.some((libro) =>
          String(libro.titulo ?? "").toLowerCase().includes(busqueda) ||
          String(libro.autor ?? "").toLowerCase().includes(busqueda)
        );

      return coincideEstado && coincideBusqueda;
    });
  }, [ordenes, search, filter]);

  return (
    <div className="pagina-ordenes">
      <header className="ordenes-header">
        <div>
          <h2>Mis órdenes de compra</h2>
          <p>
            Consulta tus compras y revisa el detalle de cada orden.
          </p>
        </div>

        <span className="ordenes-contador">
          {ordenesFiltradas.length}{" "}
          {ordenesFiltradas.length === 1 ? "orden" : "órdenes"}
        </span>
      </header>

      {cargando ? (
        <Loading />
      ) : ordenesFiltradas.length > 0 ? (
        <div className="ordenes-grid">
          {ordenesFiltradas.map((item) => (
            <div
              key={item.orden.id_orden}
              className="orden-resumen-click"
              style={{ width: "fit-content" }}
              onClick={() => setOrdenSeleccionada(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setOrdenSeleccionada(item);
                }
              }}
            >
              {item.totalArticulo != null &&
                item.totalPrecio != null && (
                  <OrdenResumen
                    orden={item.orden}
                    fecha={item.fecha}
                    totalArticulo={item.totalArticulo}
                    totalPrecio={item.totalPrecio}
                    width="17rem"
                    heigth="16rem"
                    scrollbar={false}
                  />
                )}
            </div>
          ))}
        </div>
      ) : (
        <div className="ordenes-vacio">
          <i className="bi bi-receipt-cutoff" />

          <h3>
            {search || filter !== "Todas"
              ? "No se encontraron órdenes"
              : "Aún no tienes órdenes de compra"}
          </h3>

          <p>
            {search || filter !== "Todas"
              ? "Intenta cambiar los filtros o el término de búsqueda."
              : "Cuando realices una compra, podrás consultar aquí los detalles de tu orden."}
          </p>
        </div>
      )}

      {ordenSeleccionada && (
        <OrdenCompra
          orden={ordenSeleccionada.orden}
          libros={ordenSeleccionada.libros}
          cliente={ordenSeleccionada.cliente}
          email={ordenSeleccionada.email}
          fecha={ordenSeleccionada.fecha}
          onClose={() => setOrdenSeleccionada(null)}
          width="40rem"
          height="40rem"
        />
      )}
    </div>
  );
}