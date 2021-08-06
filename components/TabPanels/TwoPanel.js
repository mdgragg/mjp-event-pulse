import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';

const StyledAppBar = styled(AppBar)`
  background-color: ${(props) => props.theme.colors.secondary};
  && .Mui-selected {
    background-color: ${(props) => props.theme.colors.tertiary};
  }
  && .MuiTabs-indicator {
    background-color: ${(props) => props.theme.colors.primary};
  }
`;
const TabBarHolder = styled.div`
  height: 100%;
  width: 100%;
`;

const MyTabPanel = styled(TabPanel)`
  height: 100%;
  background-color: ${(props) => props.theme.secondary};
`;

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
        visibilty: value === index ? 'visible' : 'hidden',
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

export default function SimpleTabs({ data }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    // console.log(event, newValue);
    setValue(newValue);
  };
  if (!data) return <></>;
  return (
    <TabBarHolder>
      <StyledAppBar position="sticky">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          variant="scrollable"
          scrollButtons="auto"
        >
          {data.map((d, index) => (
            <Tab label={d.title} {...a11yProps(index)} key={`tab--${index}`} />
          ))}
        </Tabs>
      </StyledAppBar>

      {data &&
        data.map((d, index) => (
          <MyTabPanel
            value={value}
            index={index}
            key={`tab-panel--${index}`}
            memoizedData={data[index].content}
          ></MyTabPanel>
        ))}
    </TabBarHolder>
  );
}
