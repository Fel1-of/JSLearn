'use strict';

let money = +prompt("Ваш месячный доход?"); //Доход за месяц

let income = "Фриланс";

let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");

let deposit = confirm("Есть ли у вас депозит в банке?");


let expenses1 = prompt("Введите обязательную статью расходов?");
let amount1 = +prompt("Во сколько это обойдется?");

let expenses2 = prompt("Введите обязательную статью расходов?");
let amount2 = +prompt("Во сколько это обойдется?");

let mission = 1000000;

let period = 12;

function getExpensesMonth(a,b){
    return a+b;
}

function getAccumulatedMonth(a,b){
    return a-b;
}

let accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth(amount1, amount2));

function getTargetMonth(mission, budget){
    return Math.ceil(mission/budget);
}

let budgetDay = Math.floor(accumulatedMonth/30);

const showTypeOf = function(a) {
    console.log(typeof(a));
};

const getStatusIncome = function (budgetDay) {
    if (budgetDay >= 1200) {
    console.log("У вас высокий уровень дохода");
    } else if (budgetDay < 1200 && budgetDay >= 600){
        console.log("У вас средний уровень дохода");
    } else if (budgetDay < 600 && budgetDay >= 0) {
        console.log("К сожалению у вас уровень дохода ниже среднего");
    } else if (budgetDay < 0){
        console.log("Что-то пошло не так")
    }
};

showTypeOf(money);
showTypeOf(deposit);
showTypeOf(income);
console.log(addExpenses.toLocaleLowerCase().split(", "));
console.log(getExpensesMonth(amount1, amount2));
console.log(`Цель будет достигнута за ${getTargetMonth(mission, accumulatedMonth)} месяцев(-а)`);
console.log(budgetDay);
getStatusIncome(budgetDay);
