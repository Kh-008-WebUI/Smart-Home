import { CHANGE_FILTER_OPTION } from '../constants/index';
import { SEARCH_ITEM } from '../constants/index';

export const searchAction = (searchValue) => ({
  type: SEARCH_ITEM,
  searchValue
});

export const filterAction = (filterOption) => {
  return {
    type: CHANGE_FILTER_OPTION,
    filterOption
  };
};
