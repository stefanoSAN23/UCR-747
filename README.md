# TCU-747 — Frontend

Portal web del TCU-747 construido con React, Vite y Tailwind CSS. Muestra proyectos, materiales académicos, juegos y creadores del programa.

---

## Instalación y ejecución

Las instrucciones completas de instalación y uso (incluyendo el lanzador con doble clic y cómo crear el acceso directo en el escritorio) están en el **README del backend**:

👉 [`UCR-747 Backend/README.md`](../UCR-747%20Backend/README.md)

---

## Estructura del proyecto

```
src/
├── components/
│   ├── LeftSidebar.jsx   # Menú lateral (incluye botón Publicar en GitHub)
│   └── RightSidebar.jsx  # Lista de miembros TCU
├── pages/
│   ├── Home.jsx
│   ├── Proyectos.jsx
│   ├── Material.jsx
│   ├── Juegos.jsx
│   └── Creadores.jsx
├── services/
│   └── api.js            # Llamadas al backend
└── config/
    └── api.js            # URL base (localhost:8000 por defecto)
```
