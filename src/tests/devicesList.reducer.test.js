import { devicesList } from '../reducers/devicesList.reducer';
import { LOAD_DEVICE_SUCCESS, DELETE_DEVICE_SUCCESS } from '../constants/index';

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
        'maxValue' : 100,
        'minValue' : 0
      },
      data : 50,
      name : 'Range'
    }
  ],
  views : 1
},
{
_id : '589c8094258df03990fae071',
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
      'maxValue' : 100,
      'minValue' : 0
    },
    data : 50,
    name : 'Range'
  }
],
views : 1
}]

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
        'maxValue' : 100,
        'minValue' : 0
      },
      data : 50,
      name : 'Range'
    }
  ],
  views : 1
};

describe('DeviceList Reducer', () => {
  it('has a default state', () => {
    expect(devicesList(undefined, { type: 'unexpected' })).toEqual(initialState);
  });

  it('load device success', () => {
    let expectedState = initialState;
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
    let expectedState = initialState;
    expectedState.device = device;

    let device = devices.filter((item) => {
      return item._id !== '599c8094258df03990fae071'});

    expect(devicesList('599c8094258df03990fae071',
      {
        type: DELETE_DEVICE_SUCCESS,
        device
      }
    )).toEqual(device);
  })
});
