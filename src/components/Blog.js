import React, { useState } from 'react';

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

const Blog = ({ blog, handleLike, loggedUser, handleRemove }) => {
  const [seeMore, setSeeMore] = useState(false);

  const { title, author, url, likes, user, id } = blog;

  return (
    <div className="blog" style={BlogStyle}>
      <div>
        <span className="defaultInfo" style={{ marginRight: '1rem' }}>
          <i> {title}</i> by <strong>{author}</strong>
        </span>
        <button className="toggleInfo" onClick={() => setSeeMore(!seeMore)}>
          {seeMore ? 'Close' : 'More'}
        </button>
      </div>
      {seeMore && (
        <div className="extraInfo">
          <br />
          <div className="linkDiv">
            Link: <a href={url}>{url}</a>
          </div>
          <br />
          <div className="likesDiv" style={infoStyle}>
            Likes: {likes}
            <button
              className="likeButton"
              style={{ marginLeft: '0.5rem' }}
              onClick={() => handleLike(id)}
            >
              Like
            </button>
          </div>
          <br />
          <div className="posterDiv">Poster: {user.username}</div>
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
