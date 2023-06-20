import React from "react";

export default function ImagePopup({
  card,
  onClose
}) {

  React.useEffect(() => {
    if (card) {
      document.addEventListener('keydown', handleEscClose)
    }
    return () => {
      document.removeEventListener('keydown', handleEscClose)
    }
  }, [card])

  function handleEscClose(evt) {
    if (evt.key === 'Escape') {
      onClose();
    };
  };

  function mauseDawnClose(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      onClose();
    };
  }

  return (
    <div
      className={`popup popup_dark-background ` + (card && "popup_opened")}
      onMouseDown={mauseDawnClose}
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