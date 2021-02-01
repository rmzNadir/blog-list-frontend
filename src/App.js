import React, { useState, useEffect } from 'react';

// Components

import Blogs from './components/Blogs';
import NewBlogForm from './components/NewBlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import { initializeBlogs } from './reducers/blogsReducer';
import { setNotification } from './reducers/notificationReducer';
import { useDispatch } from 'react-redux';

// Styles

import './App.css';

// Services

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  useEffect(() => {
    dispatch(initializeBlogs());

    const userJSON = window.localStorage.getItem('user');
    if (userJSON) {
      const user = JSON.parse(userJSON);
      setUser(user);
      blogService.setToken(user.token);
      dispatch(
        setNotification(
          {
            type: 'success',
            title: `${user.username} successfully logged in`,
          },
          5
        )
      );
    }
  }, [dispatch]);

  /* ------------------------ Services ------------------------ */

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

      dispatch(
        setNotification(
          {
            type: 'success',
            title: `${user.username} successfully logged in`,
          },
          5
        )
      );
    } catch (e) {
      dispatch(
        setNotification(
          {
            type: 'error',
            title: 'Login failed, check your username and password',
          },
          5
        )
      );

      console.log(e);
    }
  };

  // Service implementation for handling user logouts

  const handleLogout = () => {
    window.localStorage.removeItem('user');
    setUser(null);
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
