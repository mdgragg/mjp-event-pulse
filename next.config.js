module.exports = {
  distDir: 'build',
  env: {
    NEXT_PUBLIC_STRAPI_API_URL: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}`,
    STRAPI_AUTHENTICATED_API_KEY: `${process.env.STRAPI_AUTHENTICATED_API_KEY}`,
  },
};
