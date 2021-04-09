import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Grow from '@material-ui/core/Grow';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));
const CircleNameHolder = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  && .name-holder {
    color: ${(props) => props.textColor};

    font-size: 1.25rem;
    font-weight: 600;
    text-align: center;
    max-width: 250px;
  }
  && .name-holder h4 {
    margin: 1rem auto 0 auto;
  }
  && .name-holder p {
    font-size: 0.95rem;
    margin: 0;
  }
`;
const CircleImg = styled.img`
  display: inline;
  max-height: 180px;
  width: auto;
  border-radius: 90px;
`;
export default function CircleSpeaker(props) {
  const growRef = useRef();

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [isScrolled, setScrolled] = React.useState(false);

  const handleScroll = (e) => {
    let offset_elem = growRef.current.getBoundingClientRect().top;
    if (window.scrollY >= offset_elem - 500) {
      setScrolled(true);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grow
      ref={growRef}
      in={isScrolled}
      {...(isScrolled ? { timeout: props.timeout || 0 } : {})}
    >
      <CircleNameHolder textColor={props.textColor}>
        {props.noPic ? (
          ''
        ) : (
          <CircleImg
            className="speaker-image"
            src={props.imgSrc || 'https://placehold.co/500x500'}
          />
        )}
        <div className="name-holder">{props.children}</div>
      </CircleNameHolder>
    </Grow>
  );
}
