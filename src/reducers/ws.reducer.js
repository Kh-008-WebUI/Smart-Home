import {
  UPDATE_CHART,
  UPDATE_CHAT
} from '../constants/index';

const initialState = {
  chart:[
    { day:'4-08', count:230 },
    { day:'4-09', count:480 },
    { day:'4-10', count:250 },
    { day:'4-11', count:380 },
    { day:'4-12', count:50 }
  ],
  chat:[
    { from:'System', msg:'Welcome to the chatroom' }
  ]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CHART:
      return {
        ...state,
        chart: action.data
      };
    case UPDATE_CHAT:
      return {
        ...state,
        chat: [...state.chat, action.data]
      };
    default:
      return state;
  }
};

export default reducer;
