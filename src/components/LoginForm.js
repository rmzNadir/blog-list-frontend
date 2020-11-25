import React from 'react';

const LoginForm = ({
  handleLoginSubmit,
  username,
  password,
  handleLoginChange,
}) => {
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
