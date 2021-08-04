import React from 'react';
import styled from 'styled-components';

const TwoPart = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  min-height: 500px;
  && > div {
    margin: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  @media all and (max-width: 1000px) {
    grid-template-columns: 100%;
  }
`;

const ImageWrap = styled.div`
  position: relative;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  && img {
    max-width: 75%;
    margin: auto;
  }

  && button {
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    top: 70%;
    z-index: 2;
  }
`;
const YWCA_Body = () => {
  return (
    <>
      <hr />
      <TwoPart>
        <div>
          <h3>Donate Now</h3>
          <ImageWrap>
            <img
              src="https://www.ywcacolumbus.org/wp-content/uploads/sites/63/DSC_1546.jpg"
              alt="YWCA women standing on stage accepting award"
            />
            <a
              href=" https://www.ywcacolumbus.org/get-involved/donate-now/donate-now-women-of-achievement/"
              target="_blank"
            >
              <button>Donate Now</button>
            </a>
          </ImageWrap>
        </div>
        <div>
          <h3>Share Your Feedback</h3>
          <ImageWrap>
            <img
              src="https://www.ywcacolumbus.org/wp-content/uploads/sites/63/DSC_1375.jpg"
              alt="YWCA women hugging on stage"
            />
            <a href="https://forms.gle/vugeV1CMZqJ5mZXN7" target="_blank">
              <button className="btn"> Fill Out The Survey</button>
            </a>
          </ImageWrap>
        </div>
      </TwoPart>
    </>
  );
};

export default YWCA_Body;
