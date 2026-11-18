import type { Dispatch, SetStateAction } from "react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Loading } from "../../components/Box";
import { DashboardCard } from "../../components/Tarjetas/DashboardCards";
import { get, put } from "../../config/api";
import { OrdenCompra, OrdenResumen } from "../User/Carrito/Components/OrdenCompra";
import type { OrdenCompraState } from "../User/Carrito/Types";

interface SearchFilterContext {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}

const ESTADOS_ORDEN = ["Pendiente", "Pagado", "Cancelado"];

export function EmpleadoPage() {
  const [ordenes, setOrdenes] = useState<OrdenCompraState[]>([]);
  const [ordenSeleccionada, setOrdenSeleccionada] = useState<OrdenCompraState | null>(null);
  const [cargando, setCargando] = useState(true);
  const [actualizandoEstado, setActualizandoEstado] = useState<number | null>(null);
  const [dashboardCards, setDashboardCards] = useState<DashboardCard[]>([]);

  const { search, filter: filtroOriginal } = useOutletContext<SearchFilterContext>();
  const filter = typeof filtroOriginal === "string" ? filtroOriginal : "Todas";
  const navigate = useNavigate();

  const estadisticas = () => {
    const total = ordenes.length;
    const pendientes = ordenes.filter(o => o.orden.status === "Pendiente").length;
    const ventas = ordenes.reduce((acc, curr) => acc + Number(curr.totalPrecio || 0), 0);

    setDashboardCards([
      {
        label: "Total Órdenes",
        value: total.toString(),
        icon: "bi bi-receipt",
      },
      {
        label: "Pendientes",
        value: pendientes.toString(),
        icon: "bi bi-clock-history",
        style: "warning",
      },
      {
        label: "Ventas Totales",
        value: ventas.toFixed(2),
        icon: "bi bi-currency-dollar",
        style: "success",
      },
    ])
  };

  const ordenesRecientes = useMemo(() => {
    const busqueda = String(search ?? "").trim().toLowerCase();
    const estadoSeleccionado = String(filter ?? "Todas");

    const filtradas = ordenes.filter((item) => {
      const orden = item.orden;
      const estadoOrden = String(orden.status ?? "").toLowerCase();
      const coincideEstado = estadoSeleccionado.toLowerCase() === "todas" || estadoOrden === estadoSeleccionado.toLowerCase();
      const coincideBusqueda = !busqueda || String(orden.id_orden ?? "").toLowerCase().includes(busqueda) || item.libros?.some((libro) => String(libro.titulo ?? "").toLowerCase().includes(busqueda) || String(libro.autor ?? "").toLowerCase().includes(busqueda));

      return coincideEstado && coincideBusqueda;
    });

    return filtradas.slice(0, 5);
  }, [ordenes, search, filter]);

  const getTodasLasOrdenes = async () => {
    try {
      setCargando(true);
      const listaOrdenes = await get("ordenes/todas", undefined);
      setOrdenes(listaOrdenes ?? []);
    } catch (error) {
      console.error("Error al obtener las órdenes:", error);
      setOrdenes([]);
    } finally {
      setCargando(false);
    }
  };

  const handleCambiarEstado = async (id_orden: number, nuevoEstado: string) => {
    setActualizandoEstado(id_orden);
    try {
      await put(`ordenes/${id_orden}/status`, { status: nuevoEstado });

      setOrdenes((prevOrdenes) =>
        prevOrdenes.map((item) =>
          item.orden.id_orden === id_orden
            ? { ...item, orden: { ...item.orden, status: nuevoEstado } }
            : item
        )
      );

      if (ordenSeleccionada?.orden.id_orden === id_orden) {
        setOrdenSeleccionada((prev) =>
          prev ? { ...prev, orden: { ...prev.orden, status: nuevoEstado } } : null
        );
      }
    } catch (error) {
      console.error("Error al cambiar el estado:", error);
      alert("No se pudo actualizar el estado de la orden.");
    } finally {
      setActualizandoEstado(null);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getTodasLasOrdenes();
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    estadisticas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ordenes]);

  return (
    <div className="pagina-ordenes">
      <DashboardCard data={dashboardCards} />

      <header className="ordenes-header" style={{ marginTop: "2rem" }}>
        <div>
          <h2>Últimas 5 Órdenes</h2>
          <p>Los pedidos más recientes de todos los clientes.</p>
        </div>

        <button className="btn-ver-todas" onClick={() => navigate("/ordenes-empleado")}>
          Ver todas las órdenes <i className="bi bi-arrow-right" />
        </button>
      </header>

      {cargando ? (
        <Loading />
      ) : ordenesRecientes.length > 0 ? (
        <div className="ordenes-grid">
          {ordenesRecientes.map((item) => (
            <div key={item.orden.id_orden} className="ordenes-empleado-card">

              <div className="estado-selector-container">
                <label>Estado:</label>
                <select
                  value={item.orden.status}
                  onChange={(e) => handleCambiarEstado(item.orden.id_orden, e.target.value)}
                  disabled={actualizandoEstado === item.orden.id_orden}
                  className={`estado-select ${item.orden.status?.toLowerCase()}`}
                >
                  {ESTADOS_ORDEN.map((estado) => (
                    <option key={estado} value={estado}>{estado}</option>
                  ))}
                </select>
                {actualizandoEstado === item.orden.id_orden && <span className="saving-text">Guardando...</span>}
              </div>

              <div
                className="orden-resumen-click"
                onClick={() => setOrdenSeleccionada(item)}
                role="button"
                tabIndex={0}
              >
                {item.totalArticulo != null && item.totalPrecio != null && (
                  <OrdenResumen
                    orden={item.orden}
                    fecha={item.fecha}
                    totalArticulo={item.totalArticulo}
                    totalPrecio={item.totalPrecio}
                    width="100%"
                    heigth="16rem"
                    scrollbar={false}
                  />
                )}
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="ordenes-vacio">
          <i className="bi bi-receipt-cutoff" />
          <h3>No hay órdenes recientes</h3>
          <p>No se encontraron compras que coincidan con la búsqueda.</p>
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