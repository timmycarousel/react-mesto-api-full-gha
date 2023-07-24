import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({ avatar: avatarRef.current.value });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        id="avatar"
        className="popup__field-avatar field"
        name="avatar"
        placeholder="Ссылка на картинку"
        required
        minLength="2"
        ref={avatarRef}
      />
      <span
        id="avatar-error"
        className="popup__span popup__span_error_visible"
      ></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
