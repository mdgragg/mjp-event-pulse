import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';
import { useContext } from 'react';
import { BoxedCounter, Counter__JustNumbers } from 'components/Counters';
import { Button__Primary } from 'components/Buttons';

const PlaceholderImage = styled.img`
  width: 100%;
  height: auto;
  position: relative;
  z-index: 1;
  margin-top: 7px;
`;

const PlaceholderContent = styled.div`
  position: absolute;
  color: red;
  height: 100%;
  width: 90%;
  display: grid;
  grid-template-columns: 50% 50%;
  z-index: 1000;
  align-items: center;
  top: 0;
  margin: auto;
  && div.logo-counter__div {
    height: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  && img.logo {
    width: 50%;
  }
  && .counter--numbers {
    display: none;
  }
  @media all and (max-width: 1200px) {
    && .counter {
      display: none;
    }
    && img.logo {
      width: 80%;
    }
    && .counter--numbers {
      display: block;
      margin: 1rem auto;
      width: 80%;

      font-size: 3vw;
      color: ${(props) => props.theme.colors.green};
      font-weight: 800;
      text-align: center;
    }
  }
`;
const VideoPlaceholder = ({ main_event }: any) => {
  const theme: any = useContext(ThemeContext);

  return (
    <div>
      <PlaceholderImage src={theme.header_image} />
      <PlaceholderContent>
        <div className="logo-counter__div">
          <img className="logo" src={main_event.LogoLink[1].Media.url} />
          <BoxedCounter event={main_event} className="counter" />
          <div className="counter--numbers">
            <Counter__JustNumbers event={main_event} />
          </div>
        </div>
        <div></div>
      </PlaceholderContent>
    </div>
  );
};

VideoPlaceholder.propTypes = {};

export default VideoPlaceholder;
