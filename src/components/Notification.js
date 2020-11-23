import React from 'react';

const Notification = ({ notification }) => {
  const { message, type } = notification;
  // console.log('notification', notification);
  return <div className={type}>{message}</div>;
};

export default Notification;
