import React from "react";
import PopupWithForm from "./PopupWithForm";
import AppContext from "../contexts/AppContext";
import { useFormAndValidation } from "../utils/validation";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const currentAppContext = React.useContext(AppContext);

  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation()

  function handleSubmit(event) {
    event.preventDefault();

    onAddPlace({
      name: values.name,
      link: values.link,
    });
  }

  React.useEffect(() => {
    resetForm();
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      buttonText={currentAppContext.isLoading ? 'Создание...' : 'Создать'}
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
          id="title-input"
          placeholder="Название"
          name="name"
          minLength="2"
          maxLength="30"
          required
          value={values.name || ''}
          onChange={handleChange}
        />
        <span className="popup__profile-line-error">{errors.name || ''}</span>
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
          value={values.link || ''}
          onChange={handleChange}
        />
        <span className="popup__profile-line-error">{errors.link || ''}</span>
      </label>
    </PopupWithForm>
  );
}