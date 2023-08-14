import {createStore, combineReducers} from 'redux';
import initialState from './initialState';
import adsReducer from './adsRedux';
import usersReducer from './usersRedux';

const subreducers = {
  ads: adsReducer,
  user: usersReducer
}

const reducer = combineReducers(subreducers);
const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;