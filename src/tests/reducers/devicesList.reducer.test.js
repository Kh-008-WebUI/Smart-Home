import { devicesList } from '../../reducers/devicesList.reducer';
import {
  LOAD_DEVICE_SUCCESS,
  DELETE_DEVICE_SUCCESS,
  LOAD_DEVICES_SUCCESS,
  RESET_DEVICE,
  UPDATE_DEVICE_SETTINGS_SUCCESS,
  UPDATE_DEVICE_SUCCESS } from '../../constants/index';

const initialState = {
  filterOption: 'all',
  searchValue: '',
  device: { items:[] },
  uploadStatus: '',
  devices: [],
  errorText: '',
  errorStatus: 0
};

const devices = [{
  _id : '599c8094258df03990fae071',
  name : 'Device Test',
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
  _id : '589c8094258df03990foe071',
  name : 'Device Test2',
  location : 'Roof',
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
}];

const device =
  {
    _id : '599c8094258df03990fae071',
    name : 'Device Test',
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
  };

describe('DeviceList Reducer', () => {
  it('has a default state', () => {
    expect(devicesList(undefined,
      { type: 'unexpected' })).toEqual(initialState);
  });

  it('load device success', () => {
    const expectedState = initialState;

    expectedState.device = device;
    expectedState.uploadStatus = 'DONE';

    expect(devicesList(undefined,
      {
        type: LOAD_DEVICE_SUCCESS,
        device
      }
    )).toEqual(expectedState);
  });

  it('delete device success', () => {
    const state = initialState;

    state.devices = [...devices];
    const currentDevice = devices[1];
    const expectedState = Object.assign({}, state);

    expectedState.devices = devices.filter((item) => {
      return item._id !== currentDevice._id;
    });

    expect(devicesList(state,
      {
        type: DELETE_DEVICE_SUCCESS,
        id: currentDevice._id
      }
    )).toEqual(expectedState);
  });

  it('load devices success', () => {
    const expectedState = Object.assign({}, initialState);

    expectedState.uploadStatus = 'DONE';
    expectedState.devices = [...devices];

    expect(devicesList(initialState,
      {
        type: LOAD_DEVICES_SUCCESS,
        devices: devices
      }
    )).toEqual(expectedState);
  });

  it('reset device', () => {
    const currentState = Object.assign({}, initialState);

    currentState.device = device;
    const expectedState = Object.assign({}, initialState);

    expectedState.device = {};

    expect(devicesList(currentState,
      {
        type: RESET_DEVICE
      }
    )).toEqual(expectedState);
  });

  it('update device settings', () => {
    const currentState = Object.assign({}, initialState);

    currentState.device = Object.assign({}, device);
    currentState.devices = [...devices];

    const expectedState = Object.assign({}, initialState);

    const updatedDevice = devices[1];

    updatedDevice.items[0].data = true;

    expectedState.devices = devices;
    expectedState.device = updatedDevice;

    expect(devicesList(currentState,
      {
        type: UPDATE_DEVICE_SETTINGS_SUCCESS,
        device: updatedDevice
      }
    )).toEqual(expectedState);
  });

  it('update device ', () => {
    const currentState = Object.assign({}, initialState);

    currentState.device = Object.assign({}, device);
    currentState.devices = [...devices];

    const expectedState = Object.assign({}, initialState);

    const updatedDevice = devices[1];

    updatedDevice.status = false;
    updatedDevice.location = 'Living Room';
    expectedState.devices = devices;
    expectedState.device = updatedDevice;

    expect(devicesList(currentState,
      {
        type: UPDATE_DEVICE_SUCCESS,
        device: updatedDevice
      }
    )).toEqual(expectedState);
  });
});
