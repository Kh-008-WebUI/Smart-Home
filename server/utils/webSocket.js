const sendMessage = (message, wss) => {
  const messageObject = JSON.parse(message);
  let data = {};

  switch(messageObject.type) {
    case 'DELETE_DEVICE':{
      data = {
        type: 'notification',
        message: messageObject.deviceName + ' was deleted'
      }
      break;
    }
    case 'CREATE_DEVICE':{
      data = {
        type: 'notification',
        message: messageObject.deviceName + ' was created'
      } 
      break;
    }
    case 'STATUS_DEVICE':{
      data = {
        type: 'notification',
        message: messageObject.deviceName + ` is ${messageObject.deviceStatus ? 'on' : 'off'}`
      }
      break;
    }
    case 'SEND_DATA':{
      data = {
        type: 'chart',
        data: messageObject.data
      }
      break;
    }
  }

  wss.clients.forEach(client => {
    client.send(JSON.stringify(data));
  });
}

module.exports = sendMessage;
