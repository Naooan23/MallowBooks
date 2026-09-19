import random
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry
import sys
import os

sys.path.append(
    os.path.abspath(
        os.path.join(os.path.dirname(__file__), "..")
    )
)

from database import SessionLocal
from models import Libros, Categoria
from CargarLibrosDTO import CategoriaDTO

CANTIDAD_LIBROS = 100


def obtener_categorias(db):
    categorias = db.query(Categoria).all()

    categoriasLista = [
        CategoriaDTO(
            id=c.id_categoria,
            nombre=c.nombre_categoria
        )
        for c in categorias
    ]

    return categoriasLista


def obtener_libros_openlibrary(categoria):
    url = "https://openlibrary.org/search.json"

    params = {
        "subject": categoria,
        "limit": 10
    }

    session = requests.Session()

    retries = Retry(
        total=5,                # reintentos
        backoff_factor=1,       # espera exponencial
        status_forcelist=[429, 500, 502, 503, 504],
        allowed_methods=["GET"]
    )

    session.mount("https://", HTTPAdapter(max_retries=retries))

    response = session.get(url, params=params, timeout=30, verify=False)
    response.raise_for_status()

    return response.json().get("docs", [])


def generar_datos():
    disponible = random.choice([True, True, True, False])

    if disponible:
        status = "Disponible"
        stock = random.randint(5, 100)
    else:
        status = "Agotado"
        stock = 0

    precio = round(random.uniform(150, 900), 2)

    return status, stock, precio


def obtener_sinopsis(work_id):
    url = f"https://openlibrary.org{work_id}.json"

    session = requests.Session()

    retries = Retry(
        total=5,
        backoff_factor=1,
        status_forcelist=[429, 500, 502, 503, 504],
        allowed_methods=["GET"]
    )

    session.mount("https://", HTTPAdapter(max_retries=retries))

    response = session.get(
        url,
        timeout=30,
        verify=False,
        proxies={"http": None, "https": None},
        headers={"Connection": "close"}  # fuerza IPv4
    )

    response.raise_for_status()
    data = response.json()

    desc = data.get("description")
    if isinstance(desc, dict):
        return desc.get("value")
    return desc


def cargar_libros():
    db = SessionLocal()

    try:
        categorias = obtener_categorias(db)

        libros_insertados = 0
        libros_vistos = set()

        for c in categorias:

            if libros_insertados >= CANTIDAD_LIBROS:
                break

            print(f"\nBuscando libros de categoría: {c.nombre}")

            libros = obtener_libros_openlibrary(c.nombre)

            for libro in libros:

                if libros_insertados >= CANTIDAD_LIBROS:
                    break

                titulo = libro.get("title")

                if not titulo:
                    continue

                if titulo.lower() in libros_vistos:
                    continue

                libros_vistos.add(titulo.lower())

                autores = libro.get("author_name", [])
                autor = autores[0] if autores else None

                portada = libro.get("cover_i")

                if portada:
                    portada_url = (
                        f"https://covers.openlibrary.org/b/id/"
                        f"{portada}-L.jpg"
                    )
                else:
                    portada_url = None

                anio = libro.get("first_publish_year")

                sinopsis = obtener_sinopsis(libro.get("key"))

                status, stock, precio = generar_datos()

                nuevo_libro = Libros(
                    id_categoria=c.id,
                    titulo=titulo[:200],
                    autor=autor[:100] if autor else None,
                    sinopsis=sinopsis,
                    portada_url=portada_url,
                    fecha_publicacion=(
                        f"{anio}-01-01" if anio else None
                    ),
                    status=status,
                    precio=precio,
                    stock=stock
                )

                db.add(nuevo_libro)

                libros_insertados += 1

                print(
                    f"{libros_insertados}/{CANTIDAD_LIBROS} "
                    f"- {titulo}"
                )

        db.commit()
        print(f"\nSe insertaron {libros_insertados} libros.")

    except Exception as error:
        db.rollback()
        print(f"Error: {error}")

    finally:
        db.close()


if __name__ == "__main__":
    cargar_libros()