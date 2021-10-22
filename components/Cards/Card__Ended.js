import { makeStyles } from '@material-ui/core';
import { Card } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  root: {
    minHeight: '450px',
    padding: '5%',
    minWidth: '400px',
  },
});
const Card__Ended = () => {
  const classes = useStyles();
  return <Card className={classes.root}>This Event Has Endedddd</Card>;
};

export default Card__Ended;
