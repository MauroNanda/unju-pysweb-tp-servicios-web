# TP Web Services — Angular 21

Trabajo práctico de la materia Programación y Servicios Web (PySW). Este proyecto es una Single Page Application (SPA) responsiva que consume e integra cinco APIs REST públicas utilizando características modernas de Angular.

## Stack Tecnológico

- Framework: Angular 21 (Componentes standalone)
- Manejo de Estados: Angular Signals y RxJS
- Estilos: Bootstrap 5 (Navbar responsivo, grillas, modales y temas dinámicos)
- Cliente HTTP: Nativo (Fetch API) con interceptores para control de errores y límites (429)

## Características y APIs implementadas

1. Portal de Películas (IMDb Top 100):
   - Consume la API de IMDb Top 100 de RapidAPI.
   - Grilla responsiva con tarjetas que muestran año, géneros y descripción.
   - Implementa un sistema de caché en memoria para evitar peticiones de red redundantes.
   - Filtro local para búsqueda instantánea por título o año.

2. Card Maker — Marcas de Autos:
   - Grilla de marcas de autos obtenida desde Car Specs API.
   - Las imágenes de cada marca se autogeneran de forma dinámica para prevenir errores de recursos faltantes.
   - Integración de modales nativos de Bootstrap para listar los modelos de una marca seleccionada.
   - Caché local para marcas y modelos, optimizando la cuota de la API.
   - Filtro local para búsqueda rápida de marcas.

3. Conversor de Divisas:
   - Formulario que cumple con los requerimientos exactos (cajas de texto para origen y resultado, y listas desplegables para la moneda).
   - Consume la API currency_data de APILayer.
   - Conversión interactiva con validaciones de formulario.

4. Text-to-Speech (TTS):
   - Conversión de texto a voz mediante la API OpenAI TTS (vía RapidAPI).
   - Manejo de audio binario (Blob) reproducido de forma nativa mediante la etiqueta media <audio>.
   - Permite seleccionar distintas voces y configurar el volumen del texto.

5. Generador de Códigos QR:
   - Consumo del servicio gratuito goqr.me.
   - Selector de nivel de corrección de errores y tamaño.
   - Generación dinámica del atributo source de una etiqueta <img>, con opción para descarga directa del PNG.

## Configuración

Para correr el proyecto localmente, es necesario configurar las claves de acceso para las APIs.

1. Verifica los archivos `environment.ts` y `environment.development.ts` dentro de `src/environments/`.
2. Asegúrate de registrar las credenciales correctas en tu entorno local:

```typescript
export const environment = {
  production: false,
  rapidApiKey: 'TU_CLAVE',
  apiLayerKey: 'TU_CLAVE',
  rapidApiHosts: {
    peliculas: 'imdb-top-100-movies.p.rapidapi.com',
    autos: 'car-specs.p.rapidapi.com',
    tts: 'open-ai-text-to-speech1.p.rapidapi.com',
  },
  qrApiBase: 'https://api.qrserver.com/v1/create-qr-code/',
};
```

## Uso

Ejecuta estos comandos dentro del directorio del proyecto (`tp-webservice-6144`):

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start

# Compilar para producción
npm run build
```
