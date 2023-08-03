import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const [isValid, setIsValid] = React.useState(false);
  const [inputValidationMessage, setInputValidationMessage] = React.useState('');

  const inputRef = React.useRef();

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
    resetForm();
  }

  function handleInput(event) {
    if (event.target.validity.valid) {
      setIsValid(true);
      setInputValidationMessage('')
    } else {
      setIsValid(false);
      setInputValidationMessage(event.target.validationMessage);
    }
  }

  function resetForm() {
    setIsValid(false);
    setInputValidationMessage('');
    inputRef.current.value = '';
  }

  return (
    <PopupWithForm
      name="change-avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
      resetForm={resetForm}
    >
      <label className="popup__input-field">
        <input
          ref={inputRef}
          type="url"
          className={"popup__profile-line " + (isValid && "popup__profile-line_invalid")}
          id="avatar-link-input"
          placeholder="Ссылка на картинку"
          name="link"
          minLength="1"
          required
          onInput={handleInput}
        />
        <span className="popup__profile-line-error">
          {inputValidationMessage}
        </span>
      </label>
    </PopupWithForm>
  );
}