import React from 'react';
import styled from 'styled-components';

const FaceGrid = styled.div`
  width: 80%;
  margin: auto;
  left: 0;
  right: 0;
  position: relative;
  /* top: 55%; */
  background: none;
  /* height: 250px; */

  margin-top: -250px;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  z-index: 101;
  && img {
    margin: 1%;
    width: 15%;
    height: auto;
    z-index: 1;
    box-shadow: 0px 0px 20px -5px grey;
    transition: all 0.5s ease;
  }
  && img:hover {
    transform: scale(1.02);
  }
`;
const faces = [
  {
    url:
      'https://storage.googleapis.com/mjp-stream-public/2021-jfcs-faces-of-inspiration/Renders/header-1.png',
    alt: 'pic',
  },
  {
    url:
      'https://storage.googleapis.com/mjp-stream-public/2021-jfcs-faces-of-inspiration/Renders/header-2.png',
    alt: 'pic',
  },
  {
    url:
      'https://storage.googleapis.com/mjp-stream-public/2021-jfcs-faces-of-inspiration/Renders/header-3.png',
    alt: 'pic',
  },
  {
    url:
      'https://storage.googleapis.com/mjp-stream-public/2021-jfcs-faces-of-inspiration/Renders/header-4.png',
    alt: 'pic',
  },
  {
    url:
      'https://storage.googleapis.com/mjp-stream-public/2021-jfcs-faces-of-inspiration/Renders/header-5.png',
    alt: 'pic',
  },
];
const FaceMap = () => {
  return (
    <FaceGrid>
      {faces.map((face) => (
        <img src={face.url} alt={face.alt} />
      ))}
    </FaceGrid>
  );
};

export default FaceMap;
