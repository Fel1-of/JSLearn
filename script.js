'use strict';
function generateOddNumber(x, y){
    let rand = Math.floor(Math.min(x, y) + Math.random() * (Math.max(x, y) + 1 - Math.min(x, y)));
    console.log(rand);
}

generateOddNumber(1, 100);
generateOddNumber(0, -10);
generateOddNumber(-7, -3);
generateOddNumber(-100, 100);
generateOddNumber(1, -1);