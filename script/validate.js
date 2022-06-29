const showInputError = (formElement,inputElement, { inputErrorClass, errorClass }) => {
    const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`)
    
    inputElement.classList.add(inputErrorClass)
    errorMessageElement.textContent = inputElement.validationMessage
    errorMessageElement.classList.add(errorClass)

}

const hideInputError = (formElement,inputElement, { inputErrorClass, errorClass }) => {
    const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`)
    
    inputElement.classList.remove(inputErrorClass)
    errorMessageElement.classList.remove(errorClass)
    errorMessageElement.textContent = ''
}

const checkInputValidity = (formElement, inputElement, options) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, options)
    } else {
        hideInputError(formElement, inputElement, options)
    }
}

const hasInvalidInput = (inputList) => {
    return !inputList.every((inputElement) => inputElement.validity.valid)
}

const toggleButtonState = (inputElements, submitButton, {inactiveButtonClass}) => {
    if (hasInvalidInput(inputElements)) {
        submitButton.classList.add(inactiveButtonClass)
        submitButton.disabled = true;
        return;
    }
        
    submitButton.classList.remove(inactiveButtonClass)
    submitButton.disabled = false;
}

const setEventListeners = (formElement, options) => {
    const {inputSelector} = options
    const inputElements = [...formElement.querySelectorAll(inputSelector)]
    const submitButton = formElement.querySelector(".popup__button")

    inputElements.forEach((inputElement) => {
        inputElement.addEventListener('input', (e) => {
            checkInputValidity(formElement, inputElement, options)
            toggleButtonState(inputElements,submitButton, options)
        })
    })
}

const enableValidation = (options) => {
    const formElements = Array.from(document.querySelectorAll(options.formSelector))
    formElements.forEach((formElement) => {
        formElement.addEventListener('submit', (e) => {
            e.preventDefault()
        });


        
        setEventListeners(formElement, options);

    })
}


const config = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
}

enableValidation(config); 

