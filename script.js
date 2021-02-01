'use strict';

let money = +prompt("Ваш месячный доход?"); //Доход за месяц

let income = "Фриланс";

let addExpenses = confirm("Перечислите возможные расходы за рассчитываемый период через запятую");

let expenses1 = prompt("Введите обязательную статью расходов?");
let amount1 = prompt("Во сколько это обойдется?");

let expenses2 = prompt("Введите обязательную статью расходов?");
let amount2 = prompt("Во сколько это обойдется?");

let budgetMonth = money-amount1;

let mission = 1000000;

let period = 12;

let budgetDay = Math.floor(budgetMonth/30);

console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);
console.log(addExpenses.toLocaleLowerCase().split(", "));
console.log(budgetMonth);
console.log(`Цель будет достигнута за ${Math.ceil(mission/budgetMonth)} месяцев(-а)`);
console.log(budgetDay);

if( budgetDay >= 1200 ){
    console.log("У вас высокий уровень дохода");
} else if( budgetDay < 1200 && budgetDay >=600 ){
    console.log("У вас средний уровень дохода");
} else if( budgetDay < 600 && budgetDay >=0 ) {
    console.log("К сожалению у вас уровень дохода ниже среднего");
} else{
    console.log("Что то пошло не так");
}