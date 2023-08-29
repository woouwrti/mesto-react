import React from "react";
import AppContext from "../contexts/AppContext";
import PopupWithForm from "./PopupWithForm";

export default function ConfirmActionPopup({ isOpen, onClose, onConfirm }) {
  const currentAppContext = React.useContext(AppContext);

  function handleSubmit(event) {
    event.preventDefault();
    onConfirm();
  }

  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      buttonText={currentAppContext.isLoading ? 'Выполнение...' : 'Да'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={true}
    />
  );
}