import searchAndFilter from './searchAndFilter.reducer';
import { combineReducers } from 'redux';
import builder from './builder.reducer';
import devicesList from './devicesList.reducer';
import { loadUsersReducer } from './users.reducer';
import notificationsReducer from './notifications.reducer';

const rootReducer = combineReducers({
  searchAndFilter,
  builder,
  devicesList,
  loadUsersReducer,
  notificationsReducer
});

export default rootReducer;
