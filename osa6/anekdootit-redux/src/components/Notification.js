import React from 'react'
import { connect } from 'react-redux';

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  console.log('PROPSIT', props);

  if (props.notification === undefined) {
    return null;
  } else {
    return (
      <div style={style}>
        {props.notification}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notifications.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification);

export default ConnectedNotification;