import React from "react";
import PopupWithForm from "./PopupWithForm";
import AppContext from "../contexts/AppContext";
import { useFormAndValidation } from "../utils/validation";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const currentAppContext = React.useContext(AppContext);

  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateAvatar({
      avatar: values.avatar
    });
  }

  React.useEffect(() => {
    resetForm();
  }, [isOpen]);

  return (
    <PopupWithForm
      name="change-avatar"
      title="Обновить аватар"
      buttonText={currentAppContext.isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
      resetForm={resetForm}
    >
      <label className="popup__input-field">
        <input
          type="url"
          className={"popup__profile-line " + (isValid && "popup__profile-line_invalid")}
          id="avatar-link-input"
          placeholder="Ссылка на картинку"
          name="avatar"
          minLength="1"
          required
          value={values.avatar || ''}
          onInput={handleChange}
        />
        <span className="popup__profile-line-error">
          {errors.avatar || ''}
        </span>
      </label>
    </PopupWithForm>
  );
}