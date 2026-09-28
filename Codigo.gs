/**
 * Life OS · puente con Google Sheets
 * ----------------------------------
 * Pega este código en Extensiones → Apps Script de tu hoja de cálculo,
 * cambia TOKEN por una palabra secreta tuya, y publícalo como aplicación web
 * (Implementar → Nueva implementación → Aplicación web,
 *  "Ejecutar como: yo", "Quién tiene acceso: cualquier usuario").
 * Copia la URL que termina en /exec y pégala en el tablero.
 *
 * El token evita que alguien que adivine tu URL escriba en tu hoja.
 * No es seguridad fuerte: no guardes aquí nada que no puedas mostrar.
 */

const TOKEN = 'cambia-esto-por-tu-palabra-secreta';

function doPost(e) {
  try {
    const req = JSON.parse(e.postData.contents || '{}');
    if (req.token !== TOKEN) return json({ ok: false, error: 'Token inválido' });

    if (req.action === 'write') return json(writeTabs(req.payload && req.payload.tabs));
    if (req.action === 'read')  return json({ ok: true, payload: readTabs() });
    if (req.action === 'ping')  return json({ ok: true, pong: true, at: new Date().toISOString() });
    return json({ ok: false, error: 'Acción desconocida: ' + req.action });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

/** Permite comprobar desde el navegador que la implementación responde. */
function doGet() {
  return json({ ok: true, service: 'Life OS · Sheets bridge', at: new Date().toISOString() });
}

/** Escribe cada tabla en su propia pestaña, reemplazando el contenido. */
function writeTabs(tabs) {
  if (!tabs) return { ok: false, error: 'Sin datos' };
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let total = 0;

  Object.keys(tabs).forEach(function (name) {
    const rows = tabs[name] || [];
    let sh = ss.getSheetByName(name);
    if (!sh) sh = ss.insertSheet(name);
    sh.clear();
    if (!rows.length) return;

    // normalizar: todas las filas al mismo ancho
    const width = rows.reduce(function (w, r) { return Math.max(w, r.length); }, 1);
    const norm = rows.map(function (r) {
      const out = r.slice();
      while (out.length < width) out.push('');
      return out;
    });

    sh.getRange(1, 1, norm.length, width).setValues(norm);
    sh.getRange(1, 1, 1, width).setFontWeight('bold').setBackground('#EDE7FF');
    sh.setFrozenRows(1);
    sh.autoResizeColumns(1, Math.min(width, 12));
    total += norm.length - 1;
  });

  ss.toast('Life OS actualizó ' + Object.keys(tabs).length + ' pestañas', 'Sincronizado', 5);
  return { ok: true, rows: total, tabs: Object.keys(tabs).length };
}

/** Devuelve todas las pestañas como arreglos de filas. */
function readTabs() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const out = {};
  ss.getSheets().forEach(function (sh) {
    const values = sh.getDataRange().getValues();
    out[sh.getName()] = values.map(function (row) {
      return row.map(function (c) {
        return (c instanceof Date) ? Utilities.formatDate(c, Session.getScriptTimeZone(), 'yyyy-MM-dd') : c;
      });
    });
  });
  return out;
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
