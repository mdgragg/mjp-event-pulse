import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const HeadWrap = styled.div`
  display: grid;
  grid-template-columns: 30% 70%;
  padding: 2%;
  max-width: 1600px;
  width: 100%;
  margin: auto;
  text-align: left;
  && img.logo {
    max-width: 120px;
    margin: 0 0 2rem 0;
  }
  @media all and (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const UnderText = styled.div`
  font-size: 2rem;
`;
const NFHeader = ({ logoLink, headerText }) => {
  return (
    <HeadWrap>
      <div>
        <img src={logoLink} className={`logo`} />
        <h1>NF Leader Summit</h1>
        <UnderText>{headerText.slice(12)}</UnderText>
        <h2>October 26 - 28, 2021</h2>
      </div>
      <div></div>
    </HeadWrap>
  );
};

NFHeader.propTypes = {};

export default NFHeader;
