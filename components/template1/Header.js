import  styled  from 'styled-components';
import React from 'react';


const StyledHeader = styled.div`
height: ${props => props.theme.headerHeight};
width: 100%;
display: flex;
align-items: center;
/* justify-content: space-around; */
padding: 2em;
background-color: ${props => props.theme.headerBg};
`
const Header = (props) => {
    return (
        <StyledHeader>
                {props.children}
        </StyledHeader>
    );
};

export default Header;