'use strict';
function swap(moveElem, stayElem){
    stayElem.after(moveElem);
}
let books = document.getElementsByClassName('book');

books[1].after(books[0]);
books[3].before(books[4]);
books[5].after(books[2]);
books = document.getElementsByClassName('book');

let body = document.querySelector('body');
body.style.background = 'url(image/you-dont-know-js.jpg)';

books[2].querySelector('h2').children[0].innerText = 'Книга 3. this и Прототипы Объектов';

document.querySelector('.adv').remove();

let book2 = books[1].children[1].querySelectorAll('li');
swap(book2[6], book2[3]);
swap(book2[8], book2[6]);
swap(book2[2], book2[9]);

let book5 = books[4].children[1].querySelectorAll('li');
swap(book5[2], book5[4]);
swap(book5[9], book5[1]);
swap(book5[5], book5[7]);

let book6 = books[5].children[1].children;
let newElem = document.createElement('li');
newElem.innerText = 'Глава 8: За пределами ES6';
book6[8].after(newElem);
