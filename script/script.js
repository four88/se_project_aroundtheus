 //  import class
import { showPopup, closePopup} from './utils.js'
import { Card } from './Card.js'
import { FormValidator } from './Validation.js'

const body = document.querySelector('.body');
const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('.element-template').content;
const editBtn = body.querySelector('.profile__button-edit');
const closeBtns = document.querySelectorAll('.popup__button-closed');
const addBtn = body.querySelector('.profile__button');
const popup = body.querySelector('.popup')
 
// edit variable
const editProfilePopup = document.querySelector('.edit');
const editForm = document.querySelector('.edit__form');
const inputName = editForm.querySelector('.edit__input_type_name');
const inputJob = editForm.querySelector('.edit__input_type_career');

// add variable
const addCardPopup = document.querySelector('.add');
const addForm = addCardPopup.querySelector('.add__form'); 
const titleInput = addForm.querySelector('.add__input_type_title');
const linkInput = addForm.querySelector('.add__input_type_link');



// find the form fields in the DOM
const profileName = body.querySelector('.profile__info-name');
const profileJob = body.querySelector('.profile__info-career');

// set all parameter for add into enableValidation for edit form
const config = {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
}


// declare formValiditorClass
const editValiditor = new FormValidator(editForm, config)
const addValiditor = new FormValidator(addForm, config)


// function for show edit profile form and edit profile
const showProfilePopup = () => {
  showPopup(editProfilePopup);
  

  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;

  closePopup(editProfilePopup);
}


//  render card element fields
const data = {
  name: [
    'Yoesmite Valley',
    'Lake Louise',
    'Bald mountains',
    'Latemar',
    'Vanoise National Park',
    'Lago di Braies',
  ],
  link: [
    'https://code.s3.yandex.net/web-code/yosemite.jpg',
    'https://code.s3.yandex.net/web-code/lake-louise.jpg',
    'https://code.s3.yandex.net/web-code/bald-mountains.jpg',
    'https://code.s3.yandex.net/web-code/latemar.jpg',
    'https://code.s3.yandex.net/web-code/vanoise.jpg',
    'https://code.s3.yandex.net/web-code/lago.jpg',
  ],
};



// function for handle add submit form
const handleAddFormSubmit = (evt) => {
  evt.preventDefault();

  const card = new Card(titleInput.value, linkInput.value, ".element-template");

  const element = card.generateCard()  

  elements.prepend(element);
  addForm.reset()
  closePopup(addCardPopup);


}; 


// add function to each form when they submit
editForm.addEventListener('submit', handleProfileFormSubmit);
addForm.addEventListener('submit', handleAddFormSubmit);


// function for show the card element into elements
const renderCard = (data) =>  {data.name.forEach((item, index) => {
    const card = new Card(item, data.link[index], ".element-template");
    const element = card.generateCard()
    elements.append(element);

})
}

renderCard(data)
 
// show edit form when click edit button on profile 
editBtn.addEventListener('click', showProfilePopup);

// assign closePopup for close button in every class
closeBtns.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

// show add form when click add button on profile 
addBtn.addEventListener('click', () => {
  showPopup(addCardPopup)
  addValiditor.enableValidation()
});



editValiditor.enableValidation()
addValiditor.enableValidation()