import React from "react";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmActionPopup from "./ConfirmActionPopup";

import CurrentUserContext from "../contexts/CurrentUserContext";
import AppContext from "../contexts/AppContext";

import Api from "../utils/Api";
import { apiConfig } from "../utils/apiConfig";
const api = new Api(apiConfig);

export default function App() {
  document.title = 'Mesto';

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [toBeDeletedCard, setToBeDeletedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then(setCurrentUser)
      .catch(console.error);
    api
      .getInitialCards()
      .then(setCards)
      .catch(console.error);
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddCardClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setToBeDeletedCard(null);
  }



  function handleCardClick(card) {
    setSelectedCard(card);
  }

  const [isLoading, setIsLoading] = React.useState(false);

  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(closeAllPopups)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser(userInfo) {
    function makeRequest() {
      return api
        .setUserInfo({ name: userInfo.name, desc: userInfo.about })
        .then((newUserInfo) => {
          setCurrentUser(newUserInfo);
          closeAllPopups();
        })
    }

    handleSubmit(makeRequest);
  }

  function handleUpdateAvatar({ avatar }) {

    function makeRequest() {
      return api
        .setAvatar(avatar)
        .then((newUserInfo) => {
          setCurrentUser(newUserInfo);
          closeAllPopups();
        })
    }

    handleSubmit(makeRequest);
  }

  function handleAddCard(newPlaceData) {

    function makeRequest() {
      return api
        .addNewCard(newPlaceData)
        .then((newCard) => {
          setCards((state) => [newCard, ...state]);
          closeAllPopups();
        })
    }

    handleSubmit(makeRequest);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    api
      .toggleLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch(console.error);
  }

  function handleCardDelete(card) {
    setToBeDeletedCard(card);
  }

  function handleConfirmDelete() {

    function makeRequest() {

      const cardId = toBeDeletedCard._id;
      return api
        .deleteCard(cardId)
        .then(() => {
          setCards((state) => state.filter((card) => card._id !== cardId));
          closeAllPopups();
        })
    }

    handleSubmit(makeRequest);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <AppContext.Provider value={{ isLoading }}>
        <div className="page">
          <Header />

          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddCardClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />

          <Footer />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUserData={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddCard}
          />

          <ConfirmActionPopup
            isOpen={toBeDeletedCard}
            onClose={closeAllPopups}
            onConfirm={handleConfirmDelete}
          />

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />
        </div>
      </AppContext.Provider>
    </CurrentUserContext.Provider>
  );
}