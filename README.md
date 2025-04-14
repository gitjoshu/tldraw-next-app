# tldraw-next-app

Este proyecto es una aplicación web construida con Next.js que integra la pizarra colaborativa tldraw.

## Índice

- [Instrucciones de Configuración](#instrucciones-de-configuración)
- [Cómo Ejecutar la Aplicación](#cómo-ejecutar-la-aplicación)
- [Tecnologías de Implementación](#tecnologías-de-implementación)
- [Descripción de Funcionalidades](#descripción-de-funcionalidades)

## Instrucciones de Configuración

1.  **Clonar el repositorio:**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd tldraw-next-app
    ```

2.  **Instalar dependencias:**
    Utiliza el siguiente comando con la versión de node `22.14.0`
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno:**
    Crea un archivo `.env` en la raíz del proyecto y añade las variables necesarias. Como mínimo, necesitarás la URL de conexión a tu base de datos de postgress y el api token de google para la generación de imágenes mediante IA:
    ```dotenv
    DATABASE_URL="postgresql://..."
    GOOGLE_API_KEY="AIzaSy..."
    ```

4.  **Sincronizar la base de datos:**
    Este proyecto usa Drizzle ORM. Ejecuta el siguiente comando para aplicar las migraciones o empujar el esquema a tu base de datos:
    ```bash
    npm run db:push
    ```
    *Nota: Si prefieres gestionar los cambios de la base de datos mediante migraciones, puedes usar `npm run db:generate`. Este comando utiliza `drizzle-kit` para generar archivos SQL de migración basados en los cambios detectados en tu esquema ORM. Una vez generados, deberás aplicar estas migraciones manualmente o mediante otra herramienta.*

## Cómo Ejecutar la Aplicación

Una vez completada la configuración, puedes iniciar el servidor de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación en funcionamiento. La aplicación utiliza Turbopack para un desarrollo más rápido.

## Tecnologías de Implementación

Este proyecto utiliza una variedad de tecnologías modernas:

-   **Framework:** [Next.js](https://nextjs.org/) (v15+)
-   **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
-   **UI:**
    -   [React](https://reactjs.org/) (v19)
    -   [Tailwind CSS](https://tailwindcss.com/) (v4) - CSS
    -   [tldraw](https://tldraw.dev/) (v3+) - Componente principal de pizarra.
    -   [Shadcn](https://ui.shadcn.com/) - Componentes de UI
-   **API:** [tRPC](https://trpc.io/) (v11) - API typesafe end-to-end.
-   **Base de Datos:**
    -   [Neon](https://neon.tech/) - Base de datos PostgreSQL serverless.
    -   [Drizzle ORM](https://orm.drizzle.team/) - ORM para TypeScript.
-   **Otros:**
    -   [ESLint](https://eslint.org/) - Linting.
    -   [GOOGLE-GEMINI](https://ai.google.dev/gemini-api/docs/image-generation) - Generación de imágenes mediante IA.
    -   `dotenv` - Gestión de variables de entorno.

## Descripción de Funcionalidades

La aplicación ofrece una experiencia completa de dibujo digital con características avanzadas:

**Funcionalidades Principales de Dibujo:**

*   **Pizarra Digital Interactiva:** Utiliza `tldraw` para crear, modificar y gestionar dibujos.
*   **Gestión de Dibujos:**
    *   Crear nuevos dibujos desde cero.
    *   Guardar el estado actual del dibujo en la base de datos.
    *   Borrar dibujos existentes (con confirmación mediante un modal).
*   **Persistencia de Datos:** Los dibujos se guardan en una base de datos PostgreSQL (Neon) mediante Drizzle ORM.

**Integración con Inteligencia Artificial:**

*   **Generación de Imágenes por IA:** Transforma tus dibujos en imágenes utilizando modelos de IA (integración con Google AI).
*   **Visualización:** Página dedicada para mostrar la imagen generada por la IA.

**Interfaz de Usuario y Experiencia:**

*   **Landing Page:** Página de inicio con transiciones visuales (`View Transitions`) al explorar.
*   **Listado de Dibujos:** Muestra los dibujos guardados con fecha de actualización, botones para abrir o crear nuevos, y acceso a página de error.
*   **Carga Asíncrona:** Uso de `Suspense` y `Skeleton` para una carga fluida de datos del servidor.
*   **Notificaciones:** Feedback al usuario sobre éxitos y errores mediante `shadcn/sonner`.
*   **Manejo de Estados:** Gestión del estado de las peticiones para controlar la interactividad (ej. deshabilitar botones).
*   **Temas:** Soporte básico para modo claro y oscuro.

**Manejo de Errores:**

*   **Página de Error Dedicada:** Página específica para mostrar errores con opciones para reintentar o volver al inicio.
*   **Control de Errores:** Gestión robusta de errores tanto en el cliente como en el servidor.

**Tecnología Subyacente (Resumen):**

*   Desarrollado con Next.js 15 y TypeScript.
*   Diseño implementado con Tailwind CSS y componentes de Shadcn UI.
*   API typesafe construida con tRPC (configurada para cliente y React Server Components).
*   Base de datos gestionada con Drizzle ORM.
