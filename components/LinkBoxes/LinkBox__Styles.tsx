import styled from 'styled-components';

export const StyledPlaceholder__Wrap = styled.div`
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
`;
