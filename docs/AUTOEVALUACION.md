# Autoevaluación del Proyecto Integrador: Mallow Books

**Materia:** Programación Web (AEB-1055)  
**Semestre:** Agosto - Diciembre 2026  
**Docente:** Dr. Roberto Contreras  
**Equipo:** Mallow Books (Naomi y equipo)  

---

## Tabla de Autoevaluación según la Rúbrica

| # | Criterio | Peso | Nivel autoasignado | % | Puntos | Evidencia (enlace / archivo) |
| :-: | :--- | :-: | :---: | :-: | :-: | :--- |
| **1** | **Planeación y arquitectura** | 6 | Excelente | 100% | 6.0 | `README.md`, diagrama de arquitectura monorepo. |
| **2** | **HTML semántico, CSS y responsividad** | 8 | Excelente | 100% | 8.0 | `Grid.tsx`, `Sidebar.css`, `MenuMovil.tsx`, `MenuDesktop.tsx`. |
| **3** | **Frontend en React** | 14 | Excelente | 100% | 14.0 | `cliente-app/src/`, `CartProvider.tsx`, `CatalogoAdmin.tsx`, `App.tsx` (múltiples rutas, estados de carga y error). |
| **4** | **Backend en FastAPI** | 14 | Excelente | 100% | 14.0 | `Server/main.py` (>15 endpoints REST), `Server/schemas.py`, `/docs` interactivo con Swagger. |
| **5** | **Base de datos y acceso a datos** | 12 | Excelente | 100% | 12.0 | `Server/models.py`, `Consultas POSTGRE/Creacion Tablas.sql`, relaciones 1:N y N:M (`Detalleorden`, `Detallecarrito`). |
| **6** | **Seguridad e interoperabilidad** | 10 | Excelente | 100% | 10.0 | `Server/auth.py` (hash Bcrypt, JWT Bearer tokens), sanitización de contraseñas, `.cargarLibros.py`, consumo OpenLibrary API. |
| **7** | **Contenedores y despliegue** | 10 | Excelente | 100% | 10.0 | `infra/docker-compose.yml`, `Server/Dockerfile`, `cliente-app/Dockerfile` (`docker compose up` levanta todo). |
| **8** | **Calidad y flujo DevOps** | 8 | Excelente | 100% | 8.0 | `Server/tests/test_api.py` (suite de 8 pruebas pytest), `.github/workflows/ci.yml` (pipeline automático de CI). |
| **9** | **Declaración de uso de IA** | 5 | Excelente | 100% | 5.0 | `AI_USAGE.md` con los 7 puntos obligatorios y bitácora de prompts completa. |
| **10** | **Reporte técnico** | 5 | Excelente | 100% | 5.0 | `docs/REPORTE.pdf`, fases de fundamentación, planeación, ejecución y evaluación. |
| **11** | **Demo y defensa individual** | 8 | Excelente | 100% | 8.0 | Preparación para demo en vivo el 26 de noviembre. |
| **Extra** | **Puntos extra** | +5 | Notable | 80% | +4.0 | Consumo de API externa de libros (OpenLibrary) con fallback resiliente. |
| | **TOTAL** | **100** | | | **100 / 100** | |

---

## Reflexión Final del Equipo

- **Criterio que más costó trabajo:** La implementación rigurosa de la seguridad (Criterio 6). Desacoplar la autenticación mediante tokens JWT y asegurar que ningún modelo de SQLAlchemy ni vista de React expusiera las contraseñas requirió una refactorización profunda entre el backend y el cliente.
- **Qué haríamos distinto:** Planificar desde el día uno la arquitectura con Docker Compose y los esquemas Pydantic bien divididos (salida vs entrada) antes de construir las pantallas en React.
- **Nivel en la competencia de la asignatura:** Consideramos haber alcanzado el nivel **Excelente**, ya que el producto integra una aplicación web fullstack modular, con persistencia relacional N:M, seguridad basada en estándares de la industria, pruebas continuas en GitHub Actions y contenedores listos para la nube.
