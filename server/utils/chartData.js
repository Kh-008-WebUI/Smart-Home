const data = [];

module.exports = function (ws) {
  ws.send(JSON.stringify({ type: 'chart', data }), (err) => {
    if (err) clearInterval(chartInterval);
  });
}
const chartInterval = setInterval(function () {
    if(data.length > 8) {
      data.shift();      
    }
    data.push(generateData());
  }, 60000);
function generateData() {
  const count = Math.floor(Math.random() * 500) + 1;
  const date = new Date();
  const time = date.getHours() + '-' + date.getMinutes();
  return {
    day: time,
    count
  }
}