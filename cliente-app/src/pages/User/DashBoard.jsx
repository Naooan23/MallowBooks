import { useEffect, useState } from "react";
import { get } from "../../config/api";
import { BasePage } from "../BasePage";

export default function DashBoard() {

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {

    const cargarUsuarios = async () => {
      const data = await get("libros");

      //ADD
      // const libro = {
      //   "id_categoria": 5,
      //   "titulo": "Libro1",
      //   "autor": "Libro1",
      //   "sinopsis": "Libro1",
      //   "portada_url": "Libro1",
      //   "fecha_publicacion": "2018-01-01",
      //   "status": "Disponible",
      //   "precio": "279.67",
      //   "stock": 21,
      // }
      // const data = await post("libros", libro); // Update

      //DELETE
      // const data = await del("libros", 105);
      // console.log(data);

      //UPDATE
      // const libro = await get("libros", 96);
      // libro.titulo = "The Cruel Prince";
      // console.log(libro);
      // const data = await put("libros", 96, libro); // Update

      //GET
      // const data = await get("libros", 96);
      setUsuarios(data);
    };

    cargarUsuarios();

  }, []);
  console.log(usuarios);

  return (
    <BasePage>
      <h1>DASHBOARD</h1>
    </BasePage>
  );
}
