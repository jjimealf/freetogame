# FreeToGame

Aplicacion desarrollada con `Angular`, `Ionic` y `Capacitor` para consultar juegos free-to-play, gestionar favoritos y operar tanto en navegador como en Android.

## Que hace la app

FreeToGame combina una parte de catalogo y una parte de gestion de usuarios:

- Inicio de sesion y registro de usuarios contra un backend propio.
- Listado de juegos free-to-play obtenido desde la API de FreeToGame a traves de `RapidAPI`.
- Navegacion por juegos, plataformas y favoritos.
- Gestion local de favoritos con `Ionic Storage`.
- Vista administrativa para gestion de usuarios.
- Generacion de un pedido en PDF desde el carrito.
- En web el PDF se descarga; en Android el PDF se genera y se comparte con el sistema.

## Stack principal

- `Angular 21`
- `Ionic 8`
- `Capacitor 8`
- `Chart.js 4` + `ng2-charts`
- `pdfmake`
- `Ionic Storage`

## Requisitos

- `Node.js 24`
- `npm`
- `JDK 21`
- `Android SDK` si se quiere compilar o ejecutar la app Android

La version recomendada de Node esta definida en `.nvmrc`.

## Instalacion

```bash
npm install
```

## Ejecutar en navegador

```bash
npm start
```

La aplicacion queda disponible en `http://localhost:4200`.

## Comandos utiles

```bash
npm run build
npm run lint
npm test
```

## Ejecutar en Android

### 1. Generar y copiar la web a Android

```bash
npm run build
npx cap copy android
```

Si cambian plugins nativos o configuracion de Capacitor, usa:

```bash
npx cap sync android
```

### 2. Instalar en emulador o dispositivo

Desde la raiz del proyecto:

```bash
cd android
.\gradlew.bat installDebug
```

### 3. Generar APK debug

```bash
cd android
.\gradlew.bat assembleDebug
```

APK generado:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

## Estructura basica

- `src/app/login`: acceso a la aplicacion.
- `src/app/registro`: alta de usuarios.
- `src/app/juegos`: listado principal de juegos.
- `src/app/plataformas`: filtrado/listado por plataforma.
- `src/app/favoritos`: favoritos guardados localmente.
- `src/app/admin`: gestion administrativa de usuarios.
- `src/app/grafica`: visualizacion grafica con `Chart.js`.
- `src/app/carrito`: generacion y comparticion del PDF de pedido.
- `src/app/service/rest.service.ts`: llamadas HTTP a las APIs.
- `src/app/service/storage.service.ts`: persistencia local de favoritos.

## APIs y configuracion importante

- Backend propio: `http://semillero.allsites.es/public/api`
- Catalogo de juegos: `https://free-to-play-games-database.p.rapidapi.com/api`

Actualmente estas URLs estan definidas directamente en `src/app/service/rest.service.ts`.

## Notas importantes

- Android tiene habilitado trafico HTTP en claro porque el backend propio usa `http`.
- La app Android se apoya en `Capacitor` y no en `Cordova`.
- El flujo del carrito genera un PDF con `pdfmake`.
- En Android el PDF se guarda temporalmente y se comparte con `@capacitor/share`.
- Si aparece algun problema de compilacion Android, revisa primero `JAVA_HOME`, el `Android SDK` y que el emulador o dispositivo este disponible.
