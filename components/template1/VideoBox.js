import clsx from 'clsx'
import styled from 'styled-components';
import {Grid, Paper, Card} from '@material-ui/core';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import { useState, useEffect} from 'react'

import MenuIcon from '@material-ui/icons/Menu';

const StyledPaper = styled(Paper)` 
background-color: black;
padding: none;
border: none;
border-radius: none;
@media (max-width: 768px){
    background-color: rgba(0,0,0,0);
    box-shadow: none;
    border: none;
    margin: -1px -1px -1px -1px;
}
` ;

const CustomFrame = styled.iframe` 
    height: 100%;
    width: 100%;
    border: none;
` 

const VideoBox = (props) => {
   
    const StyledVideoBox = styled.div`
    height: ${props => props.theme.videoBoxHeight};
    background-color: rgba(0,0,0,0);
    @media (max-width: 768px){
    width: 100%;
    height: 350px;
    border-radius: 0;
}
    `;

    const [vidShow, setVidShow] = useState(true)

    const FilterVideo = () => {
        if(vidShow){
            return( 
                <CustomFrame src="https://player.vimeo.com/video/207173360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen/>
              
            )
        } else {
            return <h1> YED!</h1>
        }
    }


    return(
      
        <StyledPaper > 
        <StyledVideoBox>
       <FilterVideo/>
        </StyledVideoBox>
        </StyledPaper>

    )
}

export default VideoBox;