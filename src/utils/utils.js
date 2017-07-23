export function searchItem (item, searchValue) {
  const result = item.name.toLowerCase()
    .includes(searchValue.toLowerCase().trim());

  return result;
}

export const queryFromObject = (params) => {
  let queries = '?';

  for (const key of Object.keys(params)) {
    if (params[key]) {
      queries += `${key}=${params[key]}&`;
    }
  }
  return queries.slice(0, -1);
};

export const sortDevicesByLocations = (devices) => {
  const locations = devices.reduce((location, device) => {
    if (typeof location[device.location] !== 'object') {
      location[device.location] = [];
    }
    location[device.location].push(device);
    return location;
  }, {});

  return locations;
};
