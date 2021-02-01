const notificationReducer = (state = { title: '', type: '' }, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.content;
    case 'REMOVE_NOTIFICATION':
      return { title: '', type: '' };
    default:
      return state;
  }
};

let timer;

export const setNotification = (content, duration) => {
  return (dispatch) => {
    // Timer gets cleaned so every notification has the same duration.
    clearTimeout(timer);

    dispatch({
      type: 'SET_NOTIFICATION',
      content,
    });

    timer = setTimeout(
      () => {
        dispatch({ type: 'REMOVE_NOTIFICATION' });
      },
      duration ? duration * 1000 : 5000
    );
  };
};

export default notificationReducer;
