export class FormValidator {
  constructor(formSelector,option){
    this._formSelector = formSelector
    this._inputSelector = option.inputSelector
    this._submitButtonSelector = option.submitButtonSelector
    this._inactiveButtonClass = option.inactiveButtonClass
    this._inputErrorClass = option.inputErrorClass
    this._errorClass = option.errorClass
  }

  // show input error class and input message
 _showInputError  ( inputElement )  {
    const errorMessageElement = this._formSelector.querySelector(`#${inputElement.id}-error`)
    
    inputElement.classList.add(this._inputErrorClass)
    errorMessageElement.textContent = inputElement.validationMessage
    errorMessageElement.classList.add(this._errorClass)

}

// hide input error class and input message
_hideInputError  (inputElement )  {
    const errorMessageElement = this._formSelector.querySelector(`#${inputElement.id}-error`)
    
    inputElement.classList.remove(this._inputErrorClass)
    errorMessageElement.classList.remove(this._errorClass)
    errorMessageElement.textContent = ''
}

// check each input are valid or not 
_checkInputValidity  ( inputElement)  { 
    if (!inputElement.validity.valid) { 
        this._showInputError(inputElement ) 
    } else {
        this._hideInputError(inputElement) 
    } 

} 

// check if input has some invalid return true for using on toggleButtonState 
 _hasInvalidInput  (inputList)  {
    return !inputList.every((inputElement) => inputElement.validity.valid )
}

// function for set button if hasInvalidInput return add inactiveButtonClass to button
 _toggleButtonState  (inputElements, submitButton )  {
    
     if (this._hasInvalidInput(inputElements)) {
        submitButton.classList.add(this._inactiveButtonClass)
        submitButton.disabled = true;
        return;
    }
        
    submitButton.classList.remove(this._inactiveButtonClass)
    submitButton.disabled = false;
 }
    


// set input element and button element to checkInputValidity and toggleButtonState
 _setEventListeners  ()  {
    
    const inputElements = [...this._formSelector.querySelectorAll(this._inputSelector)] // ... similar to Array.from
    const submitButton = this._formSelector.querySelector(this._submitButtonSelector)

    inputElements.forEach((inputElement) => {
        inputElement.addEventListener('input', (e) => {
            this._checkInputValidity(inputElement)
            this._toggleButtonState(inputElements, submitButton)
            
        })
    })
}
// enable validation function
 enableValidation(){ 
    
        this._formSelector.addEventListener('submit', (e) => {
            e.preventDefault()
        })


        
     this._setEventListeners()
     

    }
}

