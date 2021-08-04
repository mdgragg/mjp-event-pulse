import React, { useState, useEffect } from 'react';

const UseServerSentEvents = (endpoint = 'http://localhost:4444/auction') => {
  const [listening, setListening] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log('mount sse');
    let events;
    if (!listening) {
      events = new EventSource(endpoint);

      events.onmessage = (e) => {
        const parsedData = JSON.parse(e.data);
        console.log('New Packet: ', parsedData);
        setData({
          ...parsedData,
        });
      };

      events.onerror = (e) => {
        console.log('sse error: ', e);
        setData(null);
      };
      setListening(true);
    }
    // return () => {
    //   events.close();
    // };
  }, [listening]);

  return data;
};

export default UseServerSentEvents;
