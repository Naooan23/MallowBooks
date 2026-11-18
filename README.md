# Mallow Books - Plataforma Web de Comercio Electrónico de Libros

![CI Pipeline](https://github.com/naooan1936/mallow-books/actions/workflows/ci.yml/badge.svg)
![TecNM](https://img.shields.io/badge/TecNM-Programaci%C3%B3n%20Web-blue)
![Stack](https://img.shields.io/badge/Stack-React%20%7C%20FastAPI%20%7C%20PostgreSQL-green)
![Docker](https://img.shields.io/badge/Docker-Compose%20Ready-blue)

Proyecto Integrador de la asignatura **Programación Web (AEB-1055)** - Semestre Agosto-Diciembre 2026.  
**Docente:** Dr. Roberto Contreras.

---

## Descripción del Problema
Mallow Books resuelve la necesidad de una plataforma moderna, ágil y segura para la comercialización, gestión de inventario y pedidos de libros, brindando una experiencia personalizada a lectores y herramientas administrativas a librerías independientes.

---

## Integrantes y Roles

| Integrante | Rol Principal | Responsabilidad |
| :--- | :--- | :--- |
| **Naomi** | Full Stack & DevOps | Backend FastAPI, diseño del esquema PostgreSQL, autenticación JWT/Bcrypt, contenedores Docker y CI |
| **Equipo Mallow Books** | Front End | Interfaz interactiva en React + TypeScript, componentes modulares, gestión de estado y consumo de APIs |

---

## Despliegue en la Nube
- **URL Pública del Frontend:** *(Por desplegar en Vercel)*
- **URL Pública del Backend:** *(Por desplegar en Render / Railway)*
- **Base de Datos:** PostgreSQL en Neon Cloud

---

## Tecnologías y Arquitectura

```
[ Navegador Cliente (React + Vite) ]
                |  (HTTP/REST - JSON + JWT)
                v
       [ FastAPI (Python 3.11) ]  <---> [ API Externa: OpenLibrary ]
                |  (SQLAlchemy ORM)
                v
    [ PostgreSQL (Base de Datos) ]
```

- **Frontend:** React 19, TypeScript, Vite, React Router DOM, Bootstrap Icons, Context API.
- **Backend:** Python 3.11, FastAPI, Pydantic v2, SQLAlchemy ORM, Uvicorn, Passlib (Bcrypt), Python-Jose (JWT).
- **Base de Datos:** PostgreSQL 15 con relaciones 1:N y N:M (`Libros`, `Usuarios`, `Categoria`, `Orden`, `Carrito`, `Detalleorden`, `Detallecarrito`).
- **DevOps:** Docker, Docker Compose, GitHub Actions (CI).

---

## Ejecución Rápida con Docker Compose (Plan B Local)

Para levantar todo el sistema (Base de Datos + Backend API + Frontend Web) en un solo comando:

```bash
# 1. Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>
cd "Mallow Books"

# 2. Configurar variables de entorno
cp .env.example .env

# 3. Levantar los 3 servicios con Docker Compose
docker compose -f infra/docker-compose.yml up --build -d
```

### Servicios Disponibles:
- **Frontend Web:** [http://localhost:80](http://localhost:80)
- **Backend API (Swagger Docs):** [http://localhost:8000/docs](http://localhost:8000/docs)
- **PostgreSQL:** `localhost:5432` (Base de datos: `mallow_books`)

---

## Usuarios de Prueba para la Demo

| Rol | Correo Electrónico | Contraseña | Permisos |
| :--- | :--- | :--- | :--- |
| **Administrador** | `admin@mallowbooks.com` | `admin123` | Control total del catálogo, usuarios, métricas e inventario |
| **Empleado** | `empleado@mallowbooks.com` | `empleado123` | Gestión de órdenes y actualización de estados |
| **Cliente / Usuario** | `usuario@mallowbooks.com` | `user123` | Exploración de catálogo, carrito y compras |

---

## Pruebas Automatizadas (Pytest)

```bash
# Ejecutar la suite de pruebas del backend
pytest Server/tests/
```

---

## Documentación Adicional
- **Declaración de IA:** [`AI_USAGE.md`](file:///c:/Git/Mallow%20Books/AI_USAGE.md)
- **Autoevaluación de Rúbrica:** [`docs/AUTOEVALUACION.md`](file:///c:/Git/Mallow%20Books/docs/AUTOEVALUACION.md)
