import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = (props) => {
  const currentUser = React.useContext(CurrentUserContext);

  const { name, link, likes } = props.card;
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like-button button ${
    isLiked ? "element__like-button_active button" : ""
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    console.log(props.onCardDelete);
    props.onCardDelete(props.card);
  }

  return (
    <div className="element">
      <img
        className="element__img"
        src={link}
        alt={name}
        onClick={handleClick}
      />
      <div className="element__line-text">
        <h2 className="element__text">{name}</h2>
        {isOwn && (
          <button
            type="button"
            className="element__trash button"
            onClick={handleDeleteClick}
          />
        )}
        <div className="element__like-container">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"
          ></button>
          <span className="element__counter-like">{likes.length}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
