import React from 'react';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

const ImageHolder = styled.div`
  height: 250px;
  width: 250px;
  top: 0;
  left: 0;
  && img {
    position: absolute;
    width: 250px;
    height: auto;
    left: 0;
    right: 0;
    margin: auto;
  }
  && .load {
    position: absolute;
    left: 0;
    right: 0;
    top: 125px;
    margin: auto;
  }
`;
const SingleAuctionItem = ({ data }) => {
  return (
    <div style={{ maxWidth: '80%', position: 'relative' }}>
      <center>
        <ImageHolder>
          <CircularProgress className="load" />
          <img src={data.imgSrc} alt={data.name} style={{}} />
        </ImageHolder>
        <h4>{data.name}</h4>
        <CountUp
          formattingFn={(value) =>
            Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
            }).format(value)
          }
          prefix="$ "
          separator=","
          duration={5}
          start={data.previousBid}
          end={data.currentBid || 0}
        />
      </center>
    </div>
  );
};

SingleAuctionItem.propTypes = {};

export default SingleAuctionItem;
