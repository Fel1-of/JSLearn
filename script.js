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
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 70000,
    period: 3,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function () {

        if (confirm("Есть ли у вас дополнительный заработок?")) {
            let itemIncome;
            do {
                itemIncome = prompt("Какой у вас дополнительнтй заработок?");
            } while (isNumber(itemIncome));

            let cashIncome;
            do {
                cashIncome = prompt("Сколько в месяц зарбатываете на этом?");
            } while (!isNumber(cashIncome));
            
            this.income[itemIncome] = cashIncome;
        }

        let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую с пробелом");
        this.addExpenses = addExpenses.split(', ');
        this.deposit = confirm("Есть ли у вас депозит в банке?");

        for (let i = 0; i < 2; i++) {
            let answer;
            do {
                answer = prompt('Введите обязательную статью расхода:');
            } while (isNumber(answer));

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
    
    getInfoDeposit: function () {
        if (this.deposit) {
            do {
                this.percentDeposit = prompt("Какой у вас годовой процент?");
            } while (!isNumber(this.percentDeposit));

            do {
                this.moneyDeposit = prompt("Какая сумма заложена?");
            } while (!isNumber(this.moneyDeposit));
        }
    },

    calcSavedMoney: function () {
        return this.budgetMonth * this.period;
    }
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

appData.getInfoDeposit();

let arr = [];

for (let i = 0; i < appData.addExpenses.length; i++) {
    arr.push(`${appData.addExpenses[i].trim().slice(0, 1).toUpperCase() + appData.addExpenses[i].trim().slice(1)}`);
}

console.log(arr.join(', '));