/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { Card, LoadingSimple, PopUp, SelectBox, TextArea, TextBox } from "../../../../components/Box.tsx";
import type { Item } from "../../../../components/ComponentsTypes.ts";
import { del, get, post, put } from "../../../../config/api.ts";
import type { LibrosCover } from "../../../../services/ServicesTypes.ts";
import { useConfirm, useError } from "../../../../services/useAuth.tsx";
import type { ResponseCategorias } from "../../../User/Catalogo/Components/SearchFilter.tsx";
import "../../../User/Catalogo/Components/TaskCard.css";
import type { CardLibroNuevoProps, CardLibroProps } from "./ComponentsTypes.ts";

export function CardLibroAdmin({ data, classname, onClick, onDelete, CoverWidth, CoverHeigth }: CardLibroProps) {
  const { showError } = useError();
  const { showConfirm } = useConfirm();

  const borrar = (id_libro: number) => {
    showConfirm(
      "¿Estás seguro de que deseas eliminar este libro? Esta acción no se puede deshacer.",
      async () => {
        try {
          const response = await del("libros", id_libro);

          await onDelete(id_libro);

          showError({
            success: true,
            message: response?.message || "Libro eliminado correctamente.",
          });

        } catch (error: any) {
          console.error("Error al eliminar:", error);
          showError({
            success: false,
            message: error?.response?.data?.detail || "No se pudo eliminar el libro.",
          });
        }
      }
    );
  };

  return (
    <Card
      classname={classname}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        padding: "0",
        cursor: "pointer",
        transition: "transform 0.25s ease",
        backgroundColor: "transparent",
        border: "none",
      }}
      onClick={onClick}
      width={"180px"}
    >
      <div className="book-cover-container">

        <BookCover
          width={CoverWidth}
          heigth={CoverHeigth}
          portada_url={data.portada_url}
          titulo={data.titulo}
        />

        <div
          className={"cart-button"}
        >
          <i
            className="bi bi-trash"
            onClick={(event) => {
              event.stopPropagation();
              borrar(data.id);
            }}
          />
        </div>

      </div>

      <div className="book-info">
        <h2 style={{ fontSize: "1.6rem" }}>
          ${data.precio}
        </h2>

        <h3>{data.titulo}</h3>

        <p>{data.autor}</p>
      </div>
    </Card >
  );
}

export function CardLibroDetalleAdmin({ data, onClick, onDelete, CoverWidth, CoverHeigth }: CardLibroProps) {
  const [formLibro, setFormLibro] = useState<any[]>([]);
  const [formLibroIzq, setFormLibroIzq] = useState<any[]>([]);
  const [formTextArea, setFormTextArea] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [erroresLibro, setErroresLibro] = useState(false);
  const [erroresIzq, setErroresIzq] = useState(false);
  const [erroresSinopsis, setErroresSinopsis] = useState(false);
  const hayErrores = erroresLibro || erroresIzq || erroresSinopsis;
  const { showError } = useError();
  const { showConfirm } = useConfirm();

  const borrar = (id_libro: number) => {
    showConfirm(
      "¿Estás seguro de que deseas eliminar este libro? Esta acción no se puede deshacer.",
      async () => {
        setLoading(true);

        try {
          const response = await del("libros", id_libro);

          onClick();
          await onDelete(id_libro);

          showError({
            success: true,
            message: response?.message || "Libro eliminado correctamente.",
          });

        } catch (error: any) {
          console.error("Error al eliminar:", error);
          showError({
            success: false,
            message: error?.response?.data?.detail || "No se pudo eliminar el libro.",
          });
        } finally {
          setLoading(false);
        }
      }
    );
  };

  const actualizarCampo = (setter: React.Dispatch<React.SetStateAction<any[]>>, campo: string, valor: string) => {
    setter(prev =>
      prev.map(item =>
        item.key === campo
          ? { ...item, value: valor }
          : item
      )
    );
  };

  const Inicializar = () => {
    const fecha = data.fecha instanceof Date
      ? `${data.fecha.getFullYear()}-${String(data.fecha.getMonth() + 1).padStart(2, "0")}-${String(data.fecha.getDate()).padStart(2, "0")}`
      : String(data.fecha ?? "").slice(0, 10);

    setFormLibro([
      {
        key: "titulo",
        label: "Título",
        value: data.titulo,
        type: "text",
        onValueChange: (v: string) =>
          actualizarCampo(setFormLibro, "titulo", v),
      },
      {
        key: "autor",
        label: "Autor",
        value: data.autor,
        type: "text",
        onValueChange: (v: string) =>
          actualizarCampo(setFormLibro, "autor", v),
      },
      {
        key: "portada_url",
        label: "Portada URL",
        value: data.portada_url,
        type: "text",
        onValueChange: (v: string) =>
          actualizarCampo(setFormLibro, "portada_url", v),
      },
      {
        key: "fecha_publicacion",
        label: "Fecha de publicación",
        value: fecha,
        type: "date",
        onValueChange: (v: string) =>
          actualizarCampo(setFormLibro, "fecha_publicacion", v),
      },
    ]);

    setFormLibroIzq([
      {
        key: "precio",
        label: "Precio",
        value: String(data.precio),
        type: "number",
        onValueChange: (v: string) =>
          actualizarCampo(setFormLibroIzq, "precio", v),
      },
      {
        key: "stock",
        label: "Stock",
        value: String(data.stock),
        type: "number",
        onValueChange: (v: string) =>
          actualizarCampo(setFormLibroIzq, "stock", v),
      },
    ]);

    setFormTextArea([
      {
        key: "sinopsis",
        label: "Sinopsis",
        value: data.sinopsis ?? "",
        type: "textarea",
        onValueChange: (v: string) =>
          actualizarCampo(setFormTextArea, "sinopsis", v),
      },
    ]);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    Inicializar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const guardarCambios = async () => {
    if (hayErrores) return;

    setLoading(true);

    try {
      const datosLibro = Object.fromEntries([
        ...formLibro,
        ...formLibroIzq,
        ...formTextArea,
      ].map(item => [item.key, item.value]));

      const libroActualizado = {
        id_book: data.id,
        ...datosLibro,
        precio: Number(datosLibro.precio),
        stock: Number(datosLibro.stock),
      };

      await put("libros", libroActualizado);

      showError({
        success: true,
        message: "Libro actualizado correctamente.",
      });

    } catch (error: any) {
      console.log("Error al actualizar el libro: ", error);
      showError({
        success: false,
        message: "No se pudo actualizar el libro."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PopUp titulo={data.titulo} onClose={onClick}>
      <div className="data-book">
        <BookCover
          width={CoverWidth}
          heigth={CoverHeigth}
          portada_url={data.portada_url}
          titulo={data.titulo}
        />

        <TextBox
          resetKey={null}
          items={formLibroIzq}
          onErrorChange={setErroresIzq}
          fontSize="1rem"
        />

        <Col
          xs={9}
          style={{
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <button
            className="botones-admin"
            onClick={guardarCambios}
            disabled={loading || hayErrores}
          >
            Guardar Cambios
          </button>
          <button
            className="botones-admin"
            onClick={() => borrar(data.id)}
            disabled={loading || hayErrores}
          >
            Eliminar Libro
          </button>
        </Col>
      </div>

      <div className="book-info">
        <TextBox
          resetKey={null}
          items={formLibro}
          onErrorChange={setErroresLibro}
          fontSize="1rem"
        />
        <TextArea
          resetKey={null}
          items={formTextArea}
          onErrorChange={setErroresSinopsis}
          fontSize="1rem"
        />
      </div>

      {loading && <LoadingSimple />}

    </PopUp>
  );
}


export function CardNuevoLibroAdmin({ onClick, cargarDatos, CoverWidth, CoverHeigth, }: CardLibroNuevoProps & { cargarDatos: () => Promise<void> }) {
  const [loading, setLoading] = useState(false);
  const [formLibro, setFormLibro] = useState<any[]>([]);
  const [formLibroIzq, setFormLibroIzq] = useState<any[]>([]);
  const [formTextArea, setFormTextArea] = useState<any[]>([]);
  const [erroresLibro, setErroresLibro] = useState(true);
  const [erroresIzq, setErroresIzq] = useState(true);
  const [erroresSinopsis, setErroresSinopsis] = useState(true);
  const [categoria, setCategoria] = useState(1);
  const [categorias, setCategorias] = useState<Item[]>([]);
  const hayErrores = erroresLibro || erroresIzq || erroresSinopsis;
  const portadaActual = formLibro.find(
    item => item.key === "portada_url"
  )?.value || "";

  const cargarCategorias = async () => {
    const response = await get("categorias", undefined);

    setCategorias([
      ...response.map((x: ResponseCategorias) => ({
        value: x.id_categoria,
        label: x.nombre_categoria_es
      })),
    ]);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    cargarCategorias();
  }, []);

  const { showError } = useError();

  const actualizarCampo = (setter: React.Dispatch<React.SetStateAction<any[]>>, campo: string, valor: string) => {
    setter(prev =>
      prev.map(item =>
        item.key === campo
          ? { ...item, value: valor }
          : item
      )
    );
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormLibro([
      {
        key: "titulo",
        label: "Título",
        value: "",
        type: "text",
        onValueChange: (v: string) =>
          actualizarCampo(setFormLibro, "titulo", v),
      },
      {
        key: "autor",
        label: "Autor",
        value: "",
        type: "text",
        onValueChange: (v: string) =>
          actualizarCampo(setFormLibro, "autor", v),
      },
      {
        key: "portada_url",
        label: "Portada URL",
        value: "",
        type: "text",
        onValueChange: (v: string) =>
          actualizarCampo(setFormLibro, "portada_url", v),
      },
      {
        key: "fecha_publicacion",
        label: "Fecha de publicación",
        value: "",
        type: "date",
        onValueChange: (v: string) =>
          actualizarCampo(setFormLibro, "fecha_publicacion", v),
      },
    ]);

    setFormLibroIzq([
      {
        key: "precio",
        label: "Precio",
        value: "0",
        type: "number",
        onValueChange: (v: string) =>
          actualizarCampo(setFormLibroIzq, "precio", v),
      },
      {
        key: "stock",
        label: "Stock",
        value: "0",
        type: "number",
        onValueChange: (v: string) =>
          actualizarCampo(setFormLibroIzq, "stock", v),
      },
    ]);

    setFormTextArea([
      {
        key: "sinopsis",
        label: "Sinopsis",
        value: "",
        type: "textarea",
        onValueChange: (v: string) =>
          actualizarCampo(setFormTextArea, "sinopsis", v),
      },
    ]);


  }, []);

  const agregarLibro = async () => {
    if (hayErrores) return;

    const datosLibro = Object.fromEntries([
      ...formLibro,
      ...formLibroIzq,
      ...formTextArea,
    ].map(item => [item.key, item.value]));

    if (!datosLibro.titulo?.trim()) {
      showError({
        success: false,
        message: "El título es obligatorio.",
      });
      return;
    }

    setLoading(true);

    try {
      const libroNuevo = {
        ...datosLibro,
        id_categoria: categoria,
        precio: Number(datosLibro.precio),
        stock: Number(datosLibro.stock),
        status: Number(datosLibro.stock) > 0 ? "Disponible" : "Agotado",
      };

      await post("libros", libroNuevo);

      showError({
        success: true,
        message: "Libro agregado correctamente.",
      });

      await cargarDatos();
      onClick();

    } catch (error: any) {
      console.error("Error al agregar el libro:", error);

      showError({
        success: false,
        message: error?.response?.data?.detail || "No se pudo agregar el libro.",
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <PopUp titulo="Nuevo libro" onClose={onClick}>

      <div className="data-book">

        <BookCover
          width={CoverWidth}
          heigth={CoverHeigth}
          portada_url={portadaActual}
          titulo="Nuevo libro"
        />

        <TextBox
          resetKey={null}
          items={formLibroIzq}
          onErrorChange={setErroresIzq}
          fontSize="1rem"
        />

        <Col
          style={{
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
          }}
        >

          <SelectBox
            item="Categoría"
            dataSource={categorias}
            onValueChange={(v) => setCategoria(Number(v))}
            fontSize={"1.3rem"}
          />

          <button
            className="botones-admin"
            onClick={agregarLibro}
            disabled={loading || hayErrores}
          >
            Agregar libro
          </button>

        </Col>
      </div>

      <div className="book-info">

        <TextBox
          resetKey={null}
          items={formLibro}
          onErrorChange={setErroresLibro}
          fontSize="1rem"
        />

        <TextArea
          resetKey={null}
          items={formTextArea}
          onErrorChange={setErroresSinopsis}
          fontSize="1rem"
        />

      </div>

      {loading && <LoadingSimple />}

    </PopUp>
  );
}

export function BookCover(data: LibrosCover) {
  const [loading, setLoading] = useState(true);
  return (
    <Card
      style={{
        position: "relative",
        padding: 0,
        gap: 0,
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        minHeight: "11rem",
        overflow: "hidden",
        borderRadius: "0.4rem",
        backgroundColor: "var(--color-blanco)",
      }}
      width={data.width}
      height={data.heigth}
    >
      {loading && <LoadingSimple />}

      <img
        src={data.portada_url}
        alt={`Portada de ${data.titulo}`}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
        className={loading ? "imagen-cargando" : ""}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          objectFit: "cover",
          display: "block",
          borderRadius: "0.4rem",
          transition: "opacity 0.2s ease",
        }}
        width="100%"
        height="100%"
      />
    </Card>
  );
}