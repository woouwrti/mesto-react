import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
import AppContext from "../contexts/AppContext";
import { useFormAndValidation } from "../utils/validation";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUserData }) {
  const currentUser = React.useContext(CurrentUserContext);
  const currentAppContext = React.useContext(AppContext);

  const { values, handleChange, errors, isValid, setValues, setIsValid, resetForm } = useFormAndValidation();

  React.useEffect(() => {
    if (Object.keys(currentUser).length !== 0) {
      setValues({ 'name': currentUser.name, 'desc': currentUser.about })
      setIsValid(true)
    }
  }, [currentUser, isOpen]);

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateUserData({
      name: values.name,
      about: values.desc,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonText={currentAppContext.isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
      resetForm={resetForm}
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
          onChange={handleChange}
          value={values.name || ''}
        />
        <span
          className="popup__profile-line-error"
          name="name-error-span"
        >
          {errors.name}
        </span>
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
          onChange={handleChange}
          value={values.desc || ''}
        />
        <span
          className="popup__profile-line-error"
          name="desc-error-span"
        >
          {errors.desc}
        </span>
      </label>
    </PopupWithForm>
  );
}