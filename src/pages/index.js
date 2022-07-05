import './index.css';
import logoSrc from '../images/logo.png';
import profileSrc from '../images/profile.jpg';

const logo = document.querySelector('#image-logo');
logo.src = logoSrc;

const profileImg = document.querySelector('#image-profile');
profileImg.src = profileSrc;

//  import class
import { Card } from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';

import {
  editBtn,
  addBtn,
  editForm,
  inputName,
  inputJob,
  addForm,
  config,
  data,
} from '../utils/constants.js';
// // declare class as obj here
//  formValiditor Class
const editValiditor = new FormValidator(editForm, config);
const addValiditor = new FormValidator(addForm, config);

// popup image
const imagePopup = new PopupWithImage('.pic');

// function for create card element from Card class
const createCard = (data) => {
  const card = new Card(
    {
      data: data,
      handleCardClick: () => {
        imagePopup.open(data);
      },
    },
    '.element-template'
  );

  const cardElement = card.generateCard();
  return cardElement;
};

// create add form popup from PopupWithForm class
const addFormSubmitPopup = new PopupWithForm({
  popupSelector: '.add',
  formSubmitHandle: (inputValues) => {
    // get inputValues from name
    const newCardTitle = inputValues['inputTitle'];
    const newCardLink = inputValues['inputLink'];

    // New place card object
    const newInputValues = {
      name: newCardTitle,
      link: newCardLink,
    };

    // create card from newInputValues
    const cardElement = createCard(newInputValues);

    // add new cardElement to cardList object of Section class
    cardList.addItem(cardElement);

    addFormSubmitPopup.close();
  },
});

//  run setEventListeners when user submit form

const userInfo = new UserInfo({
  nameSelector: '.profile__info-name',
  jobSelector: '.profile__info-career',
});

const editFormSubmitPopup = new PopupWithForm({
  popupSelector: '.edit',
  formSubmitHandle: (inputValues) => {
    // get inputValues from name

    const newUserName = inputValues['inputName'];
    const newUserJob = inputValues['inputCareer'];

    // New User info object
    const newInputValues = {
      name: newUserName,
      job: newUserJob,
    };
    userInfo.setUserInfo(newInputValues.name, newInputValues.job);

    editFormSubmitPopup.close();
  },
});

// show Card list with section class
const cardList = new Section(
  {
    items: data,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardList.addItem(cardElement);
    },
  },
  '.elements'
);

// render item
cardList.renderItem();

// show edit form when click edit button on profile
editBtn.addEventListener('click', () => {
  editFormSubmitPopup.open();
  const { name, job } = userInfo.getUserInfo();
  inputName.value = name;
  inputJob.value = job;
});

// show add form when click add button on profile
addBtn.addEventListener('click', () => {
  addFormSubmitPopup.open();
  addValiditor.toggleButtonState();
});

editValiditor.enableValidation();
addValiditor.enableValidation();
