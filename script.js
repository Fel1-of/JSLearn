'use strict';
function isNumber(num){
    return !isNaN(parseFloat(num)) && isFinite(parseFloat(num));
}

function game(){
    let rand = Math.floor(Math.random() * 100) + 1;
    let ans = prompt("Угадай число от 1 до 100");
    function answer(){
        if(!isNumber(ans) && ans!==null ){
            ans=prompt("Введи число!");
        }
        if(!isNumber(ans) && ans!==null){
            answer();
        }
        return Number(ans);
    }
    answer();
    function MoreLess(){
        if(ans===null){
            alert("Игра окончена");
        }
        else if(ans>rand){
            ans=prompt("Загаданное число меньше. Введите новое:");
            answer();
            MoreLess();
        }
        else if(ans<rand){
            ans=prompt("Загаданное число больше. Введите новое:");
            answer();
            MoreLess();
        } 
        else{
            alert('Поздравляю, Вы угадали!!!');
        }
    }
    MoreLess();




}

game();
