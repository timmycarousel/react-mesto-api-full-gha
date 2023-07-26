export const BASE_URL = "http://api.mestoyandex.nomoreparties.sbs";

// Проверка ответа от сервера
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

// Регистрация пользователя
export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ password, email }),
  }).then(checkResponse);
};

// Авторизация пользователя
export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ password, email }),
  })
    .then(checkResponse)
    .then((data) => {
      localStorage.setItem("jwt", data.token);
      return data;
    });
};

export const getContent = () => {
  // Получение токена из локального хранилища
  const token = localStorage.getItem("jwt");

  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // Добавление токена в заголовок запроса для авторизации
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then(checkResponse)
    .then((data) => {
      return data;
    });
};
