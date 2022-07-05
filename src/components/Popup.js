export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClickClose = this._handleOverlayClickClose.bind(this);
  }

  open() {
    this._setEventListeners();
    this._popupElement.classList.add('popup_opened');
  }

  close() {
      this._popupElement.classList.remove('popup_opened');
      this._removeEventListeners()
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClickClose(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }
    
    _removeEventListeners() {
        document.removeEventListener('keydown', this._handleEscClose);
        this._popupElement.removeEventListener('click', this._handleOverlayClickClose);

  }

  _setEventListeners() {
    document.addEventListener('keydown', this._handleEscClose);

    const closeBtn = this._popupElement.querySelector('.popup__button-closed');

    closeBtn.addEventListener('click', () => {
      this.close();
    });

    // for click overlay to close popup
    this._popupElement.addEventListener('click', this._handleOverlayClickClose);
  }
}
