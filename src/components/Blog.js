import React, { useState } from 'react';
import { likeBlog, removeBlog } from '../reducers/blogsReducer';
import { useDispatch, useSelector } from 'react-redux';

const BlogStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  transition: '0.3s',
  margin: '1rem',
  padding: '1rem',
  borderRadius: '0.5rem',
};

const infoStyle = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
};

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const loggedUser = useSelector(({ user }) => user.id);

  // State only used by a single component that doesn't matter globally
  // and state for non critical UI elements can be local

  const [seeMore, setSeeMore] = useState(false);

  const { title, author, url, likes, user } = blog;

  // Service implementation for handling removal of blogs

  const handleRemove = async (blog) => {
    const { title, author, id } = blog;
    const confirmResult = window.confirm(
      `Are you sure you want to remove blog ${title} by ${author}?`
    );
    if (confirmResult) {
      dispatch(removeBlog(id));
    }
  };

  return (
    <div className='blog' style={BlogStyle}>
      <div>
        <span className='defaultInfo' style={{ marginRight: '1rem' }}>
          <i> {title}</i> by <strong>{author}</strong>
        </span>
        <button id='toggleInfo' onClick={() => setSeeMore(!seeMore)}>
          {seeMore ? 'Close' : 'More'}
        </button>
      </div>
      {seeMore && (
        <div className='extraInfo'>
          <br />
          <div className='linkDiv'>
            Link: <a href={url}>{url}</a>
          </div>
          <br />
          <div className='likesDiv' style={infoStyle}>
            Likes: {likes}
            <button
              id='likeButton'
              style={{ marginLeft: '0.5rem' }}
              onClick={() => dispatch(likeBlog(blog))}
            >
              Like
            </button>
          </div>
          <br />
          <div className='posterDiv'>Poster: {user.username}</div>
          <br />
          {loggedUser === user.id && (
            <button id='removeButton' onClick={() => handleRemove(blog)}>
              Remove
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
