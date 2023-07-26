const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors'); // Подключение пакета cors
const UnauthorizedError = require('../errors/unauthorized-err');

const app = express();

app.use(cookieParser());
app.use(cors);

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const token = req.cookies && req.cookies.Authorization
    ? req.cookies.Authorization.replace('Bearer ', '')
    : null;

  console.log('Заголовок Authorization:', req.headers.authorization);
  if (!token) {
    return next(new UnauthorizedError('Неверный токен авторизации'));
  }

  let payload;

  try {
    payload = jwt.verify(token, 'strong-secret');
  } catch (err) {
    return next(new UnauthorizedError('Неверный токен авторизации'));
  }

  console.log('Токен:', token); // Вывод токена в консоль
  console.log('Пользовательские данные из токена:', payload);

  req.user = payload;

  next();
};

module.exports = { auth };
