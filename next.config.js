const calcluate_api_url = () => {
  console.log(
    'pulling api data from: ',
    process.env.NEXT_PUBLIC_STRAPI_API_URL
  );
  return 'https://api.mjvirtualevents.com/';
};
calcluate_api_url();
module.exports = {
  distDir: 'build',
  env: {
    api_key:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNjEzNzUzNzg4LCJleHAiOjE2NDUyODk3ODh9.hoky2HxECXDDvZ6Y3EUGKDwJtoz0zVtWxmQWjTT99Tg',
  },
  redirects() {
    return [
      {
        source: '/alliancedatainvestorday',
        destination: '/alliancedatainvestorevent',
        permanent: true,
      },
      {
        source: '/alliancedatainvestorday/thank-you',
        destination: '/alliancedatainvestorevent/thank-you',
        permanent: true,
      },
    ];
  },
};
