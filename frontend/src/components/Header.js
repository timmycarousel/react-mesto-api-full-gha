import logo from "../images/logo/header_logo.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Header({ loggedIn, email, setLoggedIn }) {
  // Получаем текущий путь и функцию навигации из React Router
  const location = useLocation();
  const navigate = useNavigate();

  // Определяем путь для маршрута на основе текущего пути
  const path = location.pathname === "/sign-in" ? "/sign-up" : "/sign-in";

  // Обработчик клика по кнопке выхода
  const handleLogoutClick = () => {
    // Удаляем токен из localStorage
    localStorage.removeItem("token");
    // Переходим на страницу входа, заменяя текущий URL в истории
    navigate("/sign-in", { replace: true });
    // Обновляем состояние loggedIn в родительском компоненте
    setLoggedIn(false);
  };

  return (
    <header className="header">
      {/* Выводим логотип */}
      <img className="header__logo" src={logo} alt="Логотип сайта" />
      <nav className="header__nav">
        {/* Выводим адрес электронной почты пользователя, если он вошел в систему */}
        {loggedIn && <p className="header__email">{email}</p>}
        {loggedIn ? (
          /* Выводим кнопку выхода, если пользователь вошел в систему */
          <button className="header__link button" onClick={handleLogoutClick}>
            Выйти
          </button>
        ) : (
          /* Выводим ссылку на маршрут, если пользователь не вошел в систему */
          <Link to={path} className="header__link button">
            {/* Показываем "Регистрация" для маршрута входа в систему или "Войти" */}
            {location.pathname === "/sign-in" ? "Регистрация" : "Войти"}
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
