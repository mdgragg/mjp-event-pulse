export default async function generate(event_id, token, options) {
  options.Date.from = new Date(options.Date.from);
  options.Date.to = new Date(options.Date.to);
  console.log('options: ', options);
  return await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/events/${event_id}/generate_attendee_report`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ options }),
    }
  ).then(async (res) => {
    if (!res.ok) {
      let result = await res.json();
      throw result.message;
    } else {
      return res.json();
    }
  });
}
