import React from 'react';
import DeviceListItem from '../../components/DeviceListItem/DeviceListItem';
import { Device } from '../../components/Device/Device';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router';

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

describe('Devices UI test', () => {
  it('DeviceListItem', () => {
    const component = renderer.create(
      <MemoryRouter>
        <DeviceListItem data={device} location={device.location}
                        changeStatus={jest.fn()}
                        setPopupShown={jest.fn()}/>
      </MemoryRouter>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Device', () => {
    const component = renderer.create(
      <MemoryRouter>
        <Device device={device}
                setItemValue={jest.fn()}
                onStatusChange={jest.fn()}/>
      </MemoryRouter>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
