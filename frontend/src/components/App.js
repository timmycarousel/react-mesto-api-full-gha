import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import * as auth from "../utils/auth.js";
import Main from "./Main";
import PageNotFound from "./PageNotFound";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import ok from "../images/Ok.svg";
import error from "../images/Error.svg";
import Header from "./Header";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);
  const [imageTooltip, setImageTooltip] = useState("");
  const [textTooltip, setTextTooltip] = useState("");
  const [emailUser, setEmailUser] = useState("");

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      // Получение информации о пользователе и карточек с сервера
      Promise.all([api.getUserInfo(), api.getCardsFromServer()])
        .then(([userInfo, initialCards]) => {
          setCurrentUser(userInfo);
          setCards(initialCards);
        })
        .catch((err) => console.log(`Error: ${err}`));
    }
  }, [loggedIn]);

  function tokenCheck() {
    // Проверка токена в localStorage
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmailUser(res.data.email);
          }
        })
        .catch((err) => console.log(err));
    }
  }

  function handleRegister(password, email) {
    if (password || email) {
      return auth
        .register(password, email)
        .then(() => {
          setImageTooltip(ok);
          setTextTooltip("Вы успешно зарегистрированы!");
          setIsTooltipPopupOpen(true);
          navigate("/sign-in");
        })
        .catch(() => {
          setImageTooltip(error);
          setTextTooltip("Ошибка регистрации! Попробуйте ещё раз.");
          setIsTooltipPopupOpen(true);
        });
    }
  }

  function handleLogin(password, email) {
    if (!password || !email) {
      return;
    }
    return auth
      .authorize(password, email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          navigate("/");
          setEmailUser(email);
          setLoggedIn(true);
        }
      })
      .catch((err) => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Изменение статуса лайка карточки через API
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(`Error: ${err}`));
  }

  function handleCardDelete(card) {
    // Удаление карточки через API
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }

  function changeAvatar(link) {
    // Обновление аватара пользователя через API
    api
      .sendAvatarData(link)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    // Добавление новой карточки через API
    api
      .addCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }

  function handleUpdateUser(data) {
    // Обновление информации о пользователе через API
    api
      .setUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }

  function handleEditAvatarClick() {
    // Обработчик открытия попапа изменения аватара
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    // Обработчик открытия попапа редактирования профиля
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    // Обработчик открытия попапа добавления новой карточки
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    // Обработчик открытия попапа с увеличенным изображением карточки
    setSelectedCard(card);
  }

  function closeAllPopups() {
    // Закрытие всех попапов
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsTooltipPopupOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="html">
        <div className="page">
          <Header
            email={emailUser}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
          />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={Main}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardDelete={handleCardDelete}
                  onCardLike={handleCardLike}
                  cards={cards}
                  loggedIn={loggedIn}
                />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route
              path="/sign-up"
              element={
                loggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Register handleRegister={handleRegister} />
                )
              }
            />
            <Route
              path="/sign-in"
              element={
                loggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Login handleLogin={handleLogin} />
                )
              }
            />
          </Routes>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <PopupWithForm
            name="delete"
            title="Вы уверены?"
            buttonText="Да"
            isOpen={false}
            onClose={closeAllPopups}
          ></PopupWithForm>
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={changeAvatar}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>
          <InfoTooltip
            onClose={closeAllPopups}
            text={textTooltip}
            image={imageTooltip}
            isOpen={isTooltipPopupOpen}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
