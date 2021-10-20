export async function attendee_register(values, event_id) {
  console.log(values);
  return await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/attendee/register/${event_id}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(values),
    }
  ).then(async (res) => {
    let result = await res.json();
    // this means attendee exists and is just logging in
    if (!res.ok) {
      console.log('fetch error:', result);
      throw result.message;
    }

    return result;
  });
}
