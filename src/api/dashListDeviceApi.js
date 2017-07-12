import devices from '../data/data.json';

const deviceList = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(devices);
  }, 2000);
});

export default deviceList;
