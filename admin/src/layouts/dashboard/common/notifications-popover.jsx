import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { set, sub } from 'date-fns';
import { faker } from '@faker-js/faker';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import { useNavigate } from "react-router-dom";

import { fToNow } from 'src/utils/format-time';
import {getAllHotels} from "../../../env"
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import axios from 'axios';
import {getUserById} from "../../../env"

// ----------------------------------------------------------------------



export default function NotificationsPopover() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  const totalNotifications = notifications.length;

  const [open, setOpen] = useState(null);
  const [unreadCount, setUnreadCount] = useState(notifications.length);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };
  

  const handleClose = () => {
    setOpen(null);
  };

  const fetchHotels = async () => {
    try {
      const response = await axios.get(getAllHotels);
      setNotifications(response.data);
      setUnreadCount(response.data.length);
    } catch (error) {
      console.log(error);
    }
  };
  const handlePostNotification = () => {
  
    setUnreadCount(prevCount => prevCount + 1);
  };
  useEffect(()=>{
    fetchHotels()
    handleMarkAllAsRead()
  },[])
  

  const handleMarkAsRead = (notificationId) => {
    const notificationIndex = notifications.findIndex(notification => notification.id === notificationId);
    if (notificationIndex !== -1) {
      const newNotifications = [...notifications];
      newNotifications[notificationIndex] = { ...newNotifications[notificationIndex], isUnRead: false };
      setNotifications(newNotifications);
    }
  
    
    setUnreadCount(prevCount => prevCount - 1);
  };
  const handleMarkAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({ ...notification, isUnRead: false }));
    setNotifications(updatedNotifications);
    setUnreadCount(0);
  };
  
  const handleLogout = () => {
    navigate("/");
  };

  return (
    <>
    <h4 style={{color:"rgb(17, 38, 120)",marginRight:20,cursor:"pointer"}} onClick={handleLogout}>Log out</h4>
      <IconButton color={open ? 'primary' : 'default'} onClick={handleOpen}>
      <Badge badgeContent={unreadCount} color="error">
  <Iconify width={24} icon="solar:bell-bing-bold-duotone" />
</Badge>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
  You have {unreadCount} unread messages
</Typography>
            </Typography>
          </Box>

          {totalNotifications > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                New
              </ListSubheader>
            }
          >
            {notifications.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </List>

          {/* <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                Before that
              </ListSubheader>
            }
          >
            {notifications.slice(2, 5).map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </List> */}
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            View All
          </Button>
        </Box>
      </Popover>
    </>
  );
}

// ----------------------------------------------------------------------

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    createdAt: PropTypes.instanceOf(Date),
    id: PropTypes.string,
    isUnRead: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    avatar: PropTypes.any,
  }),
};



function NotificationItem({ notification }) {
  
  const [owner,setOwner]=useState([])
  // console.log("owner",notification.ownerId);
 
  

  const getOwner=async(id)=>{
    try {
      const response=await axios.get(`${getUserById}/${id}`)
      setOwner(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    
      getOwner(notification.ownerId);
    
  }, [notification]);

  const { avatar, title } = renderContent(notification);

  return (
    <ListItemButton 
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification.isUnRead && {
          bgcolor: 'action.selected',
        }),
      }}
    >
    
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled',
            }}
      >
            {"By "+owner.firstName+" "+owner.lastName}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2">
      {notification.title}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {notification.name}
      </Typography>
    </Typography>
  );

  
    return {
      avatar: <img alt={notification.name} src={notification.imgUrl} />,
      title,
    };
  
}
