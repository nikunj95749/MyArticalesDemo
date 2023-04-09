import produce from 'immer';

const GET_USER_DATA = 'GET_USER_DATA';

const initialState = {
  user_data: {},
};

// reducer
export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_USER_DATA:
        draft.user_data = action.payload;
        break;
    }
  });

export const getUserData = (data = []) => ({
  type: GET_USER_DATA,
  payload: data,
});
