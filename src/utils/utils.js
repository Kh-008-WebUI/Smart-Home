export function searchItem (item, searchValue) {
  const result = item.name.toLowerCase()
    .includes(searchValue.toLowerCase().trim());

  return result;
}

export const queryFromObject = (params) => {
  const queries = [];

  for (const key of Object.keys(params)) {
    if (params[key]) {
      queries.push(`${key}=${params[key]}`);
    }
  }
  return `?${queries.join('&')}`;
};

export const sortDevicesByLocations = (devices) => {
  return devices.reduce((location, device) => {
    if (!location[device.location]) {
      location[device.location] = [];
    }
    location[device.location].push(device);

    return location;
  }, {});
};
