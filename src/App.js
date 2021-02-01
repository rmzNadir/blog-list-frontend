import React, { useState, useEffect } from 'react';

// Components

import Blogs from './components/Blogs';
import NewBlogForm from './components/NewBlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import { initializeBlogs } from './reducers/blogsReducer';
import { useDispatch } from 'react-redux';

// Styles

import './App.css';

// Services

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    dispatch(initializeBlogs());

    const userJSON = window.localStorage.getItem('user');
    if (userJSON) {
      const user = JSON.parse(userJSON);
      setUser(user);
      blogService.setToken(user.token);
      handleNotification('success', `${user.username} successfully logged in`);
    }
  }, [dispatch]);

  /* ------------------------ Services ------------------------ */

  const handleNotification = (type, message) => {
    const notificationObject = {
      message,
      type,
    };
    setNotification(notificationObject);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Service implementation for handling user logins

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('user', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);

      handleNotification('success', `${user.username} successfully logged in`);
    } catch (e) {
      handleNotification(
        'error',
        'Login failed, check your username and password'
      );
      console.log(e);
    }
  };

  // Service implementation for handling user logouts

  const handleLogout = () => {
    window.localStorage.removeItem('user');
    setUser(null);
    handleNotification('success', `${user.username} successfully logged out`);
  };

  return (
    <>
      {notification && <Notification notification={notification} />}
      {!user && <LoginForm handleLogin={handleLogin} />}

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
