import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popupElement.querySelector(".pic__img")
        this._title = this._popupElement.querySelector(".pic__title")
    }

    open(data) {
        this._image.src = data.link
        this._title.textContent = data.name
        this._image.alt = `Photo of ${data.name}`

        super.open()
    }
    
}