// edit name button for open edit user info
export const editBtn = document.querySelector('.profile__button-edit');

// add button for open add form
export const addBtn = document.querySelector('.profile__button');

// edit variable
export const editForm = document.querySelector('.edit__form');
export const inputName = editForm.querySelector('.edit__input_type_name');
export const inputJob = editForm.querySelector('.edit__input_type_career');

// add variable
export const addCardPopup = document.querySelector('.add');
export const addForm = addCardPopup.querySelector('.add__form');
export const inputTitle = addForm.querySelector('.add__input_type_title')
export const inputLink = addForm.querySelector('.add__input_type_link')

// set all parameter for add into enableValidation for edit form
export const config = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

//  render card element fields
export const data = [
  {
    name: 'Yoesmite Valley',
    link: 'https://code.s3.yandex.net/web-code/yosemite.jpg',
  },
  {
    name: 'Lake Louise',
    link: 'https://code.s3.yandex.net/web-code/lake-louise.jpg',
  },
  {
    name: 'Bald moutains',
    link: 'https://code.s3.yandex.net/web-code/bald-mountains.jpg',
  },
  {
    name: 'Latemar',
    link: 'https://code.s3.yandex.net/web-code/latemar.jpg',
  },
  {
    name: 'Vanoise National Park',
    link: 'https://code.s3.yandex.net/web-code/vanoise.jpg',
  },
  {
    name: 'Lago di Braies',
    link: 'https://code.s3.yandex.net/web-code/lago.jpg',
  },
];
