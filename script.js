'use strict';
let money;

function isNumber(num){
    return !isNaN(parseFloat(num)) && isFinite(parseFloat(num));
}

function start(){
    do {
        money = prompt("Ваш месячный доход?");
    } while(!isNumber(money));
}

start();


let income = "Фриланс",
    addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую"),
    expenses = [],
    deposit = confirm("Есть ли у вас депозит в банке?"),
    mission = 1000000,
    period = 12;




function getExpensesMonth() {
    
    let sum = 0;
    
    for (let i = 0; i < 2; i++) {
        expenses.push(prompt('Введите обязательную статью расхода:'));
        let amount = prompt('Во сколько это обойдется?');

        while(!isNumber(amount)){
            alert('Данные не являются числом. Выполните кооректный ввод!');
            amount = prompt('Во сколько это обойдется?');
        }

        
        sum += Number(amount);
        
    }

    return sum;
};

function getAccumulatedMonth(budget,expenses){
    return budget-expenses;
}

let expensesAmount = getExpensesMonth();

let accumulatedMonth = getAccumulatedMonth(money, expensesAmount);

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
        console.log("Что-то пошло не так");
    }
};



showTypeOf(money);
showTypeOf(deposit);
showTypeOf(income);
console.log(addExpenses.toLocaleLowerCase().split(", "));
console.log(expensesAmount);
console.log((Math.floor(getTargetMonth(mission, accumulatedMonth)) > 0) ? "Цель будет достигнута" : "Цель не будет достигнута");
console.log(budgetDay);
getStatusIncome(budgetDay);
