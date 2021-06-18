import React from 'react';
import styled from 'styled-components';
import CountUp from 'react-countup';
import Video__StickyTop__WithCoundown from '../../VideoBoxes/Video__StickyTop__WithCountdown';
const TheTotal = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.purple};
  color: white;
  max-width: 350px;
  margin: auto;
  text-align: center;
  font-family: Akzidenz-Grotesque-Bold;
  border: 10px solid ${(props) => props.theme.lightOrange};
  font-size: 1.25rem;
  margin-bottom: 1rem;
  padding: 10px;
  && .numbers {
    font-size: 2rem;
  }
  && ::before {
    /* box-sizing: content-box; */
    position: absolute;
    height: calc(100% + 15px);
    width: calc(100% + 15px);
    top: -8px;
    left: -8px;
    content: '';
    border: 6px dotted white;
  }
`;

const Total = ({ total = 223243 }) => {
  return (
    <TheTotal>
      Total Raised: <br />
      <span className="numbers">
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
          duration={2}
          start={10}
          end={total}
          preserveValue={true}
        />
      </span>
    </TheTotal>
  );
};

export default Total;
