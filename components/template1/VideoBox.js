import clsx from 'clsx'
import styled from 'styled-components';
import {Grid, Card} from '@material-ui/core';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import { useState, useEffect} from 'react'

import MenuIcon from '@material-ui/icons/Menu';

const StyledCard = styled(Card)` 
background-color: #181818;
` ;

const CustomFrame = styled.iframe` 
    height: 100%;
    width: 100%;
` 

const VideoBox = (props) => {
   
    const StyledVideoBox = styled.div`
    height: ${props => props.theme.videoBoxHeight};
    background-color: rgba(0,0,0,0);
    `;

    const [vidShow, setVidShow] = useState(false)

    const FilterVideo = () => {
        if(vidShow){
            return( 
                // <CustomFrame src="https://player.vimeo.com/video/207173360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen/>
                <h1>NED!</h1>
            )
        } else {
            return <h1> YED!</h1>
        }
    }
    useEffect(()=>{
     setInterval(()=>{
            setVidShow(!vidShow)
        }, 1000);
  
    }, []);
    

    return(
      
        <StyledCard raised={true} > 
        <StyledVideoBox>
        {vidShow}
       <FilterVideo/>
        </StyledVideoBox>
        </StyledCard>

    )
}

export default VideoBox;