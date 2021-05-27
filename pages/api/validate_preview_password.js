import cookies from '../../lib/utils/cookies';

const handler = async (req, res) => {
  console.log(req.body);
  const { pw, event_url } = req.body;
  return await fetch(
    // 'http://localhost:1337' +
    process.env.NEXT_PUBLIC_STRAPI_API_URL +
      `/event-jobs/${event_url}/auth/validate_preview`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImlhdCI6MTYxODc3NTU5NSwiZXhwIjoxNjUwMzExNTk1fQ.zUE-AqcjjuXvGupK9fqypnVeoRD1XzpKOJ4yCUbg2mI'}`,
      },
      body: JSON.stringify({ pw }),
    }
  ).then((result) => {
    console.log(result.status);
    if (result.status !== 200) {
      res.status(result.status);
      return res.send();
    }
    let d = new Date();
    d.setHours(23);
    d.setMinutes(59);
    d.setSeconds(59);
    // console.log(res);
    res.cookie(`preview_cookie__${event_url}`, true, {
      httpOnly: false,
      path: `/`,
      expires: d,
    });
    return res.end(res.getHeader('Set-Cookie'));
  });
};

export default cookies(handler);
