import React from 'react';
import { usePopupClose } from '../hooks/usePopupClose'

export default function PopupWithForm({
  name,
  title,
  buttonText,
  isOpen,
  onClose,
  children,
  onSubmit,
  isValid,
  resetForm
}) {

  function closePopupAndReset() {
    onClose()
    if (resetForm) {
      resetForm();
    };
  }

  usePopupClose(isOpen, closePopupAndReset)

  return (
    <div
      className={`popup ` + (isOpen && "popup_opened")}
    >
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть окно"
          onClick={closePopupAndReset}
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