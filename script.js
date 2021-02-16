'use strict'; 
//base
let DOM = document.querySelector('.DOM');


function DomElement (selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
    this.element = '';
}

DomElement.prototype.createElement = function () {
    if (this.selector.startsWith('.')) {
        this.element = document.createElement('div');
        this.element.classList.add(`${this.selector.slice(1)}`);
        this.element.textContent = "Тут должен быть текст";
        this.element.style.cssText = `height: ${this.height};
                                    width: ${this.width};
                                    background: ${this.bg};
                                    font-size: ${this.fontSize};`;
                                    
        DOM.append(this.element);

    } else if (this.selector.startsWith('#')) {
        this.element = document.createElement('p');
        this.element.setAttribute('id', `${this.selector.slice(1)}`);
        this.element.textContent = "Тут должен быть текст";
        this.element.style.cssText = `height: ${this.height};
                                    width: ${this.width};
                                    background: ${this.bg};
                                    font-size: ${this.fontSize};`;

                                    DOM.append(this.element);
    }
};

let domElement = new DomElement('#block', '200px', '300px', 'red', '25px');
domElement.createElement();


