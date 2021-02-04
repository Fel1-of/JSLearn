'use strict';

function isNumber(num) {
    return !isNaN(parseFloat(num)) && isFinite(parseFloat(num));
}

function game() {
    let rand = Math.floor(Math.random() * 100) + 1;
    let ans = prompt("Угадай число от 1 до 100");

    function answer() {
        if (!isNumber(ans) && ans !== null) {
            ans = prompt("Введи число!");
            answer();
        }
        return Number(ans);
    }
    answer();

    function moreLess() {
        if (ans === null) {
            alert("Игра окончена");
        } else if (ans > 100 || ans < 1) {
            ans = prompt("Введите число от 1 до 100!");
            answer();
            moreLess();
        } else if (ans > rand) {
            ans = prompt("Загаданное число меньше. Введите новое:");
            answer();
            moreLess();
        } else if (ans < rand) {
            ans = prompt("Загаданное число больше. Введите новое:");
            answer();
            moreLess();
        } else {
            alert('Поздравляю, Вы угадали!!!');
        }
    }
    moreLess();




}

game();