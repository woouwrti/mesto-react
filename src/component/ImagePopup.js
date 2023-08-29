import React from "react";
import { usePopupClose } from '../hooks/usePopupClose'

export default function ImagePopup({
  card,
  onClose
}) {

  usePopupClose(card?.link, onClose)

  return (
    <div
      className={`popup popup_dark-background ` + (card && "popup_opened")}
    >
      <div className="popup__container-image">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть окно"
          onClick={onClose}
        ></button>
        <img
          src={card ? card.link : "#"}
          alt={card ? card.name : "#"}
          className="popup__image"
        />
        <h2 className="popup__image-title">
          {card ? card.name : "#"}
        </h2>
      </div>
    </div>
  );
}