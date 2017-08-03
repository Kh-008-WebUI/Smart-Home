function handleErrors (response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
};

export default class Transport {
  static get (uri) {
    return fetch(uri, {
      method: 'get',
      credentials: 'include'
    }).then(handleErrors)
    .then((response) => ({ response }))
    .catch(error => ({ error }));
  }
  static post (uri, body) {
    return fetch(uri, {
      method: 'post',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body
    }).then(handleErrors)
    .then((response) => ({ response }))
    .catch(error => ({ error }));
  }
  static put (uri, body) {
    return fetch(uri, {
      method: 'put',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body
    }).then((response) => (response.json()))
    .then((data) => ({ response: data }))
    .catch((error) => ({ error }));
  }
  static delete (uri) {
    return fetch(uri, {
      method: 'delete',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then((response) => (response.json())).catch((error) => ({ error }));
  }
}
