import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwner = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((user) => user._id === currentUser._id);

  return (
    <div className="element">
      <img
        src={card.link}
        alt={card.name}
        className="element__picture"
        onClick={() => onCardClick(card)}
      />
      <div className="element__footer">
        <h2 className="element__title">{card.name}</h2>
        <div className="card__like">
          <button
            type="button"
            className={
              "element__button " + (isLiked && "element__button_active")
            }
            aria-label="Добавить в избранное"
            // onClick={handleCardLike}
            onClick={() => onCardLike(card)}
          ></button>
          <p className="element__likes-count">{
            card.likes.length ? card.likes.length : ''
          }</p>
        </div>
      </div>

      {isOwner && (
        <button
          type="button"
          className="element__basket"
          aria-label="Удалить"
          onClick={() => onCardDelete(card)}
        ></button>
      )}
    </div>
  );
}