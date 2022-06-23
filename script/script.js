const body = document.querySelector('.body');
const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('.element-template').content;
const editBtn = body.querySelector('.profile__button-edit');
const closeBtn = document.querySelectorAll('.popup__button-closed');
const addBtn = body.querySelector('.profile__button');

// edit variable
const edit = document.querySelector('.edit');
const editForm = edit.querySelector('.edit__form');
const inputName = editForm.querySelector('.edit__input_type_name');
const inputJob = editForm.querySelector('.edit__input_type_career');

// add variable
const add = document.querySelector('.add');
const addForm = add.querySelector('.add__form');
const titleInput = addForm.querySelector('.add__input_type_title');
const linkInput = addForm.querySelector('.add__input_type_link');

// pic variable
const pic = document.querySelector('.pic');
const picImg = pic.querySelector('.pic__img');
const picTitle = pic.querySelector('.pic__title');

//  work with profile form
const showPopup = (popup) => {
  popup.classList.remove('popup_closed');
};

const closePopup = (popup) => {
  popup.classList.add('popup_closed');
};

// find the form fields in the DOM
const profileName = body.querySelector('.profile__info-name');
const profileJob = body.querySelector('.profile__info-career');

// function for show edit profile form and edit profile
const showProfilePopup = () => {
  showPopup(edit);

  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;

  closePopup(edit);
}

const showAddPopup = () => {
  showPopup(add);

  inputName.value = '';
  inputJob.value = '';
};

const handleAddFormSubmit = (evt) => {
  evt.preventDefault();

  data.name.unshift(titleInput.value);
  data.link.unshift(linkInput.value);
  const element = createCard(data.name[0], data.link[0]);

  elements.prepend(element);
  titleInput.value = '';
  linkInput.value = '';
  closePopup(add);
};

// add function to each form when they submit
editForm.addEventListener('submit', handleProfileFormSubmit);
addForm.addEventListener('submit', handleAddFormSubmit);

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

// function popup picture
const popupPicture = (evt) => {
  picImg.src = evt.target.src;
  picTitle.textContent = evt.target.alt;
  picImg.alt = evt.target.alt;

  showPopup(pic);
};

// function delete element
const deleteElement = (evt) => {
  evt.target.closest('.element').remove();
};

// function for like icon on element
const toggleLike = (evt) => {
  evt.target.classList.toggle('element__icon-img_active');
};

const createCard = (name, link) => {
  const element = elementTemplate.querySelector('.element').cloneNode(true);

  element.querySelector('.element__title').textContent = name;
  element.querySelector('.element__pic').src = link;
  element.querySelector('.element__pic').alt = name;

  const elementPic = element.querySelector('.element__pic');
  elementPic.addEventListener('click', popupPicture);

  const elementDelete = element.querySelector('.element__delete');
  elementDelete.addEventListener('click', deleteElement);

  const elementIcon = element.querySelector('.element__icon-img');
  elementIcon.addEventListener('click', toggleLike);

  return element;
};

// function for show the card element into elements
const getCardElement = (data) => {
  for (let i = 0; i < data.name.length; i++) {
    // query element template

    const element = createCard(data.name[i], data.link[i]);
    elements.append(element);
  }
};

// call function
// get card element from data variable
getCardElement(data);

// connect the handler to the form:
editBtn.addEventListener('click', showProfilePopup);
addBtn.addEventListener('click', showAddPopup);
closeBtn.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});
