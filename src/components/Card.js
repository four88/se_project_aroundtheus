

// pic variable
const pic = document.querySelector('.pic');
const picImg = document.querySelector('.pic__img');
const picTitle = document.querySelector('.pic__title');

export class Card {
  constructor({data, handleCardClick}, templateSelector){
    this._name = data.name
    this._link = data.link
    this._handleCardClick = handleCardClick
    this._templateSelector = templateSelector 
  }
  
  _getTemplate(){
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(".element")
      .cloneNode(true)

    return cardElement;
  }

  generateCard(){
    this._element = this._getTemplate()
    this._setEventListeners()

    this._element.querySelector(".element__title").textContent = this._name;
    this._element.querySelector(".element__pic").src = this._link
    this._element.querySelector(".element__pic").alt = `Photo of ${this._name}`
    


    return this._element
  }
 
  _toggleLike(evt){
    evt.target.classList.toggle("element__icon-img_active"); 
    
  }

  _deleteElement(evt){
    evt.target.closest('.element').remove()

  }


  
  


  _setEventListeners(){
    this._element.querySelector('.element__delete')
      .addEventListener('click', this._deleteElement)

    this._element.querySelector('.element__pic')
      .addEventListener('click', () => this._handleCardClick())

    this._element.querySelector('.element__icon-img')
      .addEventListener('click', this._toggleLike)
  }



  }
