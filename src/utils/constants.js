// edit name button for open edit user info
export const editBtn = document.querySelector('.profile__button-edit');

// add button for open add form
export const addBtn = document.querySelector('.profile__button-add');

// edit variable
export const editFormPopup = document.querySelector('.edit')
export const editForm = editFormPopup.querySelector('.edit__form');
export const inputName = editForm.querySelector('.edit__input_type_name');
export const inputJob = editForm.querySelector('.edit__input_type_career');

// add variable
export const addCardPopup = document.querySelector('.add');
export const addForm = addCardPopup.querySelector('.add__form');
export const inputTitle = addForm.querySelector('.add__input_type_title')
export const inputLink = addForm.querySelector('.add__input_type_link')

// delete form variable
export const deleteForm = document.querySelector('.delete')
// set all parameter for add into enableValidation for edit form
export const config = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

// profile variable
export const profileName = ".profile__info-name"
export const profileJob = ".profile__info-career"
export const profileImage = ".profile__img"

// avatar profile variable
export const updateAvatarButton = document.querySelector(".profile__img-edit")
export const avatarForm = document.querySelector(".avatar__form")
