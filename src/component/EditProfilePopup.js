import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { validation, resetValidation } from "./validation";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [desc, setDesc] = React.useState("");

  const [isValid, setIsValid] = React.useState(true);

  React.useEffect(() => {
    setName(currentUser.name);
    setDesc(currentUser.about);
    resetValidation("edit-profile")
  }, [currentUser, isOpen]);

  function handleChangeName(event) {
    const text = event.target.value;
    setName(text);
    validation(event, setIsValid);
  }

  function handleChangeDesc(event) {
    const text = event.target.value;
    setDesc(text);
    validation(event, setIsValid);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateUser({
      name,
      about: desc,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label className="popup__input-field">
        <input
          type="text"
          className={"popup__profile-line"}
          placeholder="Имя"
          name="name"
          id="name-input"
          minLength="2"
          maxLength="40"
          required
          onChange={handleChangeName}
          value={name ?? "#"}
        />
        <span className="popup__profile-line-error"></span>
      </label>
      <label className="popup__input-field">
        <input
          type="text"
          className={"popup__profile-line"}
          id="desc-input"
          placeholder="Профессия"
          name="desc"
          minLength="2"
          maxLength="200"
          required
          onChange={handleChangeDesc}
          value={desc ?? "#"}
        />
        <span className="popup__profile-line-error"></span>
      </label>
    </PopupWithForm>
  );
}