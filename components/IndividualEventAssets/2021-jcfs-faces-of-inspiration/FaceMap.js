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
  }
`;
const faces = [
  { url: 'https://placehold.co/300x500', alt: 'pic' },
  { url: 'https://placehold.co/300x500', alt: 'pic' },
  { url: 'https://placehold.co/300x500', alt: 'pic' },
  { url: 'https://placehold.co/300x500', alt: 'pic' },
  { url: 'https://placehold.co/300x500', alt: 'pic' },
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
