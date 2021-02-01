import React from 'react';
import { useSelector } from 'react-redux';
import Blog from './Blog';

const Blogs = () => {
  const blogs = useSelector(({ blogs }) => blogs);

  // Service implementation for handling removal of blogs

  // const handleRemove = async (blog) => {
  //   const { title, author, id } = blog;
  //   const confirmResult = window.confirm(
  //     `Are you sure you want to remove blog ${title} by ${author}?`
  //   );
  //   if (confirmResult) {
  //     try {
  //       const deleteBlog = await blogService.remove(id);
  //       if (deleteBlog.success) {
  //         const oldBlogs = [...blogs];
  //         const newBlogs = oldBlogs.filter((blog) => blog.id !== id);
  //         setBlogs(newBlogs);
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  // };

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          // loggedUser={user.username}
          // handleRemove={handleRemove}
          // handleLike={handleLike}
        />
      ))}
    </div>
  );
};

export default Blogs;
