import React, { useEffect, useState } from 'react';

export default function PopupWithForm({
  name,
  title,
  buttonText,
  isOpen,
  onClose,
  children,
  onSubmit,
  isValid,
}) {

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscClose)
    }
    return () => {
      document.removeEventListener("keydown", handleEscClose)
    }
  }, [isOpen])

  function handleEscClose(evt) {
    if (evt.key === 'Escape') {
      onClose();
    }
  };

  function mauseDawnClose(evt) {
    if (evt.target.classList.contains("popup_opened")) {
      onClose();
    };
  }

  return (
    <div
      className={`popup ` + (isOpen && "popup_opened")}
      onMouseDown={mauseDawnClose}
    >
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть окно"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          className="popup__form"
          name={name}
          noValidate
          onSubmit={onSubmit}
        >
          {children}
          <button
            className={`popup__save-button ` + (!isValid && "popup__save-button_disabled")}
            disabled={!isValid}
            type="submit"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}