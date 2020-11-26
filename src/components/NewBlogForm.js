import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NewBlogForm = ({ addBlog }) => {
  const [showForm, setShowForm] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  });

  const { title, author, url } = newBlog;

  const handleNewBlogChange = ({ value }, property) => {
    let newObj = { ...newBlog };
    newObj[property] = value;
    setNewBlog(newObj);
  };

  const handleSubmitBlog = async (e) => {
    e.preventDefault();
    setShowForm(false);
    addBlog(newBlog);
    setNewBlog({
      title: '',
      author: '',
      url: '',
    });
  };

  return (
    <>
      {showForm ? (
        <>
          <h2>Create new</h2>
          <form id="newBlogForm" onSubmit={(e) => handleSubmitBlog(e)}>
            <div>
              Title&nbsp;
              <input
                id="titleInput"
                type="text"
                name="title"
                value={title}
                onChange={({ target }) => handleNewBlogChange(target, 'title')}
              ></input>
            </div>
            <div>
              Author&nbsp;
              <input
                id="authorInput"
                type="text"
                name="author"
                value={author}
                onChange={({ target }) => handleNewBlogChange(target, 'author')}
              ></input>
            </div>
            <div>
              Url&nbsp;
              <input
                id="urlInput"
                type="text"
                name="url"
                value={url}
                onChange={({ target }) => handleNewBlogChange(target, 'url')}
              ></input>
            </div>
            <button type="submit">Create</button>
            &nbsp;
            <button type="reset" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </form>
        </>
      ) : (
        <>
          <br />
          <button id="showForm" onClick={() => setShowForm(true)}>
            New blog
          </button>
          <br />
        </>
      )}
    </>
  );
};

NewBlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
};

export default NewBlogForm;
