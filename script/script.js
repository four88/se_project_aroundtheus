
const body = document.querySelector(".body");
const editBtn = body.querySelector(".profile__button-edit");
const edit = body.querySelector(".edit") 
const closeBtn = edit.querySelector(".edit__button-closed")
const elements = document.querySelector(".elements")

// add form part
const add = body.querySelector(".add")
const addButton = body.querySelector(".profile__button")
const addCloseBtn = body.querySelector(".add__button-closed")
const addFormElement = add.querySelector(".add__form")
const titleInput = body.querySelector(".add__input_type_title")
const linkInput = body.querySelector(".add__input_type_link")

const elementTemplate = document.querySelector(".element-template").content;

// pic variable
const pic = document.querySelector(".pic")
const picBtn = document.querySelector(".pic__button-closed")
const picImg = document.querySelector(".pic__img")
const picTitle = document.querySelector(".pic__title")


//  work with profile form 
const showForm = () => { 
    edit.classList.remove("edit_closed")

    nameInput.value = profileName.textContent
    jobInput.value = profileJob.textContent
}

const closeForm = () => {
    edit.classList.add("edit_closed")
    
}



// work with adding form 
const showAddForm = () => {
    add.classList.remove('add_closed');
}

const closeAddForm = () => {
    add.classList.add("add_closed");
}

addButton.addEventListener("click", showAddForm);
addCloseBtn.addEventListener("click", closeAddForm);

// find the form in the DOM
const profileFormElement = edit.querySelector(".edit__form") 

// find the form fields in the DOM
const nameInput = profileFormElement.querySelector(".edit__input_type_name")
const jobInput =  profileFormElement.querySelector(".edit__input_type_career")

// find the form fields in the DOM
const profileName = body.querySelector(".profile__info-name") 
const profileJob = body.querySelector(".profile__info-career")

// the form submission handler. Note that its name 
// starts with a verb and concisely describes what it does
function handleProfileFormSubmit(evt) {
    evt.preventDefault()  

    
    profileName.textContent = nameInput.value 
    profileJob.textContent = jobInput.value 


    closeForm();
}



//  render card element fields
var data = {
    name: ['Yoesmite Valley', 'Lake Louise', 'Bald mountains', 'Latemar', 'Vanoise National Park', 'Lago di Braies'],
    link: [
        'https://code.s3.yandex.net/web-code/yosemite.jpg',
        'https://code.s3.yandex.net/web-code/lake-louise.jpg',
        'https://code.s3.yandex.net/web-code/bald-mountains.jpg',
        'https://code.s3.yandex.net/web-code/latemar.jpg',
        "https://code.s3.yandex.net/web-code/vanoise.jpg",
        'https://code.s3.yandex.net/web-code/lago.jpg']
}


// function for show the card element into elements
const getCardElement = (data) => {
    

    for (let i = 0; i < data.name.length; i++)
    {
        // query element template
        let element = elementTemplate.querySelector(".element").cloneNode(true)
    
        element.querySelector(".element__title").textContent = data.name[i]
        element.querySelector(".element__pic").src = data.link[i]
        element.querySelector(".element__pic").alt = data.name[i]

        elements.append(element) 
    }

}



// call function
// get card element from data variable
getCardElement(data)

// element variable
const element = document.querySelector(".element");
const elementPic = document.querySelectorAll(".element__pic")
const elementDeleteBtn = document.querySelectorAll(".element__delete")
const elementIcon = document.querySelectorAll(".element__icon")


// function for create new element
const handleAddFormSubmit = (evt) => {

    evt.preventDefault()

    element.querySelector(".element__title").textContent = titleInput.value
    element.querySelector(".element__pic").src = linkInput.value
    element.querySelector(".element__pic").alt = titleInput.value

    elements.prepend(element)


    closeAddForm();
    
}

// function popup picture
const popupPicture = (evt) => {
    
    pic.classList.remove("pic__closed")

    picImg.src = evt.target.src
    picTitle.textContent = evt.target.alt
    
}

// function close picture modal
const closePic = () => {
    pic.classList.add("pic__closed")
}


// function delete element
const deleteElement = (evt) => {

    evt.target.parentElement.remove()
}

// function for like icon on element
const likeActive = (evt) => {
    evt.target.classList.toggle("element__icon-img_active")
}


// connect the handler to the form:
// it will watch the submit event
editBtn.addEventListener("click", showForm);
closeBtn.addEventListener("click", closeForm);

profileFormElement.addEventListener('submit', handleProfileFormSubmit);     
addFormElement.addEventListener('submit', handleAddFormSubmit)


for (i of elementDeleteBtn) {
    i.addEventListener('click', deleteElement)
}


for (i of elementPic) {
    i.addEventListener('click', popupPicture)
}

for (i of elementIcon) {
    i.addEventListener('click', likeActive)
    
}

picBtn.addEventListener("click", closePic)


