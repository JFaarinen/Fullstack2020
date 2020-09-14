import React from 'react'
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(state => state.notifications.notification);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notification === undefined) {
    return null;
  } else {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
}

export default Notification;