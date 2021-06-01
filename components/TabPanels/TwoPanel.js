import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, memoizedData, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{
        height: '100%',
        visibilty: value === index ? 'unset' : 'hidden',
      }}
    >
      <Box style={{ height: '100%' }}>{memoizedData}</Box>
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    height: '100%',
    '& .MuiTabs-indicator': {
      backgroundColor: '#ff5ef4',
    },
    '& .MuiBox-root': {
      height: '100%',
    },
  },
}));

export default function SimpleTabs({ data }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const memoData = useMemo(() => {
    return [data[0], data[1]];
  }, [data[0].content, data[1].content]);

  const handleChange = (event, newValue) => {
    // console.log(event, newValue);
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          {data.map((d, index) => (
            <Tab label={d.title} {...a11yProps(index)} key={`tab--${index}`} />
          ))}
        </Tabs>
      </AppBar>

      {memoData &&
        data.map((d, index) => (
          <TabPanel
            value={value}
            index={index}
            key={`tab-panel--${index}`}
            memoizedData={data[index].content}
          ></TabPanel>
        ))}
    </div>
  );
}
