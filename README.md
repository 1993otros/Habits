# Life OS

Tablero personal para llevar las ocho áreas de la vida en un solo lugar:
día a día, salud, aprendizaje, finanzas, carrera y propósito.

Es **un solo archivo HTML**, sin dependencias ni compilación. Se abre haciendo
doble clic o se publica en GitHub Pages. Los datos se guardan en el navegador
y, si conectas el Apps Script, también en tu hoja de Google.

---

## Qué incluye

| Sección | Qué lleva |
|---|---|
| ⚡ Command Center | Puntaje del día, racha, indicadores y los seis pilares |
| 📅 Daily OS | Agenda editable por día, tareas, ritual de la mañana, inglés y cierre |
| 🏋️ Salud & Energía | Energía, agua, sueño, entrenamientos y tendencia de 7 días |
| 🧠 Mente & Maestría | TOEFL por secciones, libros, módulos de la maestría, diario de estudio |
| 💰 Finanzas | Deudas con abonos, gastos fijos, gastos hormiga, pagos y patrimonio (COP) |
| 🚀 Carrera | Tablero kanban de vacantes, red de contactos y mapa de habilidades |
| 🌀 Vida Plena | Rueda de la vida, gratitud, relaciones e intención semanal |
| ⚙️ Configuración | Salario, metas, tema, días visibles y conexión con Sheets |

---

## Publicarlo en GitHub Pages

1. Crea un repositorio nuevo en GitHub y sube estos archivos.
2. Entra a **Settings → Pages**.
3. En *Source* elige **Deploy from a branch**, rama `main`, carpeta `/ (root)`.
4. Guarda. En un minuto tendrás la dirección
   `https://TU-USUARIO.github.io/TU-REPOSITORIO/`.

Ábrela desde el celular también: es la misma página y se adapta a pantalla
pequeña.

> **Importante:** los datos viven en el navegador que la abre. Para verlos en
> varios equipos hay que conectar la hoja de Google (abajo).

---

## Conectar con Google Sheets

La página no puede escribir en Sheets por sí sola: necesita un intermediario.
Ese intermediario es un **Apps Script** que vive dentro de tu propia hoja, así
que tus datos nunca pasan por un servidor de terceros.

### 1. Crear la hoja y el script

1. Crea una hoja nueva en <https://sheets.new> y ponle nombre (por ejemplo
   *Life OS*).
2. Menú **Extensiones → Apps Script**.
3. Borra lo que haya y pega el contenido de [`apps-script/Codigo.gs`](apps-script/Codigo.gs).
4. Cambia la primera línea:

   ```js
   const TOKEN = 'cambia-esto-por-tu-palabra-secreta';
   ```

   por una palabra tuya. La necesitarás en el paso 3.
5. Guarda (💾).

### 2. Publicarlo como aplicación web

1. Botón **Implementar → Nueva implementación**.
2. En el engranaje ⚙️ elige **Aplicación web**.
3. Configura así:
   - *Ejecutar como:* **Yo**
   - *Quién tiene acceso:* **Cualquier usuario**
4. **Implementar**. Google pedirá autorización la primera vez: acéptala
   (verás un aviso de "app no verificada" — es tu propio script, entra en
   *Configuración avanzada → Ir a…*).
5. Copia la **URL de la aplicación web**, la que termina en `/exec`.

### 3. Pegarlo en el tablero

Abre el tablero → **⚙️ Configuración → Google Sheets**, pega la URL y el token,
y presiona **📤 Enviar a la hoja**.

Cada tabla aparece en su propia pestaña: `Diario`, `Entrenamientos`, `Deudas`,
`GastosFijos`, `Hormiguitas`, `Pagos`, `Oportunidades`, `Contactos`,
`Habilidades`, `Libros`, `Maestria`, `TOEFL`, `RuedaDeVida`, `Semanas` y
`Respaldo`.

- **📤 Enviar** reescribe las pestañas con lo que hay en el tablero.
- **📥 Traer** lee la pestaña `Respaldo` y restaura los datos en el tablero.
  Sirve para pasar de un equipo a otro.
- **Enviar automáticamente** sube los cambios unos segundos después de que
  dejas de escribir.

> `Respaldo` es la pestaña que permite el viaje de vuelta. Las demás son para
> leer y graficar; si las editas a mano, esos cambios no regresan al tablero.

---

## Si no quieres configurar nada

En esa misma sección, dentro de *"Sin configurar nada"*, hay un selector de
tabla con **Copiar** y **Ver**. Copias la tabla y la pegas en una hoja en
blanco con `Ctrl+V`. Funciona sin Apps Script y sin conexión.

---

## Sobre tus datos

- Se guardan en el `localStorage` del navegador que abre la página.
- Si conectas el Apps Script, también quedan en tu hoja de Google.
- Nada se envía a ningún otro servidor: no hay analítica ni rastreo.
- Borrar los datos del sitio en el navegador borra el tablero. Ten el respaldo
  en la hoja o exporta el JSON desde *Configuración → Datos*.
- El token del Apps Script queda guardado en el navegador y viaja en cada
  petición. Cualquiera con la URL y el token puede escribir en la hoja, así que
  no publiques capturas donde se vean.

---

## Notas técnicas

- Un archivo, sin dependencias. Solo carga las tipografías Sora e Inter desde
  Google Fonts.
- Fechas en hora local (America/Bogotá). Es intencional: usar UTC archivaría el
  cierre de la noche en el día siguiente.
- Moneda en COP con `Intl.NumberFormat('es-CO')`.
- Tema claro y oscuro, siguiendo el del sistema y con interruptor manual.
- Diseñado para funcionar desde 390 px de ancho.
- La llamada al Apps Script usa `Content-Type: text/plain` a propósito: evita
  la petición *preflight* de CORS, que Apps Script no responde.

## Licencia

MIT — haz con esto lo que quieras.
