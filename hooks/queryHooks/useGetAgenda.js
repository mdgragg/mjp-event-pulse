const { useEffect, useState } = require('react');

const fetchAgenda = async (eventUrl) => {
  return await fetch(
    `https://storage.googleapis.com/mjp-stream-public/${eventUrl}/agenda.json`
  )
    .then((res) => res.json())
    .catch((err) => {
      throw err;
    });
};

const useGetAgenda = (eventUrl) => {
  const [data, setAgenda] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (eventUrl) {
      fetchAgenda(eventUrl)
        .then((res) => {
          console.log(res);
          setAgenda(res);
        })
        .catch((err) => {
          console.log(err);
          setError(err);
        });
    }
  }, [eventUrl]);

  useEffect(() => {
    if (data) {
      setLoading(false);
      setError(false);
    }
  }, [data]);

  return { error, loading, data };
};

export default useGetAgenda;
