
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

const rootReducer = (state={}, action) => {
  switch (action.type) {
    case 'TEST_SIGNIN_ACTION':
      console.log('Receive action', action);
      return { ...state, user: action.payload }
    default:
      return state;
  }
}

export default combineReducers({
  rootReducer,
  form: formReducer
});
