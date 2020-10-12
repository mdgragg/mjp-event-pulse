const API_URL = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`

export async function fetchAPI(query, { variables, preview } = {}) {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })
  
    const json = await res.json()
    if (json.errors) {
      console.error(json.errors)
      throw new Error('Failed to fetch API')
    }

    // json.data.events.map(e => console.log(e))

    return json.data
  }