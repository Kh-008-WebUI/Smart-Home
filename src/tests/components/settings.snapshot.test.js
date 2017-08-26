import React from 'react';
import ToggleSettings from '../../components/ToggleSettings/ToggleSettings';
import SelectLocation from '../../components/SelectLocation/SelectLocation';
import RangeSettings from '../../components/RangeSettings/Range';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

const locations = [
  {
    _id:'59940beedfa2e10840ef5eac',
    value: 'kitchen',
    label: 'Kitchen',
  },
  {
    _id:'59940bf3dfa2e10840ef5ead',
    value: 'roof',
    label: 'Roof'
  },
  {
    _id: '599413dd9a6f1117dc4fe6a2',
    value: 'parking',
    label: 'Parking'
  }
];

describe('Settings UI test', () => {
  it('ToggleSettings', () => {
    const toggle = shallow(
      <ToggleSettings />
    );

    const rendered = toggle.find('input');

    expect(rendered.html().indexOf('checked={false}')).toEqual(-1);
  });

  it('SelectLocation', () => {
    const component = renderer.create(
      <SelectLocation
            selectLocation={jest.array}
            locations= {locations}
            addLocation={jest.fn()}
            deleteLocation={jest.fn()}
            defaultLocation='Kitchen'
            deviceExistInLocation={jest.fn()}
            deviceInLocation={jest.array}/>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('RangeSettings', () => {
    const component = renderer.create(
      <RangeSettings/>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
