import React from "react";

function InfoTooltip({ isOpen, onClose, text, image }) {
  return (
    <div className={isOpen ? `popup popup_active` : `popup`}>
      <div className="popup__container popup__container_type_info">
        <button
          type="button"
          className="popup__close-icon"
          onClick={onClose}
        ></button>
        <img className="popup__info-image" alt="значок" src={image} />
        {/* <h3 className="popup__head">{text}</h3> */}
        <h3 className="popup__title popup__title_type_info">{text}</h3>
      </div>
    </div>
  );
}

export default InfoTooltip;
