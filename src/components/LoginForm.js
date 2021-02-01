import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import blogService from '../services/blogs';
import loginService from '../services/login';
import { setNotification } from '../reducers/notificationReducer';
import { loginUser } from '../reducers/userReducer';

const LoginForm = () => {
  const dispatch = useDispatch();

  // State only used by a single component that doesn't matter globally
  // and state for non critical UI elements can be local

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Service implementation for handling user logins

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('user', JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(loginUser(user));

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

  const handleLoginChange = (e, type) => {
    if (type === 'username') {
      setUsername(e.target.value);
    }
    if (type === 'password') {
      setPassword(e.target.value);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleLogin(username, password);
    setUsername('');
    setPassword('');
  };
  return (
    <>
      <h1 className='loginTitle'>Log in to the app</h1>
      <form onSubmit={(e) => handleFormSubmit(e)}>
        <div>
          Username&nbsp;
          <input
            id='username'
            type='text'
            name='username'
            value={username}
            onChange={(e) => handleLoginChange(e, 'username')}
          ></input>
        </div>
        <div>
          Password&nbsp;
          <input
            id='password'
            type='password'
            name='password'
            value={password}
            onChange={(e) => handleLoginChange(e, 'password')}
          ></input>
        </div>
        <button id='submitButton' type='submit'>
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
