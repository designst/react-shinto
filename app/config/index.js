module.exports = {
  host: process.env.HOST || '0.0.0.0',
  port: parseInt(process.env.PORT, 10) || 3000,
  app: {
    htmlAttributes: {
      lang: 'en',
    },
    title: 'React.js Boilerplate',
    titleTemplate: '%s - React.js Boilerplate',
    meta: [
      {
        name: 'description',
        content: 'A React.js Boilerplate application',
      },
    ],
  },
};
