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

  getUserInfo() {
    const url = `${this._baseUrl}/users/me`;

    return fetch(url, {
      method: 'GET',
      headers: this._headers,
    })
      .then(res => this._getResponseData(res));
  }

  setUserInfo({ name, desc }) {
    const url = `${this._baseUrl}/users/me`;

    return fetch(url, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about: desc
      })
    })
      .then(res => this._getResponseData(res));
  }

  setAvatar(link) {
    const url = `${this._baseUrl}/users/me/avatar`;

    return fetch(url, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(res => this._getResponseData(res));
  }

  getInitialCards() {
    const url = `${this._baseUrl}/cards`;

    return fetch(url, {
      method: 'GET',
      headers: this._headers,
    })
      .then(res => this._getResponseData(res));
  }

  addNewCard({ name, link }) {
    const url = `${this._baseUrl}/cards`;

    return fetch(url, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(res => this._getResponseData(res));
  }

  deleteCard(cardId) {
    const url = `${this._baseUrl}/cards/${cardId}`;

    return fetch(url, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._getResponseData(res));
  }

  _addLike(cardId) {
    const url = `${this._baseUrl}/cards/${cardId}/likes`;

    return fetch(url, {
      method: 'PUT',
      headers: this._headers
    })
      .then(res => this._getResponseData(res));
  }

  _removeLike(cardId) {
    const url = `${this._baseUrl}/cards/${cardId}/likes`;

    return fetch(url, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._getResponseData(res));
  }

  toggleLike(cardId, isLiked) {
    if (isLiked) {
      return this._removeLike(cardId);
    } else {
      return this._addLike(cardId);
    }
  }

}
