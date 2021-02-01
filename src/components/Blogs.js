import React from 'react';
import { useSelector } from 'react-redux';
import Blog from './Blog';

const Blogs = () => {
  const blogs = useSelector(({ blogs }) => blogs);

  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
