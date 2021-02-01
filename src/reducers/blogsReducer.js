import blogsService from '../services/blogs';

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data;

    case 'NEW_BLOG':
      return [...state, action.data];

    case 'ADD_VOTE': {
      const anecdote = action.data;

      const updatedArr = state
        .map((a) => (a.id === anecdote.id ? anecdote : a))
        .sort((a, b) => parseFloat(b.votes) - parseFloat(a.votes));

      return updatedArr;
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
    const newBlog = await blogsService.createNew(blog);
    return dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    });
  };
};

export const addVote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await blogsService.addVote(anecdote);
    dispatch({
      type: 'ADD_VOTE',
      data: updatedAnecdote,
    });
  };
};

export default blogsReducer;
