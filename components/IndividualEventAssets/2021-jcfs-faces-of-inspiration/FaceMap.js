import React from 'react';
import styled from 'styled-components';

const FaceGrid = styled.div`
  width: 80%;
  margin: auto;
  left: 0;
  right: 0;
  position: absolute;
  top: 300px;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  && img {
    margin: 1%;
    width: 15%;
    height: auto;
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
