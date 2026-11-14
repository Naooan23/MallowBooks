import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef, useState } from "react";
import { Card, Loading, PopUp } from "../../../../components/Box";
import { estados } from "../../OrdenesCompra/SideBarOrden";
import type { OrdenCompraDoc, OrdenCompraProps, OrdenCompraResumen } from "../Types";
import "./OrdenCompra.css";

export function OrdenCompra({ orden, libros, cliente, email, fecha, onClose, width, height }: OrdenCompraProps) {
  const documentoRef = useRef<HTMLDivElement>(null);
  const [exportando, setExportando] = useState(false);

  const capturarDocumento = async () => {
    const documento = documentoRef.current;

    if (!documento) throw new Error("No se encontró el documento.");

    await document.fonts.ready;

    const imagenes = Array.from(documento.querySelectorAll("img"));

    await Promise.all(
      imagenes.map(async (img) => {
        if (!img.complete) {
          await new Promise<void>((resolve) => {
            img.onload = () => resolve();
            img.onerror = () => resolve();
          });
        }

        if (img.decode) await img.decode().catch(() => { });
      })
    );

    return await html2canvas(documento, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
      allowTaint: false,
      logging: false,
      width: documento.scrollWidth,
      height: documento.scrollHeight,
      windowWidth: documento.scrollWidth,
      windowHeight: documento.scrollHeight,
      scrollX: 0,
      scrollY: 0,
    });
  };

  const descargarImagen = async () => {
    try {
      setExportando(true);

      const canvas = await capturarDocumento();
      const imagen = canvas.toDataURL("image/png");

      const enlace = document.createElement("a");
      enlace.download = `MallowBooks-Orden-${orden.id_orden}.png`;
      enlace.href = imagen;

      document.body.appendChild(enlace);
      enlace.click();
      enlace.remove();
    } catch (error) {
      console.error("Error al generar la imagen:", error);
      alert("No se pudo guardar la imagen.");
    } finally {
      setExportando(false);
    }
  };

  const descargarPDF = async () => {
    try {
      setExportando(true);

      const canvas = await capturarDocumento();
      const imagen = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      const margen = 12;
      const anchoPagina = pdf.internal.pageSize.getWidth();
      const altoPagina = pdf.internal.pageSize.getHeight();

      const ancho = anchoPagina - margen * 2;
      const altoDisponible = altoPagina - margen * 2;

      const altoImagen = (canvas.height * ancho) / canvas.width;

      let posicion = 0;

      while (posicion < altoImagen) {
        if (posicion > 0) {
          pdf.addPage();
        }

        pdf.addImage(imagen, "PNG", margen, margen - posicion, ancho, altoImagen);

        posicion += altoDisponible;
      }

      pdf.save(`MallowBooks-Orden-${orden.id_orden}.pdf`);
    } catch (error) {
      console.error("Error al generar el PDF:", error);
      alert("No se pudo generar el PDF.");
    } finally {
      setExportando(false);
    }
  };

  return (
    <PopUp titulo={`Orden de Compra #${orden.id_orden}`} onClose={onClose} width={width} height={height}>
      <div className="Orden-Compra" style={{ height: `90%` }}>
        <div className="orden-acciones no-print">
          <button
            type="button"
            onClick={descargarImagen}
            disabled={exportando}
          >
            <i className="bi bi-image" /> Guardar imagen
          </button>

          <button
            type="button"
            onClick={descargarPDF}
            disabled={exportando}
          >
            <i className="bi bi-file-earmark-pdf" /> Descargar PDF
          </button>
        </div>

        <div className="orden-documento-exportar">
          {documentoRef != null && (
            <OrdenDocumento
              documentoRef={documentoRef}
              orden={orden}
              fecha={fecha}
              cliente={cliente}
              email={email}
              libros={libros}
              scrollbar={false}
            />
          )}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "1rem",
            textAlign: "right",
            justifyContent: "center",
          }}
        >
          <button type="button" className="orden-listo" onClick={onClose}>
            Listo
          </button>
        </div>

        {exportando && <Loading />}
      </div>
    </PopUp>
  );
}

export function OrdenDocumento({ orden, fecha, cliente, email, libros, heigth, width, scrollbar }: OrdenCompraDoc) {
  return (
    <Card
      width={width}
      height={heigth ?? "100%"}
      style={{
        overflowY: scrollbar ? "auto" : "hidden",
      }}
    >
      <header className="orden-encabezado">
        <div>
          <p className="orden-marca">Mallow Books</p>
          <p className="orden-eslogan">A little world between pages</p>
        </div>

        <div className="orden-folio">
          <span>ORDEN DE COMPRA</span>
          <strong>#{orden.id_orden}</strong>
          <small>Fecha: {fecha}</small>
        </div>
      </header>

      <div className="orden-aviso">ORDEN DE COMPRA — NO ES COMPROBANTE DE PAGO</div>

      <section className="orden-cliente">
        <h3>Información del cliente</h3>
        <p><strong>Nombre:</strong> {cliente}</p>
        <p><strong>Correo:</strong> {email}</p>
        <p>
          <strong>Estado:</strong>{" "}
          <span className="orden-estado">{orden.status}</span>
        </p>
      </section>

      <h3 className="orden-titulo-detalle">Detalle de la orden</h3>

      <table className="orden-tabla">
        <thead>
          <tr>
            <th>Libro</th>
            <th>Precio</th>
            <th>Cant.</th>
            <th>Importe</th>
          </tr>
        </thead>
        <tbody>
          {libros.map((libro) => (
            <tr key={libro.id_book}>
              <td>
                <strong>{libro.titulo}</strong>
                <small>{libro.autor}</small>
              </td>
              <td>${libro.precio.toFixed(2)}</td>
              <td>{libro.cantidad}</td>
              <td>${libro.subtotal.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="orden-total">
        <span>
          Total de artículos:{" "}
          {libros.reduce((total, libro) => total + libro.cantidad, 0)}
        </span>
        <div>
          <small>TOTAL DE LA ORDEN</small>
          <strong>
            ${orden.total.toLocaleString("es-MX", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </strong>
        </div>
      </div>

      <section className="orden-pago">
        <h3>¿Cómo completar tu compra?</h3>
        <p>
          Presenta esta orden en la tienda física para continuar con el
          proceso de pago. El importe indicado corresponde al total
          registrado de los artículos solicitados.
        </p>
        <p>
          Esta orden acredita el registro de la solicitud de compra, pero no
          acredita que el pago haya sido realizado.
        </p>
      </section>

      <footer className="orden-pie">
        <p>Gracias por elegir Mallow Books ♡</p>
        <small>
          Conserva este documento y presenta el folio al acudir a la tienda.
        </small>
      </footer>
    </Card >
  );
}

export function OrdenResumen({ orden, fecha, totalArticulo, totalPrecio, heigth, width, scrollbar }: OrdenCompraResumen) {
  return (
    <Card
      width={width}
      height={heigth}
      style={{ overflowY: scrollbar ? "auto" : "hidden" }}
    >
      <div className="orden-folio" style={{ width: "100%" }}>
        <span>ORDEN DE COMPRA</span>
        <strong>#{orden.id_orden}</strong>
        <small>Fecha: {fecha}</small>
        <span
          className={`orden-estado 
          ${estados.find(x => x.value === orden.status)?.value.toLowerCase() ?? orden.status.toLowerCase()}`}
        >
          {estados.find(x => x.value === orden.status)?.label ?? orden.status}
        </span>
      </div>

      <div className="orden-total orden-total-resumen">
        <span>
          Total de artículos:{" "}
          {totalArticulo}
        </span>
        <div>
          <small>TOTAL DE LA ORDEN</small>
          <strong>
            <strong>
              ${totalPrecio.toLocaleString("es-MX", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </strong>
          </strong>
        </div>
      </div>
    </Card >
  );
}