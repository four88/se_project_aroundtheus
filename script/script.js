// work with show and close edit form

var body = document.querySelector(".body");

var editBtn = body.querySelector(".button_edit");

var edit = body.querySelector(".edit") 

var closeBtn = edit.querySelector(".edit__close")

var overlay = body.querySelector(".overlay")

function showForm() { 
    edit.classList.remove("edit_closed")
    overlay.classList.add("overlay-on")
    nameInput.placeholder = profileName.textContent
    jobInput.placeholder = profileJob.textContent
}

function closeForm() {
    edit.classList.add("edit_closed")
    overlay.classList.remove("overlay-on")
    
}

editBtn.addEventListener("click", showForm);
closeBtn.addEventListener("click", closeForm);

// find the form in the DOM
var profileFormElement = edit.querySelector(".edit__form") // Use the querySelector() method

// find the form fields in the DOM
var nameInput = profileFormElement.querySelector(".input-name")
var jobInput =  profileFormElement.querySelector(".input-career")

// find the form fields in the DOM
var profileName = body.querySelector(".profile__info_name") 
var profileJob = body.querySelector(".profile__info_career")

// the form submission handler. Note that its name 
// starts with a verb and concisely describes what it does
function handleProfileFormSubmit(evt) {
    evt.preventDefault()  


    profileName.textContent = nameInput.value 
    profileJob.textContent = jobInput.value 

    nameInput.value = ""
    jobInput.value = ""
    closeForm();
}

// connect the handler to the form:
// it will watch the submit event
profileFormElement.addEventListener('submit', handleProfileFormSubmit);     

// render card element fields

var data = {
    name: ['Yoesmite Valley', 'Lake Louise', 'Bald mountains', 'Latemar', 'Vanoise National Park', 'Lago di Braies'],
    link: ['https://code.s3.yandex.net/web-code/yosemite.jpg',
        'https://code.s3.yandex.net/web-code/lake-louise.jpg',
        'https://code.s3.yandex.net/web-code/bald-mountains.jpg',
        'https://code.s3.yandex.net/web-code/latemar.jpg',
        "https://code.s3.yandex.net/web-code/vanoise.jpg",
        'https://code.s3.yandex.net/web-code/lago.jpg']
}

function getCardElement(data) {
    
    var elements = document.querySelector(".elements")
    for(let i = 0; i < data.name.length; i++)
    {
        elements.insertAdjacentHTML("beforeend", `
        <div class="element">
        <img src=${data.link[i]} alt=${data.name[i]} class="element__pic">
        <div class="element__name">
            <p class="element__title">${data.name[i]}</p>
            <img src="./images/icon.svg" alt="icon" class="element__icon">
        </div>
    </div>`)
    }
}
getCardElement(data);



// `
//         <div class="element">
//             <img src=${data.link[i]} alt=${data.name[i]} class="element__pic">
//             <div class="element__name">
//                 <p class="element__title">${data.name[i]}</p>
//                 <img src="./images/icon.svg" alt="icon" class="element__icon">
//             </div>
//         </div>`