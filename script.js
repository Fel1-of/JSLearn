'use strict';
let money;

function isNumber(num) {
    return !isNaN(parseFloat(num)) && isFinite(parseFloat(num));
}

function start() {
    do {
        money = prompt("Ваш месячный доход?");
    } while (!isNumber(money));
}

start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 70000,
    period: 3,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function () {
        let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую с пробелом");
        this.addExpenses = addExpenses.split(', ');
        this.deposit = confirm("Есть ли у вас депозит в банке?");

        for (let i = 0; i < 2; i++) {
            let answer = prompt('Введите обязательную статью расхода:');
            this.expenses[`"${answer}"`] = 0;

            let amount = prompt('Во сколько это обойдется?');
            if (isNumber(amount)) {
                this.expenses[`"${answer}"`] = +amount;
            } else {
                alert("Введите число!");
            }
        }
    },

    getExpensesMonth: function () {
        let sum = 0;

        for (let key in this.expenses) {
            sum += this.expenses[key];
        }

        this.expensesMonth = sum;
    },

    getBudget: function () {
        this.budgetMonth = this.budget - this.expensesMonth;
        this.budgetDay = this.budgetMonth / 30;
    },

    getTargetMonth: function () {
        return Math.ceil(this.mission / this.budgetMonth);
    },

    getStatusIncome: function () {
        if (this.budgetDay >= 1200) {
            console.log("У вас высокий уровень дохода");
        } else if (this.budgetDay < 1200 && this.budgetDay >= 600) {
            console.log("У вас средний уровень дохода");
        } else if (this.budgetDay < 600 && this.budgetDay >= 0) {
            console.log("К сожалению у вас уровень дохода ниже среднего");
        }
    },
}

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();

console.log(appData.expensesMonth);
console.log((appData.getTargetMonth() > 0) ? `Цель будет достигнута за ${appData.getTargetMonth()} месяцев(-а)` : "Цель не будет достигнута");
appData.getStatusIncome();

console.log("Наша программа включает в себя данные: ")
for (const key in appData) {
    console.log(`Свойство ${key} - значение ${appData[key]}`);
}