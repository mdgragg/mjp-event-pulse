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
  color: ${(props) =>
    props.styles?.textColor || props.theme.palette.text.secondary};
  font-family: ${(props) => props.theme.fonts.body.fontFamily};
  background-color: ${(props) =>
    props.styles?.boxColor || props.theme.palette.background.secondary};
  font-size: 1.5rem;
  font-weight: 800;
  width: max-content;
  padding: 0.5rem 1rem;
  margin: auto;
  letter-spacing: 2px;
  /* margin: 1rem auto; */
`;

const StyledPrefix = styled(Title)`
  color: ${(props) =>
    props.styles?.boxColor || props.theme.palette.background.secondary};
  background-color: unset;
`;
const Box = styled.div`
  font-family: ${(props) => props.theme.fonts.body.fontFamily};
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
  flex-wrap: wrap;
  margin: auto;
  color: ${(props) =>
    props.styles?.textColor || props.theme.palette.text.secondary};

  && .section {
    display: inline-flex;
    flex-wrap: wrap;
  }
  && div.box {
    box-shadow: var(--mjp-shadow);
    height: 0;
    padding-top: 20%;
    min-width: 70px;
    min-height: 70px;
    width: 20%;
    margin: 0.25rem;
    background-color: ${(props) =>
      props.styles?.boxColor || props.theme.palette.background.secondary};
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
    font-size: clamp(18px, 160%, 3rem);
    line-height: clamp(12px, 9vw, 1.5rem);
  }
  && .delimiter {
    font-family: Avenir;
    position: absolute;
    top: 70%;
    font-size: clamp(1px, 70%, 2.5rem);
    line-height: clamp(10px, 8vw, 1rem);
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
  [x: string]: any;
};

const BoxedCounter = ({
  event,
  styles,
  prefix,
  variant = Variants.primary,
  ...other
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
      <Wrap {...other}>
        {prefix && <StyledPrefix styles={styles}>{prefix}</StyledPrefix>}
        <Box styles={styles}>
          <div className="section">
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
          </div>
          <div className="section">
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
