import { BASE_URL } from "./auth";

class Api {
  constructor(BASE_URL, credentials, headers) {
    this.url = BASE_URL;
    this.headers = headers;
    this.credentials = credentials;
    this.authorization = headers["authorization"];
  }

  _handleResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject("Ошибка:" + res.status);
  }

  getUserInfo() {
    return fetch(this.url + "/users/me", {
      headers: this.headers,
      credentials: this.credentials,
    }).then((res) => this._handleResponse(res));
  }

  getCardsFromServer() {
    return fetch(this.url + "/cards", {
      headers: this.headers,
      credentials: this.credentials,
    }).then((res) => this._handleResponse(res));
  }

  setUserInfo(data) {
    return fetch(this.url + "/users/me", {
      method: "PATCH",
      headers: this.headers,
      credentials: this.credentials,
      body: JSON.stringify({
        about: data.info,
        name: data.name,
      }),
    }).then((res) => this._handleResponse(res));
  }

  addCard(data) {
    return fetch(this.url + "/cards", {
      method: "POST",
      headers: this.headers,
      credentials: this.credentials,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._handleResponse(res));
  }

  deleteCard(cardId) {
    return fetch(this.url + "/cards/" + cardId, {
      method: "DELETE",
      headers: this.headers,
      credentials: this.credentials,
    }).then(this._handleResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (!isLiked) {
      return fetch(this.url + "/cards/" + cardId + "/likes", {
        method: "DELETE",
        headers: this.headers,
        credentials: this.credentials,
      }).then((res) => this._handleResponse(res));
    } else {
      return fetch(this.url + "/cards/" + cardId + "/likes", {
        method: "PUT",
        headers: this.headers,
        credentials: this.credentials,
      }).then((res) => this._handleResponse(res));
    }
  }

  sendAvatarData(avatarLink) {
    return fetch(this.url + "/users/me/avatar", {
      method: "PATCH",
      headers: this.headers,
      credentials: this.credentials,
      body: JSON.stringify({
        avatar: avatarLink.avatar,
      }),
    }).then((res) => this._handleResponse(res));
  }
}

const api = new Api({
  url: BASE_URL,
  credentials: "include",
  headers: { "Content-Type": "application/json" },
});
export default api;
