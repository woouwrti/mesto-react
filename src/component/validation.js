export function validation(event, setIsValid) {
  setIsValid(event.target.closest('form').checkValidity());
  event.target
    .closest('label')
    .querySelector('span')
    .textContent = event.target.validationMessage

  if (event.target.validationMessage) {
    event.target.classList.add('popup__profile-line_invalid');
  } else {
    event.target.classList.remove('popup__profile-line_invalid');
  }
}

export function resetValidation(name) {
  const popupForm = document.querySelector(`[name=${name}]`);
  const popupInputsList = Array.from(popupForm.querySelectorAll('label'));
  popupInputsList.forEach((thisLabel) => {
    thisLabel.querySelector('span').textContent = '';
    thisLabel.querySelector('input').classList.remove('popup__profile-line_invalid');
  })
}