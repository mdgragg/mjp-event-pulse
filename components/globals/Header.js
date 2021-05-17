import styled from 'styled-components';
import MJP__SVG from './MJP__SVG';

const StyledHeader = styled.div`
  height: ${(props) => props.height};
  background-color: rgba(0, 0, 0, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: height 1s ease;
  z-index: 100;
  h3 {
    font-size: 20px;
    color: white;
    line-height: 0.6em;
    font-family: Avenir;
    letter-spacing: 6px;
    font-weight: 800;
    text-transform: uppercase;
  }
  && ::before {
    height: 100%;
    width: 100%;
    position: absolute;

    opacity: 0.6;
    /* background-attachment: fixed; */
    z-index: -1;
    background-size: cover;
    background-position: center center;
    content: '';
    background-image: url('${(props) => props.image}');
    top: 0;
  }
  && button {
    margin-top: 3rem;
  }
`;

const Logo = styled.div`
  width: 450px;
  min-height: inherit;
  margin: 0;
  text-align: center;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.75);
  padding: 10px 2.5rem;
`;
const Header = (props) => {
  return (
    <StyledHeader image={props.image} height={props.height || '40vh'}>
      <Logo>
        <MJP__SVG />
      </Logo>
      <h3> Virtual Events</h3>
      <button> Work With Us</button>
    </StyledHeader>
  );
};

export default Header;
