import  styled, {ThemeContext}  from 'styled-components';
import React from 'react';


const StyledHeader = styled.div`
height: ${props => props.theme.headerHeight};
width: 100%;
display: flex;
align-items: center;
position: ${props => props.static};
z-index: 100;
margin-top:  ${props => props.offset}px;
/* justify-content: space-around; */

background-color: ${props => props.theme.headerBg};
`
const Header = (props) => {

    const [isStatic, setStatic] = React.useState('fixed')
    const [offset, setOffset] = React.useState(0)
    const themeContext = React.useContext(ThemeContext);

    const heroHeight = themeContext.heroHeight.slice(0,-2) - themeContext.headerHeight.slice(0,-2);

    const handleScroll = (e) => {
        if(window.scrollY > heroHeight){ 
          setStatic('absolute')
          setOffset(heroHeight)
        } else {
            setStatic('fixed')
            setOffset(0)
        }
       
      }
      React.useEffect(()=>{
        window.addEventListener('scroll', handleScroll)
      })

    return (
        <StyledHeader static={isStatic} offset={offset}>
                {props.children}
        </StyledHeader>
    );
};

export default Header;