import styled from 'styled-components';


const StyledHeader = styled.div`
    height: 300px;
    background-color: ${props => props.theme.headerBg};
    background-image: url('${props=> props.image}');
    display: flex;
    flex-direction: column;
    justify-content: center;

    h1{
        font-size: 100px;
        color: white;
        line-height: 0.6em;
        font-family: Arizonia;
    }

`
const Header = (props) => {
  return (
        <StyledHeader image={props.image}>
      <center> <h1>  {props.title} </h1></center> 
        </StyledHeader>     
    )};

export default Header;