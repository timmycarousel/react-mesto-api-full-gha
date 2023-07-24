function ImagePopup({ card, onClose }) {
  const popupOpenedClass =
    "popup popup_type_img " + (card ? "popup_active" : "");

  return (
    <div className={popupOpenedClass}>
      <div
        className="popup__container popup__container_type_img popup_active"
        onClick={onClose}
      >
        <button type="button" className="popup__close-icon button"></button>
        <img className="popup__img" src={card?.link} alt={card?.name} />
        <h3 className="popup__heading">{card?.name}</h3>
      </div>
    </div>
  );
}

export default ImagePopup;
