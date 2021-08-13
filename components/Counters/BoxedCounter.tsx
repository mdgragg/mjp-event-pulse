import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Variants } from 'types/Styled__Types';
import useCalculateRemaining from '../../hooks/useCalculateRemaining';
import { default_theme } from '../Themes/default.theme';

const makeStyles = (variant, selector, theme) => {
  console.log(theme);
  const variantObj = {
    // primary: {
    //   backgroundColor: theme.colors.primary,
    //   foregroundColor: theme.colors.secondary,
    // },
    // secondary: {
    //   backgroundColor: theme.colors.secondary,
    //   foregroundColor: theme.colors.tertiary,
    // },
    // inverted: {
    //   backgroundColor: theme.colors.primary,
    //   foregroundColor: theme.colors.tertiary,
    // },
  };

  return 'black';
};

const Wrap = styled.div`
  width: 100%;
  max-width: 700px;
  margin: auto;
  text-align: center;
`;

const Title = styled.div`
  text-transform: uppercase;
  color: ${(props) => props.styles.textColor || props.theme.colors.primary};
  font-family: Gotham;
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: 2px;
  /* margin: 1rem auto; */
  padding: 0.75rem 0;
`;
const Box = styled.div`
  font-family: Avenir;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: auto;
  flex-wrap: wrap;
  color: ${(props) => props.styles.textColor || props.theme.colors.primary};
  && > div.box {
    height: 0;
    padding-top: 20%;
    min-width: 50px;
    min-height: 50px;
    width: 20%;
    background-color: ${(props) =>
      props.styles.boxColor || props.theme.colors.secondary};
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    justify-content: center;
  }

  && .digit {
    position: absolute;
    top: 20%;
    font-weight: 600;
    font-size: clamp(22px, 5vw, 2.5rem);
    line-height: clamp(24px, 5vw, 2.5rem);
  }
  && .delimiter {
    position: absolute;
    top: 70%;
    font-size: clamp(10px, 1.5vw, 1.25rem);
    line-height: clamp(10px, 1.5vw, 1.25rem);
    font-weight: 800;
    letter-spacing: 2px;
    text-transform: uppercase;
  }
`;

type BoxedCounter__Props = {
  event: {};
  styles?: {
    boxColor?: string;
    textColor?: string;
  };
  prefix?: React.ReactNode | string;
  variant?: Variants;
};

const BoxedCounter = ({
  event,
  styles,
  prefix,
  variant = Variants.primary,
}: BoxedCounter__Props): JSX.Element | null => {
  const obj = useCalculateRemaining(event);

  if (!obj) {
    return null;
  }
  if (obj.parsed_until_end <= 0) {
    return (
      <Wrap>
        <Title>This Event Has Ended</Title>
      </Wrap>
    );
  }
  if (obj.total_remaining <= 0) {
    return (
      <Wrap>
        <Title>Live Now!</Title>
      </Wrap>
    );
  }

  if (obj) {
    return (
      <Wrap>
        {prefix && <Title styles={styles}>{prefix}</Title>}
        <Box styles={styles}>
          <div className="numday box">
            <div className="digit"> {obj.days} </div>
            <div className="delimiter"> {obj.days > 1 ? 'Days' : 'Day'}</div>
          </div>
          <div className="numhours box">
            <div className="digit"> {obj.hours} </div>
            <div className="delimiter ">
              {obj.hours === 1 ? 'Hour' : 'Hours'}
            </div>
          </div>

          <div className="numminutes box">
            <div className="digit">{obj.minutes}</div>
            <div className="delimiter ">
              {obj.minutes === 1 ? 'Min' : 'Mins'}
            </div>
          </div>
          <div className="numseconds box ">
            <div className="digit"> {obj.seconds}</div>
            <div className=" delimiter ">Sec</div>
          </div>
        </Box>
      </Wrap>
    );
  }
};

BoxedCounter.defaultProps = {
  theme: default_theme,
  event: {
    eventStartEnd: {
      StartDateTime: null,
      EndDateTime: null,
    },
  },
};

export default BoxedCounter;