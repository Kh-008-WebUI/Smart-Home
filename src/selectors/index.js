import { createSelector } from 'reselect';
import { searchItem } from '../utils/utils';

const getFilterOption = state => state.searchAndFilter.filterOption;
const getDevices = state => state.devicesList.devices;
const getSearchValue = state => state.searchAndFilter.searchValue;

export const filterItems = createSelector(
  [getFilterOption, getSearchValue, getDevices],
  (filterOption, searchValue, items) => {
    let newArr = [];

    if (filterOption === 'all') {
      newArr = items;
    } else if (filterOption === 'on') {
      newArr = items.filter(item => item.status === true);
    } else if (filterOption === 'off') {
      newArr = items.filter(item => item.status === false);
    }
    return newArr.filter(item => searchItem(item, searchValue));
  }
);
