import React, { memo, useEffect, useMemo, useRef, useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';

const TabBarHolder = styled.div`
  max-height: 800px;
  width: 100%;
`;

const StyledAppBar = styled(AppBar)`
  background-color: ${(props) => props.theme.colors.secondary};
  z-index: 999;
  && .Mui-selected {
    background-color: ${(props) => props.theme.colors.tertiary};
  }
  && .MuiTabs-indicator {
    background-color: ${(props) => props.theme.colors.primary};
  }
`;

const MyTabPanel = styled(TabPanel)`
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
      <Box>{memoizedData}</Box>
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function SimpleTabs({ data, initialTab = 0 }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(initialTab);
  }, [initialTab]);

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
