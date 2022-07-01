export class formValidator {
  constructor(option, submitButtonFormClass){
    this._formSelector = option.formSelector
    this._inputSelector = option.inputSelector
    this._submitButtonSelector = option.submitButtonSelector
    this._inactiveButtonClass = option.inactiveButtonClass
    this._inputErrorClass = option.inputErrorClass
    this._errorClass = option.errorClass
    this._submitButtonFormClass = submitButtonFormClass
  }

  // show input error class and input message
 _showInputError  (formElement, inputElement )  {
    const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`)
    
    inputElement.classList.add(this._inputErrorClass)
    errorMessageElement.textContent = inputElement.validationMessage
    errorMessageElement.classList.add(this._errorClass)

}

// hide input error class and input message
_hideInputError  (formElement,inputElement )  {
    const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`)
    
    inputElement.classList.remove(this._inputErrorClass)
    errorMessageElement.classList.remove(this._errorClass)
    errorMessageElement.textContent = ''
}

// check each input are valid or not 
 _checkInputValidity  (formElement, inputElement)  {
    if (!inputElement.validity.valid) {
        this._showInputError(formElement, inputElement )
    } else {
        this._hideInputError(formElement, inputElement)
    }
}

// check if input has some invalid return true for using on toggleButtonState 
 _hasInvalidInput  (inputList)  {
    return !inputList.every((inputElement) => inputElement.validity.valid)
}

// function for set button if hasInvalidInput return add inactiveButtonClass to button
 toggleButtonState  (inputElements, submitButton )  {
    if (this._hasInvalidInput(inputElements)) {
        submitButton.classList.add(this._inactiveButtonClass)
        submitButton.disabled = true;
        return;
    }
        
    submitButton.classList.remove(this._inactiveButtonClass)
    submitButton.disabled = false;
}

// set input element and button element to checkInputValidity and toggleButtonState
 _setEventListeners  (formElement)  {
    
    const inputElements = [...formElement.querySelectorAll(this._inputSelector)] // ... similar to Array.from
    const submitButton = formElement.querySelector(this._submitButtonFormClass)

    inputElements.forEach((inputElement) => {
        inputElement.addEventListener('input', (e) => {
            this._checkInputValidity(formElement, inputElement)
            this.toggleButtonState(inputElements,submitButton)
        })
    })
}
// enable validation function
 enableValidation(){ 
    const formElements = Array.from(document.querySelectorAll(this._formSelector))
    formElements.forEach((formElement) => {
        formElement.addEventListener('submit', (e) => {
            e.preventDefault()
        });


        
        this._setEventListeners(formElement);

    })
}
}
