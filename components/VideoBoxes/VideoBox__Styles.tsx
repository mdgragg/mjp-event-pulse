import styled from 'styled-components';

export const StyledVideoPlaceholder__Wrap = styled.div`
  position: relative;
  overflow: hidden;
  box-shadow: var(--mjp-shadow);
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */

  @media (max-width: 768px) {
    width: 100%;
    border-radius: 0;
  }
`;

export const StyledStickyTopVideoPlaceholder = styled.div`
  /* height: inherit; */
  width: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  overflow: hidden;
  box-shadow: var(--mjp-shadow);
  &&.fixed {
    height: auto;
    padding-top: 56.25%; /* 16:9 */
    display: block;
    z-index: 1000;
  }

  &&.fixed > div {
    position: fixed;
    top: 2%;
    left: 2%;
    width: 96%;
    max-width: 350px;
    height: auto;
    z-index: 1000;
    padding: 0;
    border-radius: 0;
  }

  @media all and (max-width: 768px) {
    &&.fixed > div {
      width: 96%;
      max-width: 96%;
    }
  }
`;

export const StyledPlaceholder__Inner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: var(--mjp-shadow);
`;

export const VideoPlaceholder = styled.div`
  height: inherit;
  width: 100%;
  background-color: rgba(0, 0, 0, 0);
  overflow: hidden;
`;

export const StyledIFrame = styled.iframe`
  border: none;
`;

export const StyledPaper = styled.div`
  min-width: inherit;
  padding: 0;
  border: none;
  border-radius: 0;
  box-shadow: var(--mjp-shadow);
  &&.fixed {
    position: fixed;
    top: 2%;
    left: 2%;
    width: 96%;
    height: auto;
    z-index: 100;
    padding: 0;
    border-radius: 0;
  }
  @media (max-width: 768px) {
    background-color: rgba(0, 0, 0, 0);
    box-shadow: none;
    border: none;
    margin: -1px -1px -1px -1px;
  }
`;

export const StyledVideoBox = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
  && > iframe {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
  @media (max-width: 768px) {
    width: 100%;
    border-radius: 0;
  }
`;
