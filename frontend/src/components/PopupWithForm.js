import React from "react";

function PopupWithForm(props) {
  return (
    <div
      className={
        `popup popup_type_${props.name}` + (props.isOpen && " popup_active")
      }
    >
      <div className="popup__container popup__container_type_form">
        <button
          className="popup__close-icon button"
          type="button"
          aria-label="Закрыть окно"
          onClick={props.onClose}
        ></button>
        <h3 className="popup__head">{props.title}</h3>
        <form
          className="popup__field"
          name={props.name}
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button className="popup__submit-button button" type="submit">
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
