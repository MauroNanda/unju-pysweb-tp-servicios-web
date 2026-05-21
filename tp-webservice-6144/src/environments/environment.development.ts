export const environment = {
  production: false,

  // RapidAPI — usado por peliculas, autos, tts (y opcionalmente qr)
  rapidApiKey: 'a03bce60c2msh5a402e8139de9d9p147794jsn2ab657d1a185',

  // Hosts por API (uno por servicio que use RapidAPI)
  rapidApiHosts: {
    peliculas: 'imdb-top-100-movies.p.rapidapi.com',
    autos: 'car-specs.p.rapidapi.com',
    tts: 'open-ai-text-to-speech1.p.rapidapi.com',
  },

  // APILayer — punto C (divisas)
  apiLayerKey: 'NtUAJzEuTZhGw7gQdHAxzbuJ6Ja5nI4e',
  apiLayerBase: 'https://api.apilayer.com/currency_data',

  // QR — punto E (no requiere key si usamos goqr.me)
  qrApiBase: 'https://api.qrserver.com/v1/create-qr-code/',
};
