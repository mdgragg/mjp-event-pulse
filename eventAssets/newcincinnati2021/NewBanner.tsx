import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const BanWrap = styled.div`
  margin-top: 200px;
  width: 100%;
  background-color: white;
`;

const StyledText = styled.div`
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 7px;
  margin: 1rem auto;
  color: ${(props) => props.theme.colors.violet};
  &&::before {
    content: '';
    height: 2px;
    background-color: ${(props) => props.theme.colors.violet};
    display: block;
    max-width: 420px;
    margin: 1rem auto;
  }
`;
const UnderPic = styled.div`
  background-color: ${(props) => props.theme.colors.violet};
  height: 50px;
`;
const NewBanner = (props) => {
  return (
    <BanWrap>
      <StyledText>INNOVATE LIKE AN ENTREPRENEUR</StyledText>
      <UnderPic />
    </BanWrap>
  );
};

NewBanner.propTypes = {};

export default NewBanner;
