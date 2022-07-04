export default class Section{
    constructor({ items, renderer }, containerSelector) {
        this._renderedItems = items
        this._renderer = renderer
        this._container = document.querySelector(containerSelector)
    }
    
    addItem(card){
        this._container.prepend(card)
    }

    renderItem(){
        this._renderedItems.forEach((item) => {
            this._renderer(item)
        })
    }
    
}
