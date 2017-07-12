import searchAndFilter from './searchAndFilter.reducer';
import { combineReducers } from 'redux';
import settings from './builder.reducer';
import addStatus from './addDevice.reducer';
import devicesList from './devicesList.reducer';
import loadUsersReducer from './loadUsersReducer';
const rootReducer = combineReducers({
  searchAndFilter,
  settings,
  addStatus,
  devicesList
});

export default rootReducer;
