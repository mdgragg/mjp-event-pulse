import React from 'react';
import styled from 'styled-components';

import Banner_ImgBg from 'components/Banners/Banner_ImgBg.js';

const Wrap = styled.div`
  margin-top: 3rem;
  margin-bottom: 3rem;
  @media all and (max-width: 868px) {
    margin-top: 180px;
  }
`;
const Inner = styled.div`
  && .box {
    background-color: white;
    box-shadow: 0px 0px 20px -14px black;
    width: max-content;
    margin: auto;
    padding: 2rem;
    transition: all 0.2s ease;
  }
  && .box:hover {
    transform: scale(1.1);
    box-shadow: 0px 0px 20px -8px black;
  }
  min-height: 600px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  h2 {
    font-size: 2.5rem;
  }
  && p {
    max-width: 480px;
    margin: 2rem auto;
    font-size: 1.75rem;
  }
  && button {
    background-color: ${(props) => props.theme.blue};
    color: white;
    min-width: 150px;
    font-size: 1rem;
    padding: 1rem 2rem;
  }
  && button:hover {
    background-color: ${(props) => props.theme.green};
    transform: scale(1.05);
  }
  @media all and (max-width: 868px) {
    width: 90%;

    margin: auto;
    && .box {
      width: auto;
    }
    h2 {
      font-size: 2rem;
    }
    && p {
      max-width: 60%;
      margin: 1rem auto;
      font-size: 1.5rem;
    }
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
  @media all and (max-width: 768px) {
    min-height: 300px;
  }
  @media all and (max-width: 500px) {
    && p {
      max-width: 90%;
      margin: 1rem auto;
      font-size: 1.5rem;
    }
  }
`;

const MainProgram = ({ theme, main_event }) => {
  return (
    <Wrap>
      <Banner_ImgBg
        color={theme.blue}
        imgSrc={`https://storage.googleapis.com/mjp-stream-public/2021-jfcs-faces-of-inspiration/main-event.png`}
      >
        <Inner>
          <div className="box">
            <h2>Main Program Recording</h2>

            <p style={{}}>
              Enjoy the celebration honoring Jan and Craig Sher and other
              inspiring heroes of Gulf Coast JFCS.
            </p>
            <a href={main_event.streamLinks[0].url} target="_blank">
              <button>View Recording</button>
            </a>
          </div>
        </Inner>
      </Banner_ImgBg>
    </Wrap>
  );
};

export default MainProgram;
