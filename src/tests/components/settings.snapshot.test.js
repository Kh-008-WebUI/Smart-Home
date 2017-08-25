import React from 'react';
import ToggleSettings from '../../components/ToggleSettings/ToggleSettings';
import SelectLocation from '../../components/SelectLocation/SelectLocation';
import RangeSettings from '../../components/RangeSettings/Range';
import renderer from 'react-test-renderer';

const locations = [
  {
  "_id": {
        "$oid": "59940beedfa2e10840ef5eac"
    },
    "value": "kitchen",
    "label": "Kitchen",
    "__v": 0
},
{
    "_id": {
        "$oid": "59940bf3dfa2e10840ef5ead"
    },
    "value": "roof",
    "label": "Roof",
    "__v": 0
},
{
    "_id": {
        "$oid": "599413dd9a6f1117dc4fe6a2"
    },
    "value": "parking",
    "label": "Parking",
    "__v": 0
}
];

describe('Settings UI test', () => {
it('ToggleSettings', () => {
  const component = renderer.create(
      <ToggleSettings
              setItemValue={jest.fn()}
              onChange={jest.fn()}/>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
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
      <RangeSettings
            setItemValue={jest.fn()}/>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})

});
