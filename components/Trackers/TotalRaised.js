import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';
import styled from 'styled-components';

const ThermWrap = styled.div`
  margin-top: 80px;
  margin-bottom: 80px;
  height: auto;

  && > h3 {
    color: white;
    font-size: 2.5rem;
    margin: 1rem auto;
    /* margin-left: calc(${(props) => props.width} - 40px); */
    text-align: center;
    transition: margin-left 3s ease;
  }
`;

const TheTherm = styled.div`
  width: 100%;
  height: 50px;
  background: linear-gradient(#fff, #f3f3f4, #f3f3f4);
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.5);
  border-radius: 50px;
  position: relative;
  && ul {
    position: absolute;
    display: flex;
    width: 105%;
    left: -26px;
    justify-content: space-between;
    bottom: -55px;
  }
  && li {
    display: inline;
    font-weight: 600;
    color: white;
    position: relative;
    ::before {
      position: absolute;
      margin-left: auto;
      margin-right: auto;
      top: -30px;
      right: 50%;
      margin: auto;
      width: 2px;
      border-radius: 20px;
      height: 20px;
      background-color: grey;
      content: '';
    }
  }
`;

const Filler = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: calc(${(props) => props.width} + 2.6%);
  min-width: 2.6%;
  background: #aabc66;
  background: linear-gradient(
    126deg,
    rgba(170, 188, 102, 1) 12%,
    rgba(176, 207, 59, 1) 100%
  );

  border-bottom-left-radius: 50px;
  border-top-left-radius: 50px;

  transition: width 3.5s cubic-bezier(0.19, 1, 0.22, 1);
`;

const GivingTherm = ({ endpoint, goal, element }) => {
  const [percentFilled, setPercentFilled] = useState({
    total_raised: 0,
  });

  const [data, setData] = useState(null);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    if (endpoint && !listening) {
      const events = new EventSource(endpoint);
      events.onmessage = (e) => {
        const parsedData = JSON.parse(e.data);
        setData((data) => ({
          parsedData,
        }));
        const { percent, total_raised } = calcPercentFilled(parsedData.total);
        setPercentFilled({ percent, total_raised });
      };
      setListening(true);
    }
  }, [listening]);

  function calcPercentFilled(amount) {
    const parsed_amount = parseInt(amount, 10);
    return {
      total_raised: parsed_amount,
    };
  }

  return (
    <h3>
      <CountUp
        formattingFn={(value) =>
          Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
          }).format(value) + ' Raised'
        }
        prefix="$ "
        separator=","
        duration={5}
        end={percentFilled.total_raised}
        preserveValue={true}
      />
    </h3>
  );
};

GivingTherm.propTypes = {};

export default GivingTherm;
