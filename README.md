# Campus Activo

Prototipo web/PWA mobile-first para una app universitaria de movimiento cotidiano.

La experiencia esta pensada para motivar a alumnos a usar escaleras, caminar entre edificios, mantener rachas y compararse sanamente con amigos o grupos de clase.

## Correr localmente

Desde esta carpeta:

```powershell
python -m http.server 4174 --bind 0.0.0.0
```

En la computadora:

```text
http://127.0.0.1:4174/
```

En un celular en la misma red Wi-Fi:

```text
http://10.50.91.32:4174/
```

Si el celular no abre la URL, revisa que ambos dispositivos esten en la misma red y que Windows Firewall permita conexiones entrantes al puerto `4174`.

## Instalar como app

En escritorio, Chrome/Edge deberia mostrar la opcion de instalar la PWA desde la barra de direcciones.

En Android, para instalarla como PWA completa normalmente hace falta servirla con HTTPS. Para eso conviene subir esta carpeta a Vercel, Netlify, GitHub Pages con HTTPS, o envolverla despues como APK con Capacitor/Android Studio.

## Archivos principales

- `index.html`: estructura de la app.
- `styles.css`: interfaz mobile-first.
- `app.js`: navegacion, objetivos, rachas, amigos e interacciones.
- `manifest.webmanifest` y `sw.js`: soporte PWA.
- `assets/`: iconos de instalacion.
