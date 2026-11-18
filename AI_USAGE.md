# Declaración de Uso de Asistentes de Inteligencia Artificial (AI_USAGE.md)

En cumplimiento con la política de autoría de la ACM y los requerimientos del curso **Programación Web (AEB-1055)** del TecNM.

---

## 1. Herramientas y Modelos Utilizados
- **Herramienta:** Asistente IA Antigravity / Claude Sonnet & Opus.
- **Modo de uso:** Agente de codificación y análisis estático integrado en terminal y editor de código.
- **Integrantes que lo utilizaron:** Naomi y equipo de desarrollo de Mallow Books.

---

## 2. Harness y Modo de Uso
- **Entorno:** Terminal integrada PowerShell y entorno de desarrollo VS Code / Antigravity IDE.
- **Modos empleados:**
  - Inspección y auditoría de código estático (detección de vulnerabilidades OWASP y bugs lógicos en React y FastAPI).
  - Generación de configuraciones de despliegue (`Dockerfile`, `docker-compose.yml`, GitHub Actions).
  - Refactorización de código repetido y corrección de concurrencia y seguridad.

---

## 3. Archivos de Contexto e Instrucciones
- Reglas de proyecto, configuración de TypeScript (`tsconfig.json`), esquemas de base de datos (`Creacion Tablas.sql`).
- Rúbrica oficial y especificación de requerimientos de la materia AEB-1055.

---

## 4. Bitácora de Prompts Significativos

| Fecha | Integrante | Herramienta / Modelo | Prompt | Archivos Afectados | Ajustes Humanos Realizados |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **2026-11-03** | Naomi | Claude Sonnet | "Revvisar la actualizacion del catalogoadmin " | `CatalogoAdmin.tsx`, `TaskCardAdmin.tsx` | Se eliminó la llamada redundante a `getLibros()` y se corrigió la respuesta `{ "success": True }` en FastAPI. |
| **2026-11-15** | Naomi | Claude Opus / Gemini | "Revisar el proyecto y verificar el funcionamiento y limpieza del codigo" | Auditoría completa en Backend, Frontend y CSS | Se detectaron fallas de seguridad (passwords planos) y consultas SQL rotas. |

---

## 5. Marcado en Commits
Los commits que involucraron generación o asistencia por IA incluyen en su mensaje o metadatos la mención de asistencia:
`Assisted-by: Antigravity-AI / Claude Sonnet`

---

## 6. Estimación por Carpeta del Código Asistido por IA

| Carpeta | Porcentaje Estimado | Descripción del Aporte |
| :--- | :---: | :--- |
| **`cliente-app/` (Frontend)** | 25% | Componentes base y estilos creados por el equipo; corrección de hooks, tipos TS y limpieza asistida por IA. |
| **`Server/` (Backend)** | 35% | Endpoints y lógica de negocio creados por el equipo; módulo de autenticación JWT y correcciones de bugs asistidas por IA. |
| **`Consultas POSTGRE/` (BD)** | 10% | Esquema relacional diseñado por el equipo; scripts de migración asistidos. |
| **`infra/` y `.github/` (DevOps)** | 70% | Dockerfiles, Docker Compose y GitHub Actions estructurados con asistencia de IA. |

---

## 7. Reflexión Crítica (Caso Concreto de Vulnerabilidad / Error)

Durante la auditoría del proyecto, la revisión asistida detectó una vulnerabilidad crítica de seguridad catalogada en el **OWASP Top 10 (A01: Broken Access Control y A07: Identification and Authentication Failures)**:
- **El problema:** Las contraseñas de los usuarios se estaban guardando y validando en texto plano (`password == data.password`), además de que el endpoint `GET /usuarios/{id_user}` y la tabla `Grid.tsx` exponían las contraseñas sin cifrar a cualquier cliente sin token. Adicionalmente, el filtro SQL en `main.py` línea 734 comparaba `Orden.status != ["pendiente", "cancelado"]`, lo cual es sintaxis de Python pero genera una consulta SQL inválida que rompía el endpoint del Dashboard en producción.
- **Detección y Aprendizaje:** Comprendimos la importancia de nunca almacenar contraseñas sin un algoritmo de derivación de claves con sal (`bcrypt`), separar los esquemas de entrada de los de salida en Pydantic (`UsuarioPublico` vs `UsuarioBase`) para evitar fugas de datos sensibles, e implementar autenticación desacoplada con tokens JWT en el encabezado `Authorization: Bearer <token>`.
