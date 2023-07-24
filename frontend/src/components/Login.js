import React, { useState } from "react";

const Login = ({ handleLogin }) => {
  // Используем хук useState для хранения состояния формы
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const { password, email } = formValue;

  // Обработчик изменения значений полей ввода
  function handleChange(e) {
    const { name, value } = e.target;
    // Обновляем состояние формы с новыми значениями
    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    // Вызываем обработчик handleLogin с введенными данными
    handleLogin(password, email);
  };

  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="login__input"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <input
          type="password"
          className="login__input"
          placeholder="Пароль"
          value={password}
          name="password"
          onChange={handleChange}
        />
        <button type="submit" className="login__button button">
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
