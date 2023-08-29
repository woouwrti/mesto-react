export default class Api {

  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  _request(url, options) {
    return fetch(url, options).then(this._getResponseData)
  }

  getUserInfo() {
    const url = `${this._baseUrl}/users/me`;

    return this._request(url, {
      method: 'GET',
      headers: this._headers,
    })
  }

  setUserInfo({ name, desc }) {
    const url = `${this._baseUrl}/users/me`;

    return this._request(url, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about: desc
      })
    })
  }

  setAvatar(link) {
    const url = `${this._baseUrl}/users/me/avatar`;

    return this._request(url, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
  }

  getInitialCards() {
    const url = `${this._baseUrl}/cards`;

    return this._request(url, {
      method: 'GET',
      headers: this._headers,
    })
  }

  addNewCard({ name, link }) {
    const url = `${this._baseUrl}/cards`;

    return this._request(url, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
  }

  deleteCard(cardId) {
    const url = `${this._baseUrl}/cards/${cardId}`;

    return this._request(url, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  _addLike(cardId) {
    const url = `${this._baseUrl}/cards/${cardId}/likes`;

    return this._request(url, {
      method: 'PUT',
      headers: this._headers
    })
  }

  _removeLike(cardId) {
    const url = `${this._baseUrl}/cards/${cardId}/likes`;

    return this._request(url, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  toggleLike(cardId, isLiked) {
    if (isLiked) {
      return this._removeLike(cardId);
    } else {
      return this._addLike(cardId);
    }
  }

}
