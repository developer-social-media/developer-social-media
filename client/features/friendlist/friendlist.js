import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { fetchUserAsync, selectUser } from "../single_user/singleUserSlice";
import { Avatar } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';

function TabPanel(props) {
  const { children, value, index, ...other } = props



  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function FriendList() {
  const [value, setValue] = React.useState(0);
  const user = useSelector(selectUser)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab sx={{ width: '50%' }} label="Friends" {...a11yProps(0)} />
          <Tab sx={{ width: '50%' }} label="Projects" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {user.friends && user.friends.length ?
          user.friends.map((friend) =>
            <Link key={`friendlist-${Math.floor(Math.random() * 10000)}`} to={`/users/${friend.id}`}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                width='35px'
                height='auto' 
                crossOrigin='true'
                alt='avatar'
                style={{borderRadius: '50%', marginLeft: '5px'}} 
                src={friend.img_url}

                />
                <div style={{ marginLeft: '10px' }}>{friend.first_name} {friend.last_name}</div>
              </div></Link>
          ) : null}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {user.projects && user.projects.length ?
          user.projects.map((project) =>
            <Link key={`project-list-${Math.floor(Math.random() * 10000)}`} to={`/project/${project.id}`}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <CodeIcon />
                <div style={{ marginLeft: '10px' }} >{project.project_name}</div>
              </div>
            </Link>
          ) : null}
      </TabPanel>
      <TabPanel value={value} index={2}>

      </TabPanel>
    </Box>
  );
}
