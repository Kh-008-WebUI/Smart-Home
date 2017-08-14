
module.exports = function (ws) {
  const data = [
    { day:'01/1/2017', count:310 },
    { day:'01/2/2017', count:430 },
    { day:'01/3/2017', count:180 },
    { day:'01/4/2017', count:150 },
    { day:'01/5/2017', count:180 },
    { day:'01/6/2017', count:250 },
    { day:'01/7/2017', count:110 },
    { day:'01/8/2017', count:230 },
    { day:'01/9/2017', count:480 },
    { day:'01/10/2017', count:250 },
    { day:'01/11/2017', count:380 },
    { day:'01/12/2017', count:50 }
  ];

  let day = 13;
  let month = 1;
  sendChartData(ws, data);
  const chartInterval = setInterval(function () {
    sendChartData(ws, data, chartInterval);
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
  }, 60000);
}

function generateData(day, month) {
  const count = Math.floor(Math.random() * 500) + 1;
  const date = month + '/' + day + '/2017';
  return {
    day: date,
    count
  }
}

<<<<<<< Updated upstream
function sendChartData(ws, data, chartInterval) {
  ws.send(JSON.stringify({ type: 'chart', data }), (err) => {
    if (err) clearInterval(chartInterval);
  });
=======
function sendChartData(ws, data) {
  try {
    ws.send(JSON.stringify({ type: 'chart', data }));
  } catch (e) {
    console.log('error sending chart data', e);
  }
>>>>>>> Stashed changes
}
