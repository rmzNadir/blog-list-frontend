import React, { useState } from 'react';

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
      <h1>Log in to the app</h1>
      <form onSubmit={(e) => handleFormSubmit(e)}>
        <div>
          Username&nbsp;
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => handleLoginChange(e, 'username')}
          ></input>
        </div>
        <div>
          Password&nbsp;
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => handleLoginChange(e, 'password')}
          ></input>
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
