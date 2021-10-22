import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrap = styled.div`
  background-color: ${(props) =>
    props.theme.bodyBgColor || props.theme.palette.background.primary};
  z-index: 1000;
  position: relative;
`;
const BodyWrap = ({ children }) => {
  return <Wrap>{children}</Wrap>;
};

BodyWrap.propTypes = {};

export default BodyWrap;
