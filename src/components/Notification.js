import React from 'react';
import { useSelector } from 'react-redux';

const extraStyle = {
  width: 'auto',
  position: 'absolute',
  top: '1%',
  left: '30%',
  right: '30%',
};

const Notification = () => {
  const notification = useSelector(({ notification }) => notification);

  const { title, type } = notification;
  // console.log('notification', notification);
  return (
    title !== '' && (
      <div style={extraStyle} className={type}>
        {title}
      </div>
    )
  );
};

export default Notification;
