const sendMessage = (message, wss) => {
  const messageObject = JSON.parse(message);
  let messageText = '';

  switch(messageObject.type) {
    case 'DELETE_DEVICE':{
      messageText = messageObject.deviceName + ' was deleted';
      break;
    }
    case 'CREATE_DEVICE':{
      messageText = messageObject.deviceName + ' was created';
      break;
    }
    case 'STATUS_DEVICE':{
      messageText = messageObject.deviceName + ` is ${messageObject.deviceStatus ? 'on' : 'off'}`;
      break;
    }
  }

  wss.clients.forEach(client => {
    client.send(messageText);
  });
}

module.exports = sendMessage;
