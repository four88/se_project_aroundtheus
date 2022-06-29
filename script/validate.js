// show input error class and input message
const showInputError = (formElement, inputElement, { inputErrorClass, errorClass }) => {
    const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`)
    
    inputElement.classList.add(inputErrorClass)
    errorMessageElement.textContent = inputElement.validationMessage
    errorMessageElement.classList.add(errorClass)

}

// hide input error class and input message
const hideInputError = (formElement,inputElement, { inputErrorClass, errorClass }) => {
    const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`)
    
    inputElement.classList.remove(inputErrorClass)
    errorMessageElement.classList.remove(errorClass)
    errorMessageElement.textContent = ''
}

// check each input are valid or not 
const checkInputValidity = (formElement, inputElement, options) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, options)
    } else {
        hideInputError(formElement, inputElement, options)
    }
}

// check if input has some invalid return true for using on toggleButtonState 
const hasInvalidInput = (inputList) => {
    return !inputList.every((inputElement) => inputElement.validity.valid)
}

// function for set button if hasInvalidInput return add inactiveButtonClass to button
const toggleButtonState = (inputElements, submitButton, {inactiveButtonClass}) => {
    if (hasInvalidInput(inputElements)) {
        submitButton.classList.add(inactiveButtonClass)
        submitButton.disabled = true;
        return;
    }
        
    submitButton.classList.remove(inactiveButtonClass)
    submitButton.disabled = false;
}

// set input element and button element to checkInputValidity and toggleButtonState
const setEventListeners = (formElement, options) => {
    const {inputSelector} = options
    const inputElements = [...formElement.querySelectorAll(inputSelector)] // ... similar to Array.from
    const submitButton = formElement.querySelector(".popup__button")

    inputElements.forEach((inputElement) => {
        inputElement.addEventListener('input', (e) => {
            checkInputValidity(formElement, inputElement, options)
            toggleButtonState(inputElements,submitButton, options)
        })
    })
}

// enable validation function
const enableValidation = (options) => {
    const formElements = Array.from(document.querySelectorAll(options.formSelector))
    formElements.forEach((formElement) => {
        formElement.addEventListener('submit', (e) => {
            e.preventDefault()
        });


        
        setEventListeners(formElement, options);

    })
}

// set all parameter for add into enableValidation
const config = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
}

enableValidation(config); 

