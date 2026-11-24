import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
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

      {/* 👇 PRIMERA FILA: Análisis y Actividad 👇 */}
      <Row className="mb-4">
        {/* En celular ocupa 12 (100%), en PC ocupa 8 (aprox 70%) */}
        <Col xs={12} lg={8} className="mb-3 mb-lg-0">
          <LibrosMasVendidosCard
            totalVentas={librosMasVendidos?.totalVentas ?? 0}
            librosMasVendidos={librosMasVendidos?.librosMasVendidos ?? []}
            categorias={librosMasVendidos?.categorias ?? []}
          />
        </Col>

        {/* En celular ocupa 12 (100%), en PC ocupa 4 (aprox 30%) */}
        <Col xs={12} lg={4}>
          <ActividadTiendaCard
            pendientes={actividadTienda.pendientes}
            completados={actividadTienda.completados}
            cancelados={actividadTienda.cancelados}
          />
        </Col>
      </Row>

      {/* 👇 SEGUNDA FILA: Inventario y Pedidos 👇 */}
      <Row>
        {/* En celular ocupa 12 (100%), en PC ocupa 6 (50%) */}
        <Col xs={12} md={6} className="mb-3 mb-md-0">
          <InventarioBajoCard data={inventarioBajo} />
        </Col>

        <Col xs={12} md={6}>
          <UltimosPedidos data={ultimosPedidos} />
        </Col>
      </Row>
    </div>
  );
}