import { Button__Primary } from 'components/Buttons';
import React, { useState } from 'react';

const pages = [
  { name: 'Page 1', valid: false, component: <div>Hello World 1</div> },
  { name: 'Page 2', valid: false, component: <div>Hello World 2</div> },
  { name: 'Page 3', valid: false, component: <div>Hello World 3</div> },
  { name: 'Page 4', valid: false, component: <div>Hello World 4</div> },
  { name: 'Page 5', valid: false, component: <div>Hello World 5</div> },
];

const Multiform = () => {
  const [data, setData] = useState(0);
  return (
    <div
      style={{
        height: '500px',
        width: '350px',
        border: '5px solid black',
        margin: 'auto',
        backgroundColor: 'black',
      }}
    >
      <h2> {pages[data].name}</h2>
      {pages[data].component}
      <Button__Primary
        onClick={() => {
          let v;
          if (data === 0) {
            return;
          }
          v = data - 1;
          setData(v);
        }}
      >
        Previous
      </Button__Primary>
      <Button__Primary
        onClick={() => {
          let v = data + 1;
          if (v >= pages.length) {
            v = data;
          }
          setData(v);
        }}
      >
        Next
      </Button__Primary>
    </div>
  );
};

export default Multiform;
