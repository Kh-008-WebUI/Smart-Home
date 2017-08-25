import { filterItems } from '../selectors';

const state = {
  searchAndFilter: {
    filterOption: 'all',
    searchValue: ''
  },
  devicesList: {
    devices: [{
      _id : '599c8094258df03990fae071',
      name : 'Device Test',
      location : 'Parking',
      status : false,
      createdDate : 'August 22, 2017',
      createdBy : 'Bruce',
      items : [
        {
          description : 'Toggle',
          data : false,
          name : 'Toggle'
        },
        {
          description : 'Value',
          data : 'hello there',
          name : 'Value'
        },
        {
          description : 50,
          params : {
            maxValue : 100,
            minValue : 0
          },
          data : 50,
          name : 'Range'
        }
      ],
      views : 1
    },
    {
      _id : '589c8094258df03990fae071',
      name : 'Device Test 2',
      location : 'Parking',
      status : true,
      createdDate : 'August 22, 2017',
      createdBy : 'Bruce',
      items : [
        {
          description : 'Toggle',
          data : false,
          name : 'Toggle'
        },
        {
          description : 'Value',
          data : 'hello there',
          name : 'Value'
        },
        {
          description : 50,
          params : {
            maxValue : 100,
            minValue : 0
          },
          data : 50,
          name : 'Range'
        }
      ],
      views : 1
    },
    {
      _id : '589c8094258df03990fae071',
      name : 'Device Test 3',
      location : 'Parking',
      status : false,
      createdDate : 'August 22, 2017',
      createdBy : 'Bruce',
      items : [
        {
          description : 'Toggle',
          data : false,
          name : 'Toggle'
        },
        {
          description : 'Value',
          data : 'hello there',
          name : 'Value'
        },
        {
          description : 50,
          params : {
            maxValue : 100,
            minValue : 0
          },
          data : 50,
          name : 'Range'
        }
      ],
      views : 1
    },
    {
      _id : '589c8094258df03990fae071',
      name : 'Device Test 4',
      location : 'Parking',
      status : false,
      createdDate : 'August 22, 2017',
      createdBy : 'Bruce',
      items : [
        {
          description : 'Toggle',
          data : false,
          name : 'Toggle'
        },
        {
          description : 'Value',
          data : 'hello there',
          name : 'Value'
        },
        {
          description : 50,
          params : {
            maxValue : 100,
            minValue : 0
          },
          data : 50,
          name : 'Range'
        }
      ],
      views : 1
    },
    {
      _id : '589c8094258df03990fae073',
      name : 'Device Test 5',
      location : 'Parking',
      status : true,
      createdDate : 'August 22, 2017',
      createdBy : 'Bruce',
      items : [
        {
          description : 'Toggle',
          data : false,
          name : 'Toggle'
        },
        {
          description : 'Value',
          data : 'hello there',
          name : 'Value'
        },
        {
          description : 50,
          params : {
            maxValue : 100,
            minValue : 0
          },
          data : 50,
          name : 'Range'
        }
      ],
      views : 1
    }]
  }
};

describe (`Filtering device by status.`, () => {
    it (`Select all the devices (with true and false status).`,() => {
      const devices = state.devicesList.devices;

      expect(filterItems(state)).toEqual(devices)
    });
    it (`Select the devices with true status.`,() => {
      const devices = state.devicesList.devices;
      const expectedStatusTrue = devices.filter(item => item.status  === true);
      const stateStatusTrue = Object.assign({}, state, state.searchAndFilter.filterOption = 'on');

      expect(filterItems(stateStatusTrue)).toEqual(expectedStatusTrue)
    });
    it (`Select the devices with false status.`,() => {
      const devices = state.devicesList.devices;
      const expectedStatusFalse = devices.filter(item => item.status  === false);
      const stateStatusFalse = Object.assign({}, state, state.searchAndFilter.filterOption = 'off');

      expect(filterItems(stateStatusFalse)).toEqual(expectedStatusFalse)
    });
});