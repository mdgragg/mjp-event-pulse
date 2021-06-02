const ENDPOINT = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}`;

export const update_exhibitor_upload = async (name, path, id) => {
  const v_body = {
    name,
    path,
  };

  return await fetch(`${ENDPOINT}/exhibitors/${id}/update_exhibitor_upload`, {
    headers: {
      'content-type': 'application/json',
      //   Authorization: `Bearer ${process.env.api_key}`,
    },
    method: 'PUT',
    body: JSON.stringify(v_body),
  }).then((res) => {
    res.json();
  });
};
