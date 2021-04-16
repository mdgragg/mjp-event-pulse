import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import LoadingImage from 'components/Loading/LoadingImage';
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

const FaceMap = ({ faces }) => {
  return (
    <FaceGrid>
      {faces ? (
        faces.map((face, index) => (
          <img key={face.alt + '--' + index} src={face.url} alt={face.alt} />
        ))
      ) : (
        <LoadMap />
      )}
    </FaceGrid>
  );
};

const LoadMap = () => {
  let num = 5;
  let themap = [];
  for (let i = 0; i < num; i++) {
    themap.push(
      <div
        key={`map-load--${i}`}
        style={{ height: '300px', width: '15%', margin: '1%' }}
      >
        <LoadingImage />
      </div>
    );
  }
  return <>{themap}</>;
};

export default FaceMap;
