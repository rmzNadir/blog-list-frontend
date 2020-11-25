import React from 'react';
import PropTypes from 'prop-types';

const NewBlogForm = ({ handleChange, handleSubmit, setShowForm, blog }) => {
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

NewBlogForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setShowForm: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
};

export default NewBlogForm;
