import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CountUp from 'react-countup';
import Video__StickyTop__WithCoundown from '../../VideoBoxes/Video__StickyTop__WithCountdown';
const TheTotal = styled.div`
  position: relative;
  background-color: #f18a00;
  color: white;
  width: 99vw;
  height: 99vh;
  margin: auto;
  text-align: center;
  font-family: Sofia;
  border: 10px solid ${(props) => props.theme.lightOrange};
  font-size: 9rem;
  margin-bottom: 1rem;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 200;
  && .numbers {
    font-weight: 800;
  }
`;

const Total = ({ data }) => {
  const [total, setTotal] = useState(0);
  useEffect(() => {
    if (data) {
      setTotal(data.total);
    }
  }, [data]);

  return (
    <TheTotal>
      Total Raised
      <br />
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
