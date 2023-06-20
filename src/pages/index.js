import '../pages/index.css';

import { validationSettings } from '../utils/constants.js'
import Card from '../component/Card.js'
import FormValidator from '../component/FormValidator.js'
import Section from '../component/Section.js'
import PopupWithImage from '../component/PopupWithImage.js'
import PopupWithForm from '../component/PopupWithForm.js'
import PopupConfirmation from '../component/PopupConfirmation';
import UserInfo from '../component/UserInfo.js'
import { apiConfig } from '../utils/apiConfig.js';
import Api from '../component/Api.js';

const formValidators = {}
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, config);
    const formName = formElement.getAttribute('name');

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(validationSettings);

const cardsContainer = document.querySelector('.elements');
const cardsContainerTemplate = document.querySelector('#element-template').content;

const profile = document.querySelector('.profile');
const profileChangeAvatar = profile.querySelector('.profile__avatar-button');
const profileEditProfileButton = profile.querySelector('.profile__edit-button');
const profileAddImgButton = profile.querySelector('.profile__add-button');



const popupProfileName = document.querySelector('#input-profile-name');
const popupProfileDesc = document.querySelector('#input-profile-description');
const popupProfile = new PopupWithForm(
  '#popup-profile',
  () => {
    popupProfile.setAwaitTitle()
    api.setUserInfo({
      name: popupProfileName.value,
      desc: popupProfileDesc.value
    })
      .then(res => {
        userData.setUserName(res.name);
        userData.setUserDesc(res.about)
        popupProfile.close();
      })
      .catch(err => console.error(err))
      .finally(() => popupProfile.setOriginalTitle())
  }
);
popupProfile.setEventListeners();
profileEditProfileButton.addEventListener(
  'click',
  () => {
    const data = userData.getUserInfo();
    popupProfileName.value = data.name;
    popupProfileDesc.value = data.desc;
    formValidators['profile-form'].resetValidation();
    formValidators['profile-form'].enableButton();
    popupProfile.open();
  }
);



const popupCardName = document.querySelector('#input-card-name');
const popupCardLink = document.querySelector('#input-card-link');
const popupCard = new PopupWithForm('#popup-card',
  () => {
    popupCard.setAwaitTitle()
    api.addNewCard({
      name: popupCardName.value,
      link: popupCardLink.value
    })
      .then(res => {
        cardSection.addItem(
          createCard({
            name: res.name,
            link: res.link,
            likes: res.likes,
            owner: res.owner,
            _id: res._id
          })
        );
        popupCard.close();
      })
      .catch(err => console.error(err))
      .finally(() => popupCard.setOriginalTitle())
  });
popupCard.setEventListeners();
profileAddImgButton.addEventListener('click',
  () => {
    formValidators['card-form'].resetValidation();
    formValidators['card-form'].disableButton();
    popupCard.open();
  });



const popupAvatarLink = document.querySelector('#input-avatar-link');
const popupAvatar = new PopupWithForm('#popup-avatar',
  () => {
    popupAvatar.setAwaitTitle()
    api.setAvatar(popupAvatarLink.value)
      .then((res) => {
        userData.setUserAvatar(res.avatar);
        popupAvatar.close();
      })
      .catch(err => console.error(err))
      .finally(() => popupAvatar.setOriginalTitle())
  });
popupAvatar.setEventListeners();
profileChangeAvatar.addEventListener('click',
  () => {
    formValidators['avatar-form'].resetValidation();
    formValidators['avatar-form'].disableButton();
    popupAvatar.open();
  });



const popupImage = new PopupWithImage('#popup-img');
popupImage.setEventListeners();



const popupConfirmation = new PopupConfirmation(
  '#popup-confirmation',
  (cardId) => {
    popupConfirmation.setAwaitTitle();
    api.deleteCard(cardId)
      .then(() => {
        cards[cardId].deleteCard();
        popupConfirmation.close();
      })
      .catch(err => console.error(err))
      .finally(() => popupConfirmation.setOriginalTitle())
  });
popupConfirmation.setEventListeners();



const api = new Api(apiConfig);

const cardSection = new Section(
  { items: null, renderer: createCard },
  cardsContainer
);

const handleCardClick = (data) => {
  popupImage.open(data);
}

const handleLikeCard = (cardId, isLiked) => {
  api.toggleLike(cardId, isLiked)
    .then(res => {
      cards[cardId].setLikes(res.likes);
      cards[cardId].refreshLikesButton();
    })
    .catch(err => console.error(err))
}

const handleDeleteCard = (cardId) => {
  popupConfirmation.setTarget(cardId);
  popupConfirmation.open();
}

const cards = {};
function createCard(data) {
  const newCard = new Card(
    data,
    userData.getUserID(),
    cardsContainerTemplate,
    () => handleCardClick(data),
    handleLikeCard,
    handleDeleteCard
  );
  cards[data._id] = newCard;
  return newCard.createCard()
}

const userData = new UserInfo({
  selectorName: '.profile__name',
  selectorDesc: '.profile__description',
  selectorAvatar: '.profile__avatar-image',
});

Promise.all([
  api.getUserInfo(),
  api.getInitialCards()
])
  .then(res => {
    const [gettedUserData, gettedCards] = [res[0], res[1]];

    userData.setUserName(gettedUserData.name);
    userData.setUserDesc(gettedUserData.about);
    userData.setUserAvatar(gettedUserData.avatar);
    userData.setUserID(gettedUserData._id);

    cardSection.setRendererItems(gettedCards);
    cardSection.rendererAllItems();
  })
  .catch(err => console.error(err));
