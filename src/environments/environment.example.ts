export const environment = {
  production: false,

  // RapidAPI — usado por peliculas, autos, tts (y opcionalmente qr)
  rapidApiKey: '',

  // Hosts por API (uno por servicio que use RapidAPI)
  rapidApiHosts: {
    peliculas: 'imdb-top-100-movies.p.rapidapi.com',
    autos: 'car-specs.p.rapidapi.com',
    tts: 'open-ai-text-to-speech1.p.rapidapi.com',
  },

  // APILayer — punto C (divisas)
  apiLayerKey: '',
  apiLayerBase: 'https://api.apilayer.com/currency_data',

  // QR — punto E (no requiere key si usamos goqr.me)
  qrApiBase: 'https://api.qrserver.com/v1/create-qr-code/',
};
