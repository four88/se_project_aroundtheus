export class FormValidator {
  constructor(formElement,option){
    this._formElement = formElement
    this._inputSelector = option.inputSelector
    this._submitButtonSelector = option.submitButtonSelector
    this._inactiveButtonClass = option.inactiveButtonClass
    this._inputErrorClass = option.inputErrorClass
    this._errorClass = option.errorClass
  }

  // show input error class and input message
 _showInputError  ( inputElement )  {
    const errorMessageElement = this._formElement.querySelector(`#${inputElement.id}-error`)
    
    inputElement.classList.add(this._inputErrorClass)
    errorMessageElement.textContent = inputElement.validationMessage
    errorMessageElement.classList.add(this._errorClass)

}

// hide input error class and input message
_hideInputError  (inputElement )  {
    const errorMessageElement = this._formElement.querySelector(`#${inputElement.id}-error`)
    
    inputElement.classList.remove(this._inputErrorClass)
    errorMessageElement.classList.remove(this._errorClass)
    errorMessageElement.textContent = ''
}

// check each input are valid or not 
_checkInputValidity ( inputElement)  { 
    if (!inputElement.validity.valid) { 
        this._showInputError(inputElement ) 
    } else {
        this._hideInputError(inputElement) 
    } 

} 

// check if input has some invalid return true for using on toggleButtonState 
 _hasInvalidInput = () =>  {
    return !this._inputList.every((inputElement) => inputElement.validity.valid )
}

// function for set button if hasInvalidInput return add inactiveButtonClass to button
toggleButtonState(){
     if (this._hasInvalidInput()) {
        this._buttonElement.classList.add(this._inactiveButtonClass)
        this._buttonElement.disabled = true;
        return;
    }
        
    this._buttonElement.classList.remove(this._inactiveButtonClass)
    this._buttonElement.disabled = false;
 }
    


// set input element and button element to checkInputValidity and toggleButtonState
    _setEventListeners() {
     
    this._inputList = [...this._formElement.querySelectorAll(this._inputSelector)] // ... similar to Array.from
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector) 

     
    this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', (e) => {
            this._checkInputValidity(inputElement)
            this.toggleButtonState()
            
        })
    })
}
// enable validation function
 enableValidation(){ 
    
        this._formElement.addEventListener('submit', (e) => {
            e.preventDefault()
        })


        
     this._setEventListeners()
     

    }
}

