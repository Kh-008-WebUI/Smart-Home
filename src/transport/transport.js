export default class Transport {
  static get (uri) {
    return fetch(uri, {
      method: 'get',
      credentials: 'include'
    }).then((response) => (response.json()));
  }
  static post (uri, body) {
    return fetch(uri, {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body
    }).then((response) => (response.json()));
  }
  static put (uri, body) {
    return fetch(uri, {
      method: 'put',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body
    }).then((response) => (response.json()));
  }
  static delete (uri) {
    return fetch(uri, {
      method: 'delete',
      credentials: 'include',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then((response) => (response.json()));
  }
}
