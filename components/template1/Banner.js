import  styled  from 'styled-components';
import React from 'react';


const StyledBanner = styled.div`
height: 300px;
width: 100%;
margin-top: 2em;
left: 0;
background-color: #0E1621;
`;

const Banner = (props) => {
    return (
        <StyledBanner>
                {props.children}
        </StyledBanner>
    );
};

export default Banner;