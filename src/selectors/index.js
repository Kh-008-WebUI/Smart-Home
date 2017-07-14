import { createSelector } from 'reselect';
import { searchItem } from '../utils/utils';

const getFilterOption = state => state.searchAndFilter.filterOption;
const getDevices = state => state.devicesList.devices;
const getSearchValue = state => state.searchAndFilter.searchValue;

export const filterItems = createSelector(
  [getFilterOption, getSearchValue, getDevices],
  (filterOption, searchValue, items) => {
    let newArr = items;

    // console.log(newArr);

    if (filterOption === 'all') {
      newArr = items;
     // console.log(newArr);
    } else if (filterOption === 'on') {
      console.log(items);
      newArr = items.filter(item => item.status === true);
    } else if (filterOption === 'off') {
      console.log(items);
      newArr = items.filter(item => item.status === false);
      console.log(newArr);
    }
    return newArr.filter(item => searchItem(item, searchValue));
  }
);
