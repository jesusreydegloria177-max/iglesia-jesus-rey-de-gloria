# Jesús Rey de Gloria — Sitio web de iglesia

Sitio estático (HTML + CSS + JS puro, sin frameworks ni dependencias externas rotas) listo para probar en XAMPP y publicar en GitHub Pages.

## Estructura
```
iglesia-web/
├── index.html      → toda la página (incluye galería, oración y contacto)
├── css/style.css   → estilos (paleta, tipografía, animaciones)
├── js/main.js      → menú móvil, scroll reveal, contador, versículo del día, carrusel de testimonios, formulario
└── img/            → fotografías, logo de la iglesia e imágenes sociales
```

## Probarlo en XAMPP
1. Copia la carpeta `iglesia-web` dentro de `C:\xampp\htdocs\` (Windows) o `/Applications/XAMPP/htdocs/` (Mac).
2. Abre el panel de control de XAMPP y arranca el módulo **Apache**.
3. En el navegador entra a: `http://localhost/iglesia-web/`

También puedes abrir `index.html` directamente con doble clic (sin XAMPP), casi todo funciona igual, salvo que para conectar el formulario a un backend real (PHP, correo, base de datos) sí vas a necesitar Apache corriendo.

## Qué personalizar primero
- **Contacto actual**: `jesusreydegloria177@gmail.com`, WhatsApp `+51 922 406 293` y `+51 991 391 578`.
- **Dirección actual**: Jirón Lorenzo Iglesia Mz. K Lote 6, Los Viñedos - Surco.
- **Logo actual**: `img/logo-mejorado.jpeg`, utilizado en encabezado, portada, favicon y pie de página.
- **Textos**: nombre de la iglesia, versículo del hero, dirección, teléfono, correo, horarios de culto (`index.html`).
- **Colores**: variables al principio de `css/style.css` (`:root { --ink, --gold, --coral, --teal, --mist }`).
- **Archivos de identidad**: coloca futuras versiones del logo dentro de `img/` y actualiza sus referencias en `index.html`.
- **Mapa**: cambia el `src` del `<iframe>` en la sección de contacto por la ubicación real (Google Maps → Compartir → Insertar mapa).
- **Formulario**: `js/main.js` tiene una simulación local. Para que envíe correos de verdad necesitas conectarlo a un script PHP, o a un servicio como Formspree/Web3Forms (no requieren backend propio).
- **Versículos**: la lista está en `js/main.js` dentro del array `verses`.

## Vista previa al compartir

La portada incluye metadatos Open Graph para WhatsApp y otras redes. La imagen utilizada es `img/logo-invasion-amor-dios.jpeg` y las URL públicas apuntan a:

`https://jesusreydegloria177-max.github.io/iglesia-jesus-rey-de-gloria/`

Cada cambio de dominio o ruta requiere actualizar `canonical`, `og:url`, `og:image` y `twitter:image` en `index.html`.

## Registro del formulario

El formulario todavía funciona como demostración local. La opción recomendada es conectarlo a una hoja privada de Google Sheets mediante una implementación de Google Apps Script. La hoja puede usar estas columnas:

`Fecha | Nombre | Correo o WhatsApp | Petición | Estado | Observaciones`

## Publicarlo en GitHub Pages
1. Crea un repositorio nuevo en GitHub (por ejemplo `jesus-rey-de-gloria`).
2. Sube el contenido de esta carpeta a la raíz del repo (no la carpeta `iglesia-web` en sí, sino lo que hay adentro).
3. En el repo: **Settings → Pages → Source → rama `main` / carpeta `/root`** → Guardar.
4. En un par de minutos tu web queda publicada en `https://tu-usuario.github.io/jesus-rey-de-gloria/`.

## Ideas para seguir creciendo el sitio
- Página de "Prédicas" con embeds de YouTube por serie/tema.
- Blog de noticias/testimonios como páginas individuales.
- Sección de eventos con calendario descargable (.ics).
- Integración con WhatsApp Business (botón flotante) para pedidos de oración urgentes.
- Multilenguaje si la iglesia tiene alcance internacional.
