class Api {
  constructor(options) {
    this.url = options.url;
    this.headers = options.headers;
  }

  _handleResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject("Ошибка:" + res.status);
  }

  getUserInfo() {
    return fetch(this.url + "/users/me", {
      headers: this.headers,
    }).then((res) => this._handleResponse(res));
  }

  getCardsFromServer() {
    return fetch(this.url + "/cards", {
      headers: this.headers,
    }).then((res) => this._handleResponse(res));
  }

  setUserInfo(data) {
    return fetch(this.url + "/users/me", {
      method: "PATCH",
      headers: this.headers,
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
    }).then(this._handleResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (!isLiked) {
      return fetch(this.url + "/cards/" + cardId + "/likes", {
        method: "DELETE",
        headers: this.headers,
      }).then((res) => this._handleResponse(res));
    } else {
      return fetch(this.url + "/cards/" + cardId + "/likes", {
        method: "PUT",
        headers: this.headers,
      }).then((res) => this._handleResponse(res));
    }
  }

  sendAvatarData(avatarLink) {
    return fetch(this.url + "/users/me/avatar", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatarLink.avatar,
      }),
    }).then((res) => this._handleResponse(res));
  }
}

const api = new Api({
  url: "https://nomoreparties.co/v1/cohort-64",
  headers: {
    authorization: "a0d61060-a9a4-4380-95cd-b58bf32a5ce6",
    "Content-Type": "application/json",
  },
});
export default api;
