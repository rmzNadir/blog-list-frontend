import React from 'react';

const LoginForm = ({ handleLoginSubmit, username, password, handleChange }) => {
  return (
    <>
      <h1>Log in to the app</h1>
      <form onSubmit={handleLoginSubmit}>
        <div>
          Username&nbsp;
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => handleChange(e, 'username')}
          ></input>
        </div>
        <div>
          Password&nbsp;
          <input
            type="text"
            name="password"
            value={password}
            onChange={(e) => handleChange(e, 'password')}
          ></input>
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
