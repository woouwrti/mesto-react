import React from "react";
import PopupWithForm from "./PopupWithForm";
import { validation, resetValidation } from "./validation";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");
  
  const [isValid, setIsValid] = React.useState(false);

  React.useEffect(() => {
    setName("");
    setLink("");
    resetValidation("add-card")
  }, [isOpen]);

  function handleChangeName(event) {
    const text = event.target.value;
    setName(text);
    validation(event, setIsValid);
  }

  function handleChangeLink(event) {
    const text = event.target.value;
    setLink(text);
    validation(event, setIsValid);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label className="popup__input-field">
        <input
          type="text"
          className={"popup__profile-line"}
          id="title-input"
          placeholder="Название"
          name="name"
          minLength="2"
          maxLength="30"
          required
          value={name}
          onChange={handleChangeName}
        />
        <span className="popup__profile-line-error"></span>
      </label>
      <label className="popup__input-field">
        <input
          type="url"
          className={"popup__profile-line"}
          id="link-input"
          placeholder="Ссылка на картинку"
          name="link"
          minLength="1"
          required
          value={link}
          onChange={handleChangeLink}
        />
        <span className="popup__profile-line-error"></span>
      </label>
    </PopupWithForm>
  );
}