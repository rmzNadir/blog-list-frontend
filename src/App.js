import React, { useEffect } from 'react';

// Components

import Blogs from './components/Blogs';
import NewBlogForm from './components/NewBlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import { useDispatch, useSelector } from 'react-redux';

// Styles

import './App.css';

// Services

import { initializeBlogs } from './reducers/blogsReducer';
import { setNotification } from './reducers/notificationReducer';
import { initializeUser, logoutUser } from './reducers/userReducer';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUser());
  }, [dispatch]);

  // Service implementation for handling user logouts

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(
      setNotification(
        {
          type: 'success',
          title: `${user.username} successfully logged out`,
        },
        5
      )
    );
  };

  return (
    <>
      <Notification />
      {!user && <LoginForm />}
      {user && (
        <>
          <h2>blogs</h2>
          <div>
            {user.name} logged in. &nbsp;
            <button onClick={handleLogout}>Logout</button>
            <br />
          </div>

          <NewBlogForm />

          <br />

          <Blogs />
        </>
      )}
    </>
  );
};

export default App;
