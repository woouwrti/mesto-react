import React from "react";
import PopupWithForm from "./PopupWithForm";
import { validation } from "./validation";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const [avatarLink, setAvatarLink] = React.useState("");

  const [isValid, setIsValid] = React.useState(true);

  React.useEffect(() => {
    setAvatarLink("")
  }, [isOpen]);

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateAvatar({
      avatar: avatarLink,
    });
  }

  function handleChangeLink(event) {
    const text = event.target.value;
    setAvatarLink(text);
    validation(event, setIsValid);
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
    >
      <label className="popup__input-field">
        <input
          type="url"
          className={"popup__profile-line " + (isValid && "popup__profile-line_invalid")}
          id="avatar-link-input"
          placeholder="Ссылка на картинку"
          name="link"
          minLength="1"
          required
          onChange={handleChangeLink}
          value={avatarLink}
        />
        <span className="popup__profile-line-error"></span>
      </label>
    </PopupWithForm>
  );
}