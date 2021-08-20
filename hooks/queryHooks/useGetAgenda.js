const { useEffect, useState } = require('react');

const fetchAgenda = async (id = '147') => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/events/${id}/get_agenda`
  )
    .then((res) => res.json())
    .catch((err) => {
      throw err;
    });
};

const useGetAgenda = ({ eventId }) => {
  const [data, setAgenda] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAgenda(eventId)
      .then((res) => {
        console.log(res);
        setAgenda(res);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  }, [eventId]);

  useEffect(() => {
    if (data) {
      setLoading(false);
      setError(false);
    }
  }, [data]);

  return { error, loading, data };
};

export default useGetAgenda;
