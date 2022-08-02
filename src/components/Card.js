export default class Card {
  constructor({ cardItem, handleCardClick, handleDeleteClick, handleLikeClick }, cardTemplateSelector, userId) {
    this._name = cardItem.name;
    this._link = cardItem.link;
    this._likes = cardItem.likes;
    this._cardItem = cardItem;
    this._userId = userId;
    this._ownerId = cardItem.owner._id
    this._id = cardItem._id;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getCardTemplate() {
    const cardTemplate = document
      .querySelector(this._cardTemplateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardTemplate;
  }

  _setEventListeners() {
    //delete button
    this._card
      .querySelector(".element__delete")
      .addEventListener("click", () => {
        this._handleDeleteClick(this);
      });

    //like button
    this._card
      .querySelector(".element__icon-img")
      .addEventListener("click", (e) => {
        const LikeButtonIsActive = this._card
          .querySelector(".element__icon-img")
          .classList.contains("element__icon-img_active");

        this._handleLikeClick(
          LikeButtonIsActive,
          this._cardItem._id,
          this._card.querySelector(".element__like-counter"),
          e
        )
      });

    //image popup
    this._card.querySelector(".element__pic")
      .addEventListener("click", () => {
        this._handleCardClick({
          title: this._name,
          link: this._link,
        });
      })
  }

  //Update card view: delete button, likes number
  _updateCardView() {
    const buttonItem = this._card.querySelector(".element__delete");

    //likes counter
    this._card.querySelector(".element__like-counter").textContent = this._likes.length;
    this._likes.forEach((card) => {
      if (this._userId === card._id) {
        this._card
          .querySelector(".element__icon-img")
          .classList.toggle("element__icon-img_active");
      }
    });
    //show delete icon if the card was created by the user
    if (this._userId === this._ownerId) {
      buttonItem.classList.add("element__delete-active");
    } else {
      buttonItem.disabled = true;
    }
  }

  // Remove card from DOM
  remove() {
    this._card.remove()
  }

  id() {
    return this._id;
  }

  generateCard() {
    this._card = this._getCardTemplate();

    this._card.querySelector(
      ".element__pic"
    ).src = this._link;
    this._card.querySelector(".element__title")
      .textContent = this._name;

    this._setEventListeners();
    this._updateCardView();
    return this._card;
  }
}

