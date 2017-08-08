const ws = require('../index');

module.exports = function () {
  const data = [
    { day:'02/26/2017', count:310 },
    { day:'02/27/2017', count:430 },
    { day:'02/28/2017', count:180 },
    { day:'02/29/2017', count:150 },
    { day:'02/30/2017', count:180 },
    { day:'02/31/2017', count:250 }
  ];

  let day = 1;
  let month = 3;
  setInterval(function () {
    sendChartData(ws, data);
    data.push(generateData(day, month));
    data.shift();
    if (day > 30){
      month++;
      day = 1;
    } else {
      day++;
    }
  }, 1000);
}

function generateData(day, month) {
  const count = Math.floor(Math.random() * 500) + 1;
  const date = month + '/' + day + '/2017';
  return {
    day: date,
    count
  }
}

function sendChartData(ws, data) {
  ws.send(JSON.stringify({ type: 'chart', data }));
}
