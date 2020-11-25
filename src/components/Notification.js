import React from 'react';

const extraStyle = {
  width: 'auto',
  position: 'absolute',
  top: '1%',
  left: '30%',
  right: '30%',
};

const Notification = ({ notification }) => {
  const { message, type } = notification;
  // console.log('notification', notification);
  return (
    <div style={extraStyle} className={type}>
      {message}
    </div>
  );
};

export default Notification;
