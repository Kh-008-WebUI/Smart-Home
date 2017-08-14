import Transport from '../transport/transport';
import { SERVER_API } from '../constants/index';
import { ws } from '../index';

export const login = (data) => {
  return Transport.post(
    `${SERVER_API}/login`,
    JSON.stringify(data)
  ).then(postReply => {
    if (postReply.response) {
      ws.send(JSON.stringify({
        type: 'users',
        user: { _id: postReply.response.userData._id, home: true }
      }));
    }
    return postReply;
  });
};

export const getRegisterData = (data) => {
  return Transport.post(
    `${SERVER_API}/register`,
    JSON.stringify(data)
  );
};

export const getUserData = () => {
  return Transport.get(
    `${SERVER_API}/login`
  );
};

export const logout = () => {
  return Transport.get(
    `${SERVER_API}/logout`
  ).then(postReply => {
    if (postReply.response) {
      ws.send(JSON.stringify({
        type: 'users',
        user: { _id: postReply.response.userData._id, home: false }
      }));
    }
    return postReply;
  });
};
