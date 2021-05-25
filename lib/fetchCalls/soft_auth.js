export default async function soft_auth(values, event_id) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/event/${event_id}/soft_auth`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(values),
    }
  ).then(async (res) => {
    if (!res.ok) {
      let result = await res.json();
      console.log('Error: ' + result);
      throw result.message;
    }
    return res.json();
  });
}
