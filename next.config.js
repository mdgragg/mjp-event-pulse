module.exports = {
  distDir: 'build',
  env: {
    NEXT_PUBLIC_STRAPI_API_URL: 'http://localhost:1337',
    STRAPI_AUTHENTICATED_API_KEY: `${process.env.STRAPI_AUTHENTICATED_API_KEY}`,
  },
};
