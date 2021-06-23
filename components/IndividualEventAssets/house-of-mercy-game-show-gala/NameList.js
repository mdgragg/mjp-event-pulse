import React, { useEffect, useState } from 'react';
import { getRandomInt } from 'lib/helpers';
import styled, { keyframes } from 'styled-components';

const appear = keyframes`
0%{
    opacity: 0;
    transform: scale(10%)
}

50%{
    opacity: 0.8;
}
100%{
    opacity: 1;
    transform: scale(100%)
}
`;

const FeaturedNameWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  margin: 1rem auto;
  padding: 1rem 0;
  background-color: ${(props) => props.theme.lightOrange};
  justify-content: space-around;
`;
const FeaturedName = styled.div`
  background-color: ${(props) => props.theme.lightGreen};
  margin: 0.5rem;
  text-align: center;
  width: 20%;
  min-height: 60px;
  min-width: 150px;
  font-weight: 800;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 10px;
  transition: all 0.2s ease;
  animation: ${appear} 1s ease ${(props) => props.index * 100 + 200}ms 1;
`;

const pickFourRandom = (data) => {
  const len = data.length;
  let name_array = [];
  let i = 0;
  while (i < 4) {
    let index = getRandomInt(0, len);
    name_array.push(data[index]);
    i++;
  }

  return name_array;
};

const NameList = ({ url }) => {
  const [names, setNames] = useState(null);

  async function fetchNames() {
    console.log('fetching new batch of names...');
    return await fetch(`${url}/names`)
      .then(async (res) => {
        if (!res.ok) {
          throw null;
        }
        let result = await res.json();
        return result;
      })
      .catch(() => null);
  }

  useEffect(() => {
    fetchNames().then((data) => setNames(data));
    const interval = setInterval(() => {
      fetchNames()
        .then((data) => setNames(data))
        .catch((err) => setNames(null));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return <div>{names && <NameLooper names={names} />}</div>;
};

const NameLooper = ({ names }) => {
  const [featuredNames, setFeaturedNames] = useState(null);

  useEffect(() => {
    setFeaturedNames(pickFourRandom(names));
    const interval = setInterval(() => {
      setFeaturedNames(pickFourRandom(names));
    }, [6000]);

    return () => {
      console.log('clear interval');
      clearInterval(interval);
    };
  }, [names]);

  return (
    <center>
      <h3>Thank You To Our Donors!</h3>
      {featuredNames && (
        <FeaturedNameWrap>
          {featuredNames.map((name, index) => (
            <FeaturedName key={name.Name + index} index={index}>
              {name.Name}
            </FeaturedName>
          ))}
        </FeaturedNameWrap>
      )}
    </center>
  );
};

export default NameList;
