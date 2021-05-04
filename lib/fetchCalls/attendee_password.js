export default async function attendee_capture(values, event_id) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/event/${event_id}/handle_password_auth`,
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
      throw result.message.message;
    }
    return res.json();
  });
}
