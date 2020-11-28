import React, { useState, useEffect } from 'react';

// Components

import Blog from './components/Blog';
import NewBlogForm from './components/NewBlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';

// Styles

import './App.css';

// Services

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        const allBlogs = await blogService.getAll();
        setBlogs(allBlogs);
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

  // Service implementation for handling removal of blogs

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

  // Service implementation for adding likes to blogs

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
        const sortedAndUpdated = updatedBlogs.sort(
          (blogA, blogB) => blogB.likes - blogA.likes
        );
        setBlogs(sortedAndUpdated);
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

  // Service implementation for creating a new blog

  const createBlog = async (blog) => {
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
      {!user && <LoginForm handleLogin={handleLogin} />}

      {user && (
        <>
          <h2>blogs</h2>
          <div>
            {user.name} logged in. &nbsp;
            <button onClick={handleLogout}>Logout</button>
            <br />
          </div>

          <NewBlogForm createBlog={createBlog} />

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
