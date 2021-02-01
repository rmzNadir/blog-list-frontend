import { setNotification } from '../reducers/notificationReducer';
import blogService from '../services/blogs';

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT_USER':
      return action.data;

    case 'LOGIN_USER':
      return action.data;

    case 'LOGOUT_USER':
      return null;

    default:
      return state;
  }
};

export const initializeUser = () => {
  return async (dispatch) => {
    const userJSON = window.localStorage.getItem('user');
    if (userJSON) {
      const user = JSON.parse(userJSON);

      dispatch({
        type: 'INIT_USER',
        data: user,
      });

      blogService.setToken(user.token);

      dispatch(
        setNotification(
          {
            type: 'success',
            title: `${user.username} successfully logged in`,
          },
          5
        )
      );
    }
  };
};

export const loginUser = (user) => {
  return async (dispatch) => {
    dispatch({
      type: 'LOGIN_USER',
      data: user,
    });
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('user');
    dispatch({
      type: 'LOGOUT_USER',
    });
  };
};

export default userReducer;
