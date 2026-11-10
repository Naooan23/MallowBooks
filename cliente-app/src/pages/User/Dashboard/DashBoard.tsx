import { useEffect, useState } from "react";
import { Card } from "../../../components/Box";
import { get } from "../../../config/api";
import type { Libros } from "../../../services/ServicesTypes";
import { useAuth } from "../../../services/useAuth";
import { OrdenDocumento } from "../Carrito/Components/OrdenCompra";
import type { OrdenCompraState } from "../Carrito/Types";
import type { LibroAPI } from "../Catalogo/Catalogo";
import { CardLibroDetalle } from "../Catalogo/Components/TaskCard";
import "./Dashboard.css";
import RecomendacionesCarrusel from "./DashBoardComponents";

export default function DashBoard() {
  const [detalleCard, setDetalleCard] = useState<Libros | null>(null);
  const [data, setData] = useState<Libros[]>([]);
  const [ordenCompra, setOrdenCompra] = useState<OrdenCompraState | null>(null);
  const { user } = useAuth();

  const getUltimaOrden = async () => {
    const response = await get("ultOrden", user?.id_user)

    setOrdenCompra(response)
  }

  const getRecomendaciones = async () => {
    const response = (await get("sistRecomendaciones", user?.id_user)) as LibroAPI[];
    setData(
      response.map((x: LibroAPI): Libros => ({
        id: x.id_book,
        id_categoria: x.id_categoria,
        portada_url: x.portada_url,
        titulo: x.titulo,
        autor: x.autor,
        fecha: x.fecha_publicacion != null ? new Date(x.fecha_publicacion) : new Date(),
        sinopsis: x.sinopsis,
        precio: x.precio,
        stock: x.stock,
        cantidad: 0,
      }))
    );
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getRecomendaciones();
    getUltimaOrden();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-grid">
        <div className="dashboard-right-column">
          <div className="notices-row">

            {/* Tarjeta de Avisos */}
            <Card>
              <div className="notice-header-title">
                <div className="icon">
                  <i className="bi bi-info-circle" style={{ fontSize: "1.5rem" }} />
                </div>
                <h3>¡AVISOS IMPORTANTE!</h3>
              </div>
              <h4 className="notice-subtitle">PAGA EN TIENDA FÍSICA</h4>
              <p className="notice-text">
                Recuerda que para completar tu órden, debes pagar y recoger tus libros en la sucursal elegida.
              </p>

            </Card>
          </div>

          <Card width={"100%"}>
            <RecomendacionesCarrusel
              data={data}
              onSelectLibro={(libro) => setDetalleCard(libro)}
            />

            {detalleCard !== null && (
              <CardLibroDetalle
                data={detalleCard}
                onClick={() => setDetalleCard(null)}
                CoverHeigth="17rem"
                CoverWidth="11rem"
              />
            )}
          </Card>
        </div>

        {ordenCompra && (
          <OrdenDocumento
            orden={ordenCompra.orden}
            fecha={ordenCompra.fecha}
            cliente={ordenCompra.cliente}
            email={ordenCompra.email}
            libros={ordenCompra.libros}
            width="40rem"
            scrollbar={true}
          />
        )}

      </div>
    </div>
  );
}