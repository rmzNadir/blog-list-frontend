import React, { useState } from 'react';
import blogService from '../services/blogs';

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

const Blog = ({ blog, handleNotification, loggedUser, handleRemove }) => {
  const [seeMore, setSeeMore] = useState(false);
  const [Blog, setBlog] = useState({ ...blog });

  const { title, author, url, likes, user, id } = Blog;

  const handleLike = async (id) => {
    try {
      const updateBlog = await blogService.update(id, {
        ...Blog,
        user: user.id,
        likes: likes + 1,
      });
      const { data, success } = updateBlog;
      if (success) {
        setBlog({ ...data });
      }
      handleNotification('success', `You liked ${title} by ${author}`);
    } catch (e) {
      handleNotification('error', `Unable to like blog, something went wrong`);
      console.log(e);
    }
  };

  return (
    <div style={BlogStyle}>
      <div>
        <span style={{ marginRight: '1rem' }}>
          <i> {title}</i> by <strong>{author}</strong>
        </span>
        <button onClick={() => setSeeMore(!seeMore)}>
          {seeMore ? 'Close' : 'More'}
        </button>
      </div>
      {seeMore && (
        <div>
          <br />
          <div>
            Link: <a href={url}>{url}</a>
          </div>
          <br />
          <div style={infoStyle}>
            Likes: {likes}
            <button
              style={{ marginLeft: '0.5rem' }}
              onClick={() => handleLike(id)}
            >
              Like
            </button>
          </div>
          <br />
          <div>Poster: {user.username}</div>
          <br />
          {loggedUser === user.username && (
            <button onClick={() => handleRemove(blog)}>Remove</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
