import searchAndFilter from './searchAndFilter.reducer';
import { combineReducers } from 'redux';
import builder from './builder.reducer';
import devicesList from './devicesList.reducer';
import loadUsersReducer from './loadUsersReducer';
import notificationsReduser from './notificationsReducer';

const rootReducer = combineReducers({
  searchAndFilter,
  builder,
  devicesList,
  loadUsersReducer,
  notificationsReduser
});

export default rootReducer;
