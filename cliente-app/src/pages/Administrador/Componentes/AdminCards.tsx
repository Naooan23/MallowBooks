import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Card } from "../../../components/Box";
import { estados } from "../../User/OrdenesCompra/SideBarOrden";
import "./AdminCards.css";
import type { ActividadTiendaProps, InventarioBajoProps, LegendProps, LibrosMasVendidosProps, PedidosRecientesProps, VerTodoButtonProps } from "./ComponentesTypes";

const LibrosMasVendidosCard = ({ totalVentas, librosMasVendidos, categorias }: LibrosMasVendidosProps) => {
  const maxVentas = Math.max(
    ...librosMasVendidos.map((x) => x.vendidos),
    1
  );

  const totalCategorias = categorias.reduce(
    (acc, curr) => acc + curr.cantidad,
    0
  );

  const mitad = Math.ceil(categorias.length / 2);

  const categoriasIzquierda = categorias.slice(0, mitad);
  const categoriasDerecha = categorias.slice(mitad);


  return (
    <Card style={{ padding: "2rem", paddingTop: "1rem", paddingBottom: "1rem" }}>
      <div className="actividad-header">
        <div className="actividad-titulo">
          <i className="bi bi-bag" />
          <h5>Análisis de ventas</h5>
        </div>
      </div>

      <div className="analisis-content">
        <Col className="analisis-libros" xs={4}>
          <h6>Libros más vendidos</h6>

          {librosMasVendidos.map((libro) => (
            <div key={libro.titulo} className="libro-item">
              <span className="title-libros">{libro.titulo}</span>

              <div className="barra-container">
                <div
                  className="barra"
                  style={{ width: `${(libro.vendidos / maxVentas) * 100}%` }}
                />
              </div>

              <span className="cantidad">{libro.vendidos}</span>
            </div>
          ))}
        </Col>

        <div className="separador" />

        <Col>
          <h6>Ingresos por pedidos</h6>

          <Row className="grafico-info">
            <Col xs={4}>
              <div className="grafico-circular">
                <div className="grafico-centro">
                  <strong>
                    $
                    {totalVentas.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                  </strong>
                  <span>MXN</span>
                </div>
              </div>
            </Col>

            <Col className="leyenda" style={{ padding: "0px" }}>
              {categoriasIzquierda.map((categoria, index) => (
                <LegendCategorias
                  key={categoria.nombre}
                  categoria={categoria}
                  index={index}
                  totalCategorias={totalCategorias}
                />
              ))}
            </Col>

            <Col className="leyenda" style={{ padding: "0px" }}>
              {categoriasDerecha.map((categoria, index) => (
                <LegendCategorias
                  key={categoria.nombre}
                  categoria={categoria}
                  index={index + categoriasIzquierda.length}
                  totalCategorias={totalCategorias}
                />
              ))}
            </Col>
          </Row>
        </Col>
      </div>
    </Card>
  );
}

const LegendCategorias = ({ categoria, index, totalCategorias }: LegendProps) => {
  return (
    <Row
      key={categoria.nombre}
      className="leyenda-item"
    >
      <Col xs={1} style={{ padding: "0px" }}>
        <span className={`color color-${index % 5}`} />
      </Col>

      <Col xs={6} style={{ padding: "0px" }}>
        <span>{categoria.nombre}</span>
      </Col>

      <Col xs={2} className="text-end" style={{ padding: "0px" }}>
        <small>
          {(
            (categoria.cantidad / totalCategorias) *
            100
          ).toFixed(0)}
          %
        </small>
      </Col>
    </Row>
  );
}

const ActividadTiendaCard = ({ pendientes, completados, cancelados }: ActividadTiendaProps) => {
  return (
    <Card height="stretch" style={{ padding: "2rem", paddingTop: "1rem", paddingBottom: "1rem" }}>
      <div className="actividad-header">
        <div className="actividad-titulo">
          <i className="bi bi-shop" />
          <h5>Actividad de la tienda</h5>
        </div>
      </div>

      <div className="actividad-body">
        <div className="actividad-item">
          <div className="actividad-info">
            <i className="bi bi-cart actividad-pendiente" />
            <span>Pedidos pendientes</span>
          </div>

          <div className="actividad-badge badge-pendiente">
            {pendientes}
          </div>
        </div>

        <div className="actividad-item">
          <div className="actividad-info">
            <i className="bi bi-check-circle-fill actividad-completado" />
            <span>Pedidos completados</span>
          </div>

          <div className="actividad-badge badge-completado">
            {completados}
          </div>
        </div>

        <div className="actividad-item">
          <div className="actividad-info">
            <i className="bi bi-x-circle-fill actividad-cancelado" />
            <span>Pedidos cancelados</span>
          </div>

          <div className="actividad-badge badge-cancelado">
            {cancelados}
          </div>
        </div>
      </div>
    </Card>
  );
};

const InventarioBajoCard = ({ data }: InventarioBajoProps) => {
  return (
    <Card classname="pedidos-recientes-card" style={{ padding: "2rem", paddingTop: "1rem", paddingBottom: "1rem" }}>
      <div className="actividad-header">
        <div className="actividad-titulo">
          <i className="bi bi-bell" />
          <h5>Notificaciones de inventario</h5>
        </div>

        <VerTodoButton page="/admin-catalogo" />
      </div>

      <div className="card-body">
        {data.map((libro) => (
          <div
            key={libro.titulo}
            className="inventario-item"
          >
            <div className="inventario-accent" />

            <img
              src={libro.portada_url}
              alt={libro.titulo}
              className="inventario-portada"
            />

            <div className="inventario-info">
              <span className="inventario-titulo">
                {libro.titulo}
              </span>

              <small>
                Stock bajo ({libro.cantidad} disponibles)
              </small>
            </div>

            <small className="inventario-stock">
              {libro.cantidad}
            </small>
          </div>
        ))}
      </div>
    </Card>
  );
};

const UltimosPedidos = ({ data }: PedidosRecientesProps) => {
  return (
    <Card
      classname="pedidos-recientes-card"
    >
      <div className="actividad-header">
        <div className="actividad-titulo">
          <i className="bi bi-cart" />
          <h5>Pedidos recientes</h5>
        </div>

        <VerTodoButton page={"/admin-ordenes"} />
      </div>


      <div className="card-body" style={{ gap: ".75rem" }}>
        {data.map((pedido) => (
          <Row
            key={pedido.num}
            className="pedido-item align-items-center"
          >
            <Col className="pedido-num" style={{ fontWeight: "700" }} xs={1}>#{pedido.num}</Col>

            <Col className="pedido-usuario" xs={5}>{pedido.usuario}</Col>

            <Col className="pedido-fecha" xs={2}>{new Date(pedido.fecha).toLocaleDateString()}</Col>

            <Col className="text-end" xs={3}>
              <span
                className={`orden-estado 
                  ${estados.find((x) => x.value === pedido.status)?.value.toLowerCase() ?? pedido.status.toLowerCase()}
                `}
              >
                {estados.find((x) => x.value === pedido.status)?.label ?? pedido.status}
              </span>
            </Col>
          </Row>
        ))}
      </div>
    </Card>
  );
};

const VerTodoButton = ({ page }: VerTodoButtonProps) => {
  const navigate = useNavigate();

  return (
    <button className="inventario-btn" onClick={() => { navigate(page) }}>
      Ver todo
      <i className="bi bi-arrow-right-circle" />
    </button>
  )
}

export { ActividadTiendaCard, InventarioBajoCard, LibrosMasVendidosCard, UltimosPedidos };

