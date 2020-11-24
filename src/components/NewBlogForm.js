import React, { useState } from 'react';
import blogService from '../services/blogs';

const NewBlogForm = ({ setBlogs, blogs, handleNotification, setShowForm }) => {
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
    setShowForm(false);
    e.preventDefault();
    try {
      const createBlog = await blogService.create(blog);
      setBlog({
        title: '',
        author: '',
        url: '',
      });
      let newBlogs = [...blogs];
      newBlogs.push(createBlog);
      setBlogs(newBlogs);
      handleNotification('success', `blog ${blog.title} successfully created`);
    } catch (e) {
      handleNotification(
        'error',
        `Unable to save blog, please verify that every field is filled before saving a new blog`
      );
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
        <button type="submit">Create</button>&nbsp;
        <button type="reset" onClick={() => setShowForm(false)}>
          Cancel
        </button>
      </form>
    </>
  );
};

export default NewBlogForm;
