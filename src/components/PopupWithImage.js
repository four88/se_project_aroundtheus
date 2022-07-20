import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._image = this._popup.querySelector(".pic__img");

    this._imageCaption = this._popup.querySelector(".pic__title");
  }

  open(name, link) {
    this._image.src = link;

    this._imageCaption.textContent = name;

    super.open();
  }
}

