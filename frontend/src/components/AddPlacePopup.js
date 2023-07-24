import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");
  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name,
      link,
    });
    // setName("");
    // setLink("");
  }

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      buttonText="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        required
        type="text"
        name="name"
        id="newValue"
        value={name}
        onChange={handleNameChange}
        placeholder="Название"
        className="popup__field-name field"
        minLength="2"
        maxLength="30"
      />
      <span
        id="newValue-error"
        className="popup__span popup__span_error_visible"
      ></span>
      <input
        required
        type="url"
        name="link"
        id="UrlValue"
        value={link}
        onChange={handleLinkChange}
        placeholder="Ссылка на картинку"
        className="popup__field-info field"
      />
      <span
        id="UrlValue-error"
        className="popup__span popup__span_error_visible"
      ></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
