import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { DashboardCard } from "../../components/Tarjetas/DashboardCards";
import { get } from "../../config/api";
import "../User/OrdenesCompra/OrdenesCompra.css";
import { ActividadTiendaCard, InventarioBajoCard, LibrosMasVendidosCard, UltimosPedidos } from "./Componentes/AdminCards";
import type { ActividadTiendaProps, InventarioBajoItem, LibrosMasVendidosProps, PedidoReciente } from "./Componentes/ComponentesTypes";

export function AdminPage() {
  const [dashboardCards, setDashboardCards] = useState<DashboardCard[]>([]);
  const [librosMasVendidos, setLibrosMasVendidos] =
    useState<LibrosMasVendidosProps>({
      totalVentas: 0,
      librosMasVendidos: [],
      categorias: [],
    });
  const [actividadTienda, setActividadTienda] = useState<ActividadTiendaProps>({
    pendientes: 0,
    completados: 0,
    cancelados: 0,
  })
  const [inventarioBajo, setInventarioBajo] = useState<InventarioBajoItem[]>([]);
  const [ultimosPedidos, setUltimosPedidos] = useState<PedidoReciente[]>([]);

  const getCardsInfo = async () => {
    const response = await get("dashboardCardsInfo", undefined);

    setDashboardCards([
      {
        label: "Clientes registrados",
        value: response.totalUsuarios,
        icon: "bi bi-people",
      },
      {
        label: "Pedidos realizados",
        value: response.totalPedidos,
        icon: "bi bi-bag",
        style: "pedidos",
      },
      {
        label: "Libros en catalogo",
        value: response.totalLibros,
        icon: "bi bi-book",
        style: "libros",
      },
      {
        label: "Colaboradores registrados",
        value: response.totalempleados,
        icon: "bi bi-person-workspace",
        style: "colaboradores",
      },
    ])
  }

  const getLibrosVendidos = async () => {
    const response = await get("libros+", undefined);
    setLibrosMasVendidos(response);
  }

  const getActividadTienda = async () => {
    const response = await get("ActividadTienda", undefined);
    setActividadTienda(response);
  }

  const getInventarioBajo = async () => {
    const response = await get("InventarioBajo", undefined);
    setInventarioBajo(response);
  }

  const getUltimosPedidos = async () => {
    const response = await get("PedidosRecientes", undefined);
    setUltimosPedidos(response);
  }
  console.log(ultimosPedidos);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getCardsInfo();
    getLibrosVendidos();
    getActividadTienda();
    getInventarioBajo();
    getUltimosPedidos();
  }, []);

  return (
    <div className="pagina-ordenes">
      <DashboardCard data={dashboardCards} />

      <Row style={{ display: "flex" }}>
        <div style={{ width: "70%" }}>
          <LibrosMasVendidosCard
            totalVentas={librosMasVendidos?.totalVentas ?? 0}
            librosMasVendidos={librosMasVendidos?.librosMasVendidos ?? []}
            categorias={librosMasVendidos?.categorias ?? []}
          />
        </div>
        <div style={{ width: "30%" }}>
          <ActividadTiendaCard
            pendientes={actividadTienda.pendientes}
            completados={actividadTienda.completados}
            cancelados={actividadTienda.cancelados}
          />
        </div>
      </Row>

      <Row style={{ display: "flex" }}>
        <div style={{ width: "50%" }}>
          <InventarioBajoCard data={inventarioBajo} />
        </div>
        <div style={{ width: "50%" }}>
          <UltimosPedidos data={ultimosPedidos} />
        </div>
      </Row>
    </div>
  );
}