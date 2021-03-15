'use strict';
const task1 = document.getElementById('task1');
const task2 = document.getElementById('task2');
const body = document.querySelector('body');
// 1
task1.innerHTML = task1.innerHTML.replace(/(функци(и|я))/ig, '<strong>$1</strong>');

// 2
task2.innerHTML = task2.innerHTML.replace(/(\d+:\d+)/ig, `<b>$1</b>`);

// // 3 
task1.innerHTML = task1.innerHTML.replace(/(«[а-я]+[а-я\s]*(— )*[а-я\s]*[а-я]*»)/ig, '<mark>$1</mark>');
task2.innerHTML = task2.innerHTML.replace(/("[а-я]+[а-я\s]*(— )*[а-я\s]*[а-я]*")/ig, '<mark>$1</mark>');


// 4
task2.innerHTML = task2.innerHTML.replace(/(http:\/\/)([^w]\w*\.\w{2,3})/ig, `<a href="$1$2">$2</a>`);

// 5
console.log(body.innerHTML.match(/#[a-f0-9]*/ig));

// 6

task2.innerHTML = task2.innerHTML.replace(/(http:\/\/)(\w*\.\w*.\w{2})(.*\/)/ig, `<a href="$1$2$3">$2</a>`);