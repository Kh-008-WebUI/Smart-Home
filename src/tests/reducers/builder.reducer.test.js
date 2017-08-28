import reducer, { initialState } from '../../reducers/builder.reducer';
import * as types from '../../constants/index';

const items = [{
  name: 'item test',
  data: false
}];
const initialStateWithItem = { ...initialState };
const locations = [
  {
    _id:0,
    value: 'roof',
    label: 'Roof'
  }
];
initialStateWithItem.device = {...initialStateWithItem.device, items };

describe('builder reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })
  it('should handle ADD_ITEM', () => {
    const result = { ...initialState };
    result.device = {...result.device, items };
    expect(
      reducer(initialState, {
        type: types.ADD_ITEM,
        item: items[0]
      })
    ).toEqual(result)
  })
  it('should handle SET', () => {
    const result = { ...initialState };
    result.device = {...result.device, name:items[0].name };
    expect(
      reducer(initialState, {
        type: types.SET,
        name: 'name',
        value: items[0].name
      })
    ).toEqual(result)
  })
  it('should handle DELETE_ITEM', () => {
    expect(
      reducer(initialStateWithItem, {
        type: types.DELETE_ITEM,
        id: 0
      })
    ).toEqual(initialState)
  })
  it('should handle ADD_ITEM_DESCRIPTION', () => {
    const result = { ...initialStateWithItem };
    result.device.items[0] = {
      ...result.device.items[0],
      description:items[0].name
    };
    expect(
      reducer(initialStateWithItem, {
        type: types.ADD_ITEM_DESCRIPTION,
        id: 0,
        value: items[0].name
      })
    ).toEqual(result)
  })
  it('should handle SET_ITEM_VALUE', () => {
    const result = { ...initialStateWithItem };
    result.device.items[0] = {
      ...result.device.items[0],
      data: true
    };
    expect(
      reducer(initialStateWithItem, {
        type: types.SET_ITEM_VALUE,
        id: 0,
        value: true
      })
    ).toEqual(result)
  })
  it('should handle ADD_LOCATION_SUCCESS', () => {
    const result = { ...initialState };
    result.locations = [ ...locations ];
    expect(
      reducer(initialState, {
        type: types.ADD_LOCATION_SUCCESS,
        location:locations[0]
      })
    ).toEqual(result)
  })
})