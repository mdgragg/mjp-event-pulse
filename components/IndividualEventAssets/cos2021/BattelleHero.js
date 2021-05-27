import React from 'react';
import styled from 'styled-components';
const BG = styled.div`
  background-image: url('${(props) => props.theme.header_image}');
  background-color: ${(props) => props.theme.blue};
  background-repeat: no-repeat;
  background-position: center center;
  height: 740px;
  width: 100%;
  background-size: contain;
  display: flex;
  vertical-align: center;
  @media all and (max-width: 1200px) {
    background-size: auto 100%;
  }
`;
const Inner = styled.div`
  && h1 {
    font-size: 4rem;
    line-height: 3rem;
  }
  && h2 {
    color: ${(props) => props.theme.lightBlue};
  }
  font-family: Gotham;
  text-align: center;
  max-width: 800px;
  margin: auto;
  color: white;
  && .twenty {
    color: rgba(0, 0, 0, 0);
    font-size: 10rem;
    line-height: 9rem;
    font-family: Futura Bold;
    -webkit-text-stroke: 5px ${(props) => props.theme.lightBlue};
  }
`;

const GoldBg = styled.div`
  margin-top: 1rem;
  width: 300px;
  margin: 1rem auto;
  padding: 0.5rem;
  background: rgb(232, 114, 0);
  background: linear-gradient(
    126deg,
    rgba(232, 114, 0, 1) 0%,
    rgba(245, 168, 0, 1) 25%,
    rgba(240, 148, 0, 1) 75%,
    rgba(233, 119, 0, 1) 100%
  );
`;
const BattelleHero = ({ children, counter_area }) => {
  return (
    <BG>
      <Inner className="inner-text">
        <h1>Celebration of Solvers</h1>
        <h2>Honoring Achievement Award Winners and Patentees</h2>
        <div className="twenty">2020</div>
        <GoldBg>{children}</GoldBg>
        {counter_area}
      </Inner>
    </BG>
  );
};

export default BattelleHero;
