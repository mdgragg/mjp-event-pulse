const calcluate_api_url = () => {
  console.log(
    'pulling api data from: ',
    process.env.NEXT_PUBLIC_STRAPI_API_URL
  );
  console.log();
  return 'https://api.mjvirtualevents.com/';
};
calcluate_api_url();
module.exports = {
  distDir: 'build',
  env: {
    api_key:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjEwNDIyMDcyLCJleHAiOjE2MTMwMTQwNzJ9.7MdlV1iK7ZfqeCXTU7C9sEB962XzZeZImdEE3y5ruyg',
  },
};
