const ws = require('../index');

module.exports = function () {
  const data = [
    { day:'02/11/2016', count:180 },
    { day:'02/1/2016', count:250 },
    { day:'02/10/2016', count:83 },
    { day:'02/24/2016', count:430 },
    { day:'02/15/2016', count:140 },
    { day:'02/27/2016', count:310 },
    { day:'02/17/2016', count:430 },
    { day:'02/8/2016', count:180 },
    { day:'02/19/2016', count:150 },
    { day:'02/2/2016', count:180 },
    { day:'02/3/2016', count:250 }
  ];
  console.log('lets go');
  setInterval(function () {
    sendChartData(ws, data);
    data.push(generateData());
  }, 20000);
}

function generateData() {
  const count = Math.floor(Math.random() * 500) + 1;
  const day = '03/'+(Math.floor(Math.random() * 31) +1)+'/2016';
  return {
    day,
    count
  }
}

function sendChartData(ws, data) {
  ws.send(JSON.stringify({ type: 'SEND_DATA', data }));
}
