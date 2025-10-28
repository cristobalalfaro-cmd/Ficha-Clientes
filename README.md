# Panel de Registro de Reuniones — URL fija

Este paquete está **conectado** al Web App de Apps Script provisto:

- **URL Web App**: `https://script.google.com/macros/s/AKfycbxPV4abZns_ydXmspPEGOA02-Na0woNUqA296qAqK7tuc0lC3f6rNI2uUvPS7hy8TWUZg/exec`

## Uso
1. Sube `frontend/` a un hosting estático (GitHub Pages, Netlify, Vercel, Replit, etc.).
2. Abre el `index.html`, completa el formulario y pulsa **Guardar reunión**.

## Requisitos del backend
El Web App de Apps Script debe aceptar un POST JSON con los campos del formulario y devolver:
```json
{ "ok": true }
```
En el ejemplo de Apps Script que te entregué previamente, **no necesitas crear encabezados manualmente**: la función `setup()` los crea y `doPost` también los asegura si la hoja está vacía.

Si tu despliegue actual no usa ese código, te dejo el `Code.gs` de referencia en `apps_script/`.
