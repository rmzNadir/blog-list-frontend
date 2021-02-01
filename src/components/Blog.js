import React, { useState } from 'react';
import { likeBlog } from '../reducers/blogsReducer';
import { useDispatch } from 'react-redux';

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

const Blog = ({ blog, loggedUser, handleRemove }) => {
  const dispatch = useDispatch();
  const [seeMore, setSeeMore] = useState(false);

  const { title, author, url, likes, user, id } = blog;

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
          {loggedUser === user.username && (
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
