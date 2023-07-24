import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);
  // Стейты для пользователя
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateUser({ name: name, info: description });
  }
  function handleName(event) {
    setName(event.target.value);
  }
  function handleDescription(event) {
    setDescription(event.target.value);
  }
  return (
    <PopupWithForm
      name="user"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        required
        type="text"
        name="name"
        id="nameValue"
        placeholder="Имя"
        className="popup__field-name field"
        maxLength="40"
        minLength="2"
        value={name || ""}
        onChange={handleName}
      />
      <span
        id="nameValue-error"
        className="popup__span popup__span_error_visible"
      ></span>
      <input
        required
        type="text"
        name="info"
        id="infoValue"
        placeholder="О себе"
        className="popup__field-info field"
        maxLength="200"
        minLength="2"
        value={description || ""}
        onChange={handleDescription}
      />
      <span
        id="infoValue-error"
        className="popup__span popup__span_error_visible"
      ></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
