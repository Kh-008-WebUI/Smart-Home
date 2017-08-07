import {
  UPDATE_CHART
} from '../constants/index';

const initialState = {
  data:[
    { day:'02/11/2016', count:180 },
    { day:'02/1/2016', count:250 },
    { day:'02/10/2016', count:83 },
    { day:'02/24/2016', count:430 },
    { day:'02/15/2016', count:140 }
  ]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CHART:
      return {
        ...state,
        data: action.data
      };
    default:
      return state;
  }
};

export default reducer;
