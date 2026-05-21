# TP Web Services — Angular 21

Trabajo práctico de la materia **Programación y Servicios Web (PySW)**. Este proyecto es una Single Page Application (SPA) responsiva que consume e integra cinco APIs REST públicas utilizando características modernas de Angular 21.

## 🛠️ Stack Tecnológico

*   **Framework:** Angular 21 (Standalone Components, sin `NgModule`)
*   **Manejo de Estados:** Angular Signals & RxJS
*   **Estilos:** Bootstrap 5 (Navbar responsivo, Grid, Cards y Modales)
*   **HTTP Client:** `provideHttpClient(withFetch())` (API Fetch nativa)
*   **Tipado:** TypeScript 5.x estricto

---

## 🚀 Características y APIs implementadas

1.  **Punto A · Portal de Películas (IMDb Top 100):**
    *   Consume la API de IMDb Top 100 de RapidAPI.
    *   Grid responsivo con cards que muestran año, géneros (badges de color determinístico) y descripción truncada.
    *   Manejo de estados (loading spinner, error alert y empty states).
2.  **Punto B · Card Maker — Marcas de Autos:**
    *   Grid de marcas que abre un modal con la lista de modelos.
    *   **Caché local en memoria** (`Map<string, Modelo[]>`) para prevenir llamadas redundantes al reabrir una marca.
3.  **Punto C · Conversor de Divisas:**
    *   Formulario interactivo para conversiones entre múltiples divisas.
    *   Consume la API `currency_data` de APILayer.
    *   Validaciones estrictas y formato con pipe de números (`number: '1.2-4'`).
4.  **Punto D · Text-to-Speech (TTS):**
    *   Conversión de texto a voz mediante la API OpenAI TTS en RapidAPI.
    *   Manejo de audio binario (`Blob` y `URL.createObjectURL`) reproducido mediante control `<audio>` nativo.
    *   Control estricto de pérdidas de memoria con `URL.revokeObjectURL`.
5.  **Punto E · Generador de Códigos QR:**
    *   Generador visual a través del servicio gratuito `goqr.me`.
    *   Nivel de corrección y tamaño adaptables.
    *   Botón para descargar directamente la imagen en formato PNG.

---

## 🔑 Configuración de las API Keys

Por motivos de seguridad, las claves de las APIs no se registran en el repositorio Git (están ignoradas en `.gitignore`).

Para correr el proyecto localmente:

1.  Crea una copia de `src/environments/environment.example.ts` con el nombre `environment.ts` y `environment.development.ts` dentro de `src/environments/` (si no están ya creados).
2.  Registra tus credenciales reales:
    ```typescript
    export const environment = {
      production: false,
      rapidApiKey: 'TU_RAPIDAPI_KEY_AQUI',   // Obtener de rapidapi.com
      apiLayerKey: 'TU_APILAYER_KEY_AQUI',   // Obtener de apilayer.com
      ...
    };
    ```

---

## 💻 Comandos Útiles

Ejecuta estos comandos dentro del directorio del proyecto (`tp-webservice-6144`):

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo (http://localhost:4200)
npm start

# Compilar compilado de producción optimizado
npm run build

# Correr tests unitarios
npm test

# Formatear el código con Prettier
npx prettier --write "src/**/*.{ts,html,css}"
```
