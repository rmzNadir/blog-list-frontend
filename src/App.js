import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';

// Services

import blogService from './services/blogs';
import loginService from './services/login';

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e) => {
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
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <h1>Log in to the app</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Username&nbsp;
          <input
            type="text"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          ></input>
        </div>
        <div>
          Password&nbsp;
          <input
            type="text"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          ></input>
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

const NewBlogForm = ({ setBlogs, blogs }) => {
  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: '',
  });

  const handleChange = ({ value }, property) => {
    let newObj = { ...blog };
    newObj[property] = value;
    setBlog(newObj);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setBlog({
      title: '',
      author: '',
      url: '',
    });
    try {
      const createBlog = await blogService.create(blog);
      let newBlogs = [...blogs];
      newBlogs.push(createBlog);
      setBlogs(newBlogs);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Title&nbsp;
          <input
            type="text"
            name="title"
            value={blog.title}
            onChange={({ target }) => handleChange(target, 'title')}
          ></input>
        </div>
        <div>
          Author&nbsp;
          <input
            type="text"
            name="author"
            value={blog.author}
            onChange={({ target }) => handleChange(target, 'author')}
          ></input>
        </div>
        <div>
          Url&nbsp;
          <input
            type="text"
            name="url"
            value={blog.url}
            onChange={({ target }) => handleChange(target, 'url')}
          ></input>
        </div>
        <button type="submit">Create</button>
      </form>
    </>
  );
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const userJSON = window.localStorage.getItem('user');
    if (userJSON) {
      const user = JSON.parse(userJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <>
      {!user && <LoginForm setUser={setUser} />}
      {user && (
        <>
          <h2>blogs</h2>
          <div>
            {user.name} logged in. &nbsp;
            <button onClick={handleLogout}>Logout</button>
            <br />
          </div>

          <NewBlogForm blogs={blogs} setBlogs={setBlogs} />
          <br />

          <div>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default App;
