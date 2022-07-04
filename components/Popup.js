export default class Popup {
constructor(popupSelector) {
        this._popupSelector = document.querySelector(popupSelector)
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._setEventListeners()
        this._popupSelector.classList.add('popup_opened');
    }

    close() {
        this._popupSelector.classList.remove('popup_opened')
    }


    _handleEscClose(evt) {
        if (evt.key === "Escape") {
          this.close();
        }
      }
    


    _setEventListeners() {

        
        document.addEventListener("keydown", this._handleEscClose)
        
        
        const closeBtn = this._popupSelector.querySelector(".popup__button-closed")
        
        closeBtn.addEventListener('click', () => {
            this.close()
        })

        // for click overlay to close popup
        this._popupSelector.addEventListener("click", (evt) => {
            if (evt.target === evt.currentTarget) {
                this.close();
            }
        })


    
    }

}
