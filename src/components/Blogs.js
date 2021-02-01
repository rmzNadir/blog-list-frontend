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

  // // Service implementation for adding likes to blogs

  // const handleLike = async (id) => {
  //   const blog = blogs.find((blog) => blog.id === id);
  //   const updatedBlog = { ...blog, user: user.id, likes: blog.likes + 1 };
  //   try {
  //     const updateBlog = await blogService.update(id, updatedBlog);
  //     const { data, success } = updateBlog;
  //     if (success) {
  //       const updatedBlogs = blogs.map((blog) =>
  //         blog.id === id ? data : blog
  //       );
  //       const sortedAndUpdated = updatedBlogs.sort(
  //         (blogA, blogB) => blogB.likes - blogA.likes
  //       );
  //       setBlogs(sortedAndUpdated);
  //     }
  //     handleNotification(
  //       'success',
  //       `You liked ${blog.title} by ${blog.author}`
  //     );
  //   } catch (e) {
  //     handleNotification('error', 'Unable to like blog, something went wrong');
  //     console.log(e);
  //   }
  // };

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          // handleNotification={handleNotification}
          // loggedUser={user.username}
          // handleRemove={handleRemove}
          // handleLike={handleLike}
        />
      ))}
    </div>
  );
};

export default Blogs;
