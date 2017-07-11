import searchAndFilter from './searchAndFilter.reducer';
import { combineReducers } from 'redux';
import settings from './builder.reducer';
import devices from './addDevice.reducer';
import devicesList from './devicesList.reducer';

const rootReducer = combineReducers({
  searchAndFilter,
  settings,
  devices,
  devicesList
});

export default rootReducer;
