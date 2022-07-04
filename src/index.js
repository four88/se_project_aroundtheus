import "./pages/index.css";
import logoSrc from "./images/logo.png"
import profileSrc from "./images/profile.jpg"


const logo = document.querySelector('#image-logo')
logo.src = logoSrc

const profileImg = document.querySelector('#image-profile')
profileImg.src = profileSrc


//  import class
import { Card } from './components/Card.js'
import PopupWithImage from './components/PopupWithImage.js' 
import PopupWithForm from './components/PopupWithForm.js' 
import Section from './components/Section.js'
import UserInfo from './components/UserInfo.js'
import { FormValidator } from './components/FormValidator.js'

// edit name button for open edit user info
const editBtn = document.querySelector('.profile__button-edit');

// add button for open add form 
const addBtn = document.querySelector('.profile__button');

// edit variable
const editForm = document.querySelector('.edit__form');
const inputName = editForm.querySelector('.edit__input_type_name');
const inputJob = editForm.querySelector('.edit__input_type_career');

// add variable
const addCardPopup = document.querySelector('.add');
const addForm = addCardPopup.querySelector('.add__form'); 

// set all parameter for add into enableValidation for edit form
const config = {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
}

// // declare class as obj here
//  formValiditor Class
const editValiditor = new FormValidator(editForm, config)
const addValiditor = new FormValidator(addForm, config)

// popup image
const imagePopup = new PopupWithImage('.pic')

//  render card element fields
const data = [
  {
    name: 'Yoesmite Valley',
    link: 'https://code.s3.yandex.net/web-code/yosemite.jpg'
  },
  {
    name: 'Lake Louise',
    link: 'https://code.s3.yandex.net/web-code/lake-louise.jpg'
  },
  {
    name: 'Bald moutains',
    link: 'https://code.s3.yandex.net/web-code/bald-mountains.jpg'
  },
  {
    name: 'Latemar',
    link: 'https://code.s3.yandex.net/web-code/latemar.jpg'
  },
  {
    name: 'Vanoise National Park',
    link: 'https://code.s3.yandex.net/web-code/vanoise.jpg'
  },
  {
    name: 'Lago di Braies',
    link: 'https://code.s3.yandex.net/web-code/lago.jpg'
  }

]


// function for create card element from Card class
const createCard = (data) => {
  const card = new Card({
    data: data,
    handleCardClick: () => {
      imagePopup.open(data)
    }
  }, ".element-template")

  const cardElement = card.generateCard()
  return cardElement;
}



// create add form popup from PopupWithForm class
const addFormSubmitPopup = new PopupWithForm(
 { popupSelector : ".add",
    formSubmitHandle: (inputValues) => {
    // get inputValues from name
    const newCardTitle = inputValues["inputTitle"];
    const newCardLink = inputValues["inputLink"];

    // New place card object
    const NewInputValues = {
      name: newCardTitle,
      link: newCardLink
    };

      // create card from newInputValues
     const cardElement  = createCard(NewInputValues)

    // add new cardElement to cardList object of Section class
    cardList.addItem(cardElement)

    addFormSubmitPopup.close()
  }}
)


//  run setEventListeners when user submit form 
addFormSubmitPopup.setEventListeners()

const userInfo = new UserInfo({
  nameSelector: ".profile__info-name",
  jobSelector: ".profile__info-career"
})

const editFormSubmitPopup = new PopupWithForm(
  {
    popupSelector: ".edit",
    formSubmitHandle: (inputValues) => {
      // get inputValues from name
    
      console.log(inputValues["inputName"])
      const newUserName = inputValues["inputName"]
      const newUserJob = inputValues["inputCareer"]

      // New User info object
      const NewInputValues = {
        name: newUserName,
        job: newUserJob
      }
      userInfo.setUserInfo(NewInputValues.name, NewInputValues.job)

      editFormSubmitPopup.close()
      
    }
  }
)

editFormSubmitPopup.setEventListeners()


// show Card list with section class
const cardList = new Section({
  items: data,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardList.addItem(cardElement)
  }
}, ".elements")

// render item
cardList.renderItem();

// show edit form when click edit button on profile 
editBtn.addEventListener('click', () => {
  editFormSubmitPopup.open()
  inputName.value = userInfo.getUserInfo().name
  inputJob.value = userInfo.getUserInfo().job
  editValiditor.enableValidation()
});

// show add form when click add button on profile 
addBtn.addEventListener('click', () => {
  addFormSubmitPopup.open()
  addValiditor.enableValidation()
});


