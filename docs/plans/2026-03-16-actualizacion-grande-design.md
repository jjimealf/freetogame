# Actualizacion Grande del Proyecto

## Contexto

El proyecto parte de una base antigua:

- Angular 13
- Ionic 6
- Cordova Android 10
- Plugins nativos basados en Cordova para archivos, apertura de PDF y correo

Ademas, el entorno actual usa una version de Node no alineada con esta base, lo que aumenta el riesgo de errores de compatibilidad en desarrollo y build.

## Objetivo

Actualizar el proyecto en varias fases hasta una base moderna y mantenible que siga permitiendo generar una app Android/APK.

Estado objetivo:

- Angular e Ionic en versiones modernas y soportadas
- Node LTS compatible con la cadena de build
- Sustitucion de Cordova por Capacitor
- Mantenimiento del comportamiento actual de la app
- Generacion de APK Android al final de la migracion

## Decisiones Validadas

- La actualizacion sera grande, no una puesta al dia minima.
- La estrategia sera por etapas, no en una sola migracion monolitica.
- La app debe seguir generando APK/app Android.
- Se migrara de Cordova a Capacitor.
- El flujo de envio por correo con adjunto se sustituira por un flujo de compartir PDF en Android.

## Alcance Funcional

Se debe conservar:

- Navegacion general de la aplicacion
- Flujo del carrito
- Generacion de PDF del pedido
- Descarga del PDF en navegador
- Funcionamiento Android con salida nativa equivalente mediante compartir PDF

No se incluye como objetivo principal:

- Rediseño visual
- Reescritura funcional completa de paginas
- Incorporacion de nuevas features ajenas a la migracion

## Arquitectura Objetivo

### Web

- La app seguira permitiendo generar el PDF del pedido.
- En navegador, el PDF se descargara directamente.

### Android

- La app usara Capacitor como capa nativa.
- El PDF se generara desde la app y se gestionara con APIs/plugins compatibles con Capacitor.
- El flujo final sera guardar y compartir el PDF, en lugar de abrir el cliente de correo con adjunto.

### Aislamiento de plataforma

La logica de generacion y salida del PDF debe moverse a un servicio dedicado para desacoplar las paginas de implementaciones nativas concretas.

Beneficios:

- Menor acoplamiento a plugins
- Mejor mantenibilidad
- Menos condicionales dispersos de Cordova/Android
- Migraciones futuras mas simples

## Plan por Fases

### Fase A: Base tecnica

- Fijar una version LTS de Node compatible
- Actualizar Angular CLI, Angular core y dependencias de build
- Actualizar Ionic y dependencias relacionadas
- Resolver cambios de configuracion, TypeScript y tooling
- Recuperar compilacion y arranque web estables

### Fase B: Capa movil

- Incorporar Capacitor al proyecto
- Crear o regenerar la plataforma Android
- Eliminar la dependencia operativa de Cordova
- Ajustar configuraciones necesarias para build Android moderno

### Fase C: Integraciones nativas

- Sustituir `@awesome-cordova-plugins`
- Reemplazar el flujo de `File`, `FileOpener` y `EmailComposer`
- Implementar un servicio para:
  - descargar en web
  - guardar y compartir en Android
- Mantener el flujo funcional del carrito

### Fase D: Validacion

- Verificar build web
- Verificar arranque local
- Verificar sincronizacion con Android
- Verificar generacion de APK/app Android
- Probar generacion de PDF y compartir en Android

## Riesgos

- Saltos de version mayores de Angular pueden exigir cambios en modulos, imports o configuracion.
- Librerias antiguas como `ng2-charts` o `pdfmake` pueden requerir actualizacion adicional.
- La migracion Android puede necesitar ajustes de permisos, almacenamiento o compatibilidad segun el plugin final elegido.
- Pueden aparecer diferencias de comportamiento entre web y Android que exijan una capa de abstraccion mas clara.

## Criterios de Exito

La migracion se considerara completada cuando:

- El proyecto compile de forma estable con una cadena moderna y soportada.
- La app arranque correctamente en entorno web.
- El proyecto Android se sincronice y construya con Capacitor.
- Se pueda generar el artefacto Android final.
- El usuario pueda generar y compartir el PDF del pedido en Android.

## Estrategia de Ejecucion

La implementacion se hara en cambios pequenos y validables por fase para evitar mezclar:

- errores de framework
- errores de build
- errores de integracion nativa

Cada fase debe cerrar con una comprobacion tecnica antes de pasar a la siguiente.

## Siguiente Paso

Preparar un plan de implementacion detallado que desglose tareas concretas, orden de ejecucion, verificaciones y puntos de rollback para la migracion.
