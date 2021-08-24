const { useEffect, useState } = require('react');

const fetchAgenda = async (eventUrl = 'nagdca') => {
  return await fetch(
    `https://storage.googleapis.com/mjp-stream-public/${eventUrl}/agenda.json`
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
