import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { IconButton } from '@material-ui/core';
import styled from 'styled-components';
import ScheduleItem from './ScheduleItem';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
  className: PropTypes.string,
};

function a11yProps(index) {
  return {
    id: `event-tab-${index}`,
    'aria-controls': `event-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const EventAppBar = styled(AppBar)`
  background-color: #181818;
`;

const AppTab = styled(Tab)`
  background-color: ${(props) => props.theme.primary};
`;

export default function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <EventAppBar className="MuiBox-root" position="static">
        <Tabs
          value={value}
          variant="fullWidth"
          onChange={handleChange}
          aria-label="event tabs"
        >
          <AppTab label="Schedule" {...a11yProps(0)} />
          <AppTab label="Chat" {...a11yProps(1)} />
        </Tabs>
      </EventAppBar>
      <TabPanel value={value} index={0} style={{ overflow: 'scroll' }}>
        <ScheduleItem />
        <ScheduleItem />
        <ScheduleItem />
        <ScheduleItem />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
    </div>
  );
}
