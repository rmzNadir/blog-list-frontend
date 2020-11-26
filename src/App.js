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

  const handleRemove = async (blog) => {
    const { title, author, id } = blog;
    const confirmResult = window.confirm(
      `Are you sure you want to remove blog ${title} by ${author}?`
    );
    if (confirmResult) {
      try {
        const deleteBlog = await blogService.remove(id);
        if (deleteBlog.success) {
          const oldBlogs = [...blogs];
          const newBlogs = oldBlogs.filter((blog) => blog.id !== id);
          setBlogs(newBlogs);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleLike = async (id) => {
    const blog = blogs.find((blog) => blog.id === id);
    const updatedBlog = { ...blog, user: user.id, likes: blog.likes + 1 };
    try {
      const updateBlog = await blogService.update(id, updatedBlog);
      const { data, success } = updateBlog;
      if (success) {
        const updatedBlogs = blogs.map((blog) =>
          blog.id === id ? data : blog
        );
        setBlogs(updatedBlogs);
      }
      handleNotification(
        'success',
        `You liked ${blog.title} by ${blog.author}`
      );
    } catch (e) {
      handleNotification('error', 'Unable to like blog, something went wrong');
      console.log(e);
    }
  };

  // Service for creating a new blog

  const addBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog);
      setBlogs(blogs.concat(newBlog));
      handleNotification(
        'success',
        `blog ${newBlog.title} successfully created`
      );
    } catch (e) {
      handleNotification(
        'error',
        'Unable to save blog, please verify that every field is filled before saving a new blog'
      );
      console.log(e);
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

          <NewBlogForm addBlog={addBlog} />

          <br />

          <div>
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleNotification={handleNotification}
                loggedUser={user.username}
                handleRemove={handleRemove}
                handleLike={handleLike}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default App;
