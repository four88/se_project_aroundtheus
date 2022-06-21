const body = document.querySelector('.body');
const editBtn = body.querySelector('.profile__button-edit');
const edit = body.querySelector('.edit');
const profileCloseBtn = edit.querySelector('.edit__button-closed');
const elements = document.querySelector('.elements');

// add form part
const add = body.querySelector('.add');
const addButton = body.querySelector('.profile__button');
const addCloseBtn = body.querySelector('.add__button-closed');
const addFormElement = add.querySelector('.add__form');
const titleInput = body.querySelector('.add__input_type_title');
const linkInput = body.querySelector('.add__input_type_link');

const elementTemplate = document.querySelector('.element-template').content;

// pic variable
const pic = document.querySelector('.pic');
const picBtn = document.querySelector('.pic__button-closed');
const picImg = document.querySelector('.pic__img');
const picTitle = document.querySelector('.pic__title');

//  work with profile form
const showForm = () => {
  edit.classList.remove('edit_closed');

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

const closeForm = () => {
  edit.classList.add('edit_closed');
};

// work with adding form
const showAddForm = () => {
  add.classList.remove('add_closed');
};

const closeAddForm = () => {
  add.classList.add('add_closed');
};

addButton.addEventListener('click', showAddForm);
addCloseBtn.addEventListener('click', closeAddForm);

// find the form in the DOM
const profileFormElement = edit.querySelector('.edit__form');

// find the form fields in the DOM
const nameInput = profileFormElement.querySelector('.edit__input_type_name');
const jobInput = profileFormElement.querySelector('.edit__input_type_career');

// find the form fields in the DOM
const profileName = body.querySelector('.profile__info-name');
const profileJob = body.querySelector('.profile__info-career');

// the form submission handler. Note that its name
// starts with a verb and concisely describes what it does
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closeForm();
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

// function popup picture
const popupPicture = (evt) => {
  pic.classList.remove('pic_closed');

  picImg.src = evt.target.src;
  picTitle.textContent = evt.target.alt;
  picImg.alt = evt.target.alt;
};

// function delete element
const deleteElement = (evt) => {
  evt.target.closest('.element').remove();
};

// function close picture modal
const closePic = () => {
  pic.classList.add('pic_closed');
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

// function for create new element
const handleAddFormSubmit = (evt) => {
  evt.preventDefault();

  data.name.unshift(titleInput.value);
  data.link.unshift(linkInput.value);
  const element = createCard(data.name[0], data.link[0]);

  elements.prepend(element);
  titleInput.value = '';
  linkInput.value = '';
  closeAddForm();
};

// connect the handler to the form:
// it will watch the submit event
editBtn.addEventListener('click', showForm);
profileCloseBtn.addEventListener('click', closeForm);

profileFormElement.addEventListener('submit', handleProfileFormSubmit);
addFormElement.addEventListener('submit', handleAddFormSubmit);

picBtn.addEventListener('click', closePic);
