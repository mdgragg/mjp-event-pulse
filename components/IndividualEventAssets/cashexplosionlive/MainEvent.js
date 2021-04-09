import React from 'react';
import Wrap from './Wrap';
const MainEvent = ({ data }) => {
  return (
    <Wrap>
      <h1>MAIN EVENT COMPONENT</h1>
      <p>{JSON.stringify(data)}</p>
    </Wrap>
  );
};

export default MainEvent;
