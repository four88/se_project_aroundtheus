import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, formSubmitHandle }) {
    super(popupSelector);

    this._formSubmitHandle = formSubmitHandle;
    this._formElement = this._popupElement.querySelector('.popup__form');
  }

  _getInputValue() {
    const inputList = [...this._formElement.querySelectorAll('.popup__input')];
    const inputValues = {};

    inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  _handleSubmit = (evt) => {
    evt.preventDefault();
    this._formSubmitHandle(this._getInputValue());
  };

  _setEventListeners() {
    this._formElement.addEventListener('submit', this._handleSubmit);
    super._setEventListeners();
  }

  _removeEventListeners() {
    this._formElement.removeEventListener('submit', this._handleSubmit);
    super._removeEventListeners();
  }
}
