import Popup from "./Popup.js"

export default class PopupWithForm extends Popup{
    constructor({popupSelector, formSubmitHandle}) {
        super(popupSelector)
        
        this._formSubmitHandle = formSubmitHandle
        this._formSelector = this._popupSelector.querySelector(".popup__form") 
        
    }

    _getInputValue() {
        this._inputList = [...this._formSelector.querySelectorAll(".popup__input")]
        this._inputValues = {}

        this._inputList.forEach((input) => {
            this._inputValues[input.name] = input.value
        })

        return this._inputValues

    }

    setEventListeners() {
        this._formSelector.addEventListener("submit", (evt) => {
            evt.preventDefault();
            
            // get input value form _getInputValue then you can run any function 
            // by using these input
            this._formSubmitHandle(this._getInputValue());
        });
        super._setEventListeners();
    }
    close() {
        super.close();
        this._formSelector.reset()
    }
}

