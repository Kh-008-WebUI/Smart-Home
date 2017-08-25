import React from 'react'
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import DevicesSection from '../components/DevisesSection/DevisesSection';
import configureStore from 'redux-mock-store';
import {createStore} from 'redux';

const state = {
  searchAndFilter: {
    filterOption: 'all',
    searchValue: ''
  },
  devicesList: {
    devices: [
      {
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
      }
    ]
  }
};
const mockStore = configureStore()
let store,container

describe('DevicesSection Snapshot', () => {
  beforeEach(()=>{
    store = mockStore(state);
    container = shallow(<DevicesSection store={store} />)
  })

  it ('capturing Snapshot of DevicesSection', () => {
    expect(container).toMatchSnapshot();
  })
});