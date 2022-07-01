// function for close popup when press Escape
export function closePopupByEscape(event) {
  if (event.key === "Escape") {
     // search for an opened popup
     const openedPopup = document.querySelector(".popup_opened")
     closePopup(openedPopup) 
  }
} 

// function for close popup when click on popup background
export function closePopupOnRemoteClick(evt) {
  // target is the element on which the event happened
  // currentTarget is the popup
  // if they are the same then we should close the popup
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target)
  }
}



export const showPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape)
  popup.addEventListener("mousedown", closePopupOnRemoteClick)
};

export const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape)
  popup.removeEventListener("mousedown", closePopupOnRemoteClick) 
};

