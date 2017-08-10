const ws = require('../index');

module.exports = function () {
  const data = [
    { day:'01/1/2017', count:310 },
    { day:'01/2/2017', count:430 },
    { day:'01/3/2017', count:180 },
    { day:'01/4/2017', count:150 },
    { day:'01/5/2017', count:180 },
    { day:'01/6/2017', count:250 }
  ];

  let day = 7;
  let month = 1;
  setInterval(function () {
    sendChartData(ws, data);
    data.push(generateData(day, month));
    data.shift();
    if (day > 30){
      if(month < 12) {
        month++;
      } else {
        month = 1;
      }
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
