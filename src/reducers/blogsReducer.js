import blogsService from '../services/blogs';
import { setNotification } from '../reducers/notificationReducer';

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data;

    case 'NEW_BLOG':
      return [...state, action.data];

    case 'LIKE_BLOG': {
      const blog = action.data;

      const updatedArr = state
        .map((a) => (a.id === blog.id ? blog : a))
        .sort((a, b) => parseFloat(b.likes) - parseFloat(a.likes));

      return updatedArr;
    }
    case 'REMOVE_BLOG': {
      const id = action.data;

      return state.filter((blog) => blog.id !== id);
    }

    default:
      return state;
  }
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll();
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    });
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogsService.createNew(blog);
      dispatch(
        setNotification(
          {
            type: 'success',
            title: `blog ${newBlog.title} successfully created`,
          },
          5
        )
      );
      return dispatch({
        type: 'NEW_BLOG',
        data: newBlog,
      });
    } catch (e) {
      dispatch(
        setNotification(
          {
            type: 'error',
            title:
              'Unable to save blog, please verify that every field is filled before saving a new blog',
          },
          5
        )
      );
    }
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogsService.addLike(blog);

      dispatch(
        setNotification(
          {
            type: 'success',
            title: `You liked ${blog.title} by ${blog.author}`,
          },
          5
        )
      );

      return dispatch({
        type: 'LIKE_BLOG',
        data: updatedBlog,
      });
    } catch (e) {
      console.log(e);
      dispatch(
        setNotification(
          {
            type: 'error',
            title: 'Unable to like blog, something went wrong',
          },
          5
        )
      );
    }
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    try {
      const deleteBlog = await blogsService.remove(id);
      const { success } = deleteBlog;
      if (success) {
        dispatch(
          setNotification(
            {
              type: 'success',
              title: 'Blog successfully deleted',
            },
            5
          )
        );
        dispatch({
          type: 'REMOVE_BLOG',
          data: id,
        });
      } else {
        dispatch(
          setNotification(
            {
              type: 'error',
              title: 'Unable to delete blog, something went wrong',
            },
            5
          )
        );
      }
    } catch (e) {
      dispatch(
        setNotification(
          {
            type: 'error',
            title: 'Unable to delete blog, something went wrong',
          },
          5
        )
      );
      console.log(e);
    }
  };
};

export default blogsReducer;
