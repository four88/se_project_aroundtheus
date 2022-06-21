const body = document.querySelector('.body');
const editBtn = body.querySelector('.profile__button-edit');

const elements = document.querySelector('.elements');

const popup = document.querySelector('.popup');

const addBtn = body.querySelector('.profile__button');

const elementTemplate = document.querySelector('.element-template').content;
const editTemplate = document.querySelector('.edit-template').content;
const addTemplate = document.querySelector('.add-template').content;
const picTemplate = document.querySelector('.pic-template').content;

//  work with profile form
const showPopup = () => {
  popup.classList.remove('popup_closed');
};

const closePopup = () => {
  popup.classList.add('popup_closed');
  popup.removeChild(popup.lastChild);
};

// find the form fields in the DOM
const profileName = body.querySelector('.profile__info-name');
const profileJob = body.querySelector('.profile__info-career');

// function for show edit profile form and edit profile
const showProfileForm = () => {
  const edit = editTemplate.querySelector('.edit__container').cloneNode(true);

  const editCloseBtn = edit.querySelector('.popup__button-closed');
  editCloseBtn.addEventListener('click', closePopup);

  popup.append(edit);
  showPopup();
  const inputName = document.querySelector('.edit__input_type_name');
  const inputJob = document.querySelector('.edit__input_type_career');
  const editForm = edit.querySelector('.edit__form');

  function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;

    closePopup();
  }

  editForm.addEventListener('submit', handleProfileFormSubmit);

  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
};

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
  const pic = picTemplate.querySelector('.pic__container').cloneNode(true);

  const picCloseBtn = pic.querySelector('.popup__button-closed');
  picCloseBtn.addEventListener('click', closePopup);

  const picImg = pic.querySelector('.pic__img');
  const picTitle = pic.querySelector('.pic__title');

  picImg.src = evt.target.src;
  picTitle.textContent = evt.target.alt;
  picImg.alt = evt.target.alt;

  popup.append(pic);
  showPopup();
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

// function for show add form and create element

const showAddForm = () => {
  const add = addTemplate.querySelector('.add__container').cloneNode(true);

  const addCloseBtn = add.querySelector('.popup__button-closed');
  addCloseBtn.addEventListener('click', closePopup);

  popup.append(add);
  showPopup();
  const titleInput = document.querySelector('.add__input_type_title');
  const linkInput = document.querySelector('.add__input_type_link');
  const addForm = document.querySelector('.add__form');

  const handleAddFormSubmit = (evt) => {
    evt.preventDefault();

    data.name.unshift(titleInput.value);
    data.link.unshift(linkInput.value);
    const element = createCard(data.name[0], data.link[0]);

    elements.prepend(element);
    titleInput.value = '';
    linkInput.value = '';
    closePopup();
  };

  addForm.addEventListener('submit', handleAddFormSubmit);
};

// connect the handler to the form:
editBtn.addEventListener('click', showProfileForm);
addBtn.addEventListener('click', showAddForm);
