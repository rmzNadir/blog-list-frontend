import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import NewBlogForm from './components/NewBlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import './App.css';

// Services

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        const allBlogs = await blogService.getAll();
        const sortedBlogs = allBlogs.sort(
          (blogA, blogB) => blogB.likes - blogA.likes
        );
        setBlogs(sortedBlogs);
      } catch (e) {
        console.log(e);
      }
    };
    const userJSON = window.localStorage.getItem('user');
    if (userJSON) {
      const user = JSON.parse(userJSON);
      setUser(user);
      blogService.setToken(user.token);
      handleNotification('success', `${user.username} successfully logged in`);
    }
    getAllBlogs();
  }, []);

  const handleLogout = () => {
    setShowForm(false);
    window.localStorage.removeItem('user');
    setUser(null);
    handleNotification('success', `${user.username} successfully logged out`);
  };

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

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('user', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      handleNotification('success', `${user.username} successfully logged in`);
    } catch (e) {
      handleNotification(
        'error',
        'Login failed, check your username and password'
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

  return (
    <>
      {notification && <Notification notification={notification} />}
      {!user && (
        <LoginForm
          handleLoginSubmit={handleLoginSubmit}
          username={username}
          password={password}
          handleLoginChange={handleLoginChange}
        />
      )}

      {user && (
        <>
          <h2>blogs</h2>
          <div>
            {user.name} logged in. &nbsp;
            <button onClick={handleLogout}>Logout</button>
            <br />
          </div>
          {showForm ? (
            <NewBlogForm
              blogs={blogs}
              setBlogs={setBlogs}
              handleNotification={handleNotification}
              setShowForm={setShowForm}
            />
          ) : (
            <>
              <br />
              <button onClick={() => setShowForm(true)}>New blog</button>
              <br />
            </>
          )}

          <br />

          <div>
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleNotification={handleNotification}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default App;
