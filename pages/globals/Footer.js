import  styled  from 'styled-components';
import React from 'react';


const StyledFooter = styled.div`
/* padding: 2em; */
width: 100%;
background-color: ${props => props.theme.footerBg};
height: 80px;
color: white;
display: grid;
grid-template-columns: 1fr 1fr 1fr;
.signoff{
    margin-top: 50px;
}
`
const Footer = (props) => {
    return (
        <StyledFooter>
                {props.children}
        </StyledFooter>
    );
};

export default Footer;