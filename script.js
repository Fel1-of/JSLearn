'use strict';
let money;

function isNumber(num) {
    return !isNaN(parseFloat(num)) && isFinite(parseFloat(num));
}

function start() {
    do {
        money = prompt("Ваш месячный доход?");
    } while (!isNumber(money) || !money.trim());
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
                itemIncome = prompt("Какой у вас дополнительный заработок?");
            } while (isNumber(itemIncome) || !itemIncome.trim());

            let cashIncome;
            do {
                cashIncome = prompt("Сколько в месяц зарбатываете на этом?");
            } while (!isNumber(cashIncome) || !cashIncome.trim());
            
            this.income[itemIncome] = cashIncome;
        }

        let addExpenses;
        do {
            addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую с пробелом").toLowerCase().replace(/\s+/g, ' ').trim();
        } while (isNumber(addExpenses) || !addExpenses.trim());
        
        this.addExpenses = addExpenses.split(',');
        this.deposit = confirm("Есть ли у вас депозит в банке?");

        for (let i = 0; i < 2; i++) {
            let answer;
            do {
                answer = prompt('Введите обязательную статью расхода:');
            } while (isNumber(answer) || !answer.trim());

            let amount;
            do {
                amount = prompt('Во сколько это обойдется?');
            } while(!isNumber(amount) || !amount.trim());
            this.expenses[`${amount}`] = +amount;
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
            } while (!isNumber(this.percentDeposit) || !this.percentDeposit.trim());

            do {
                this.moneyDeposit = prompt("Какая сумма заложена?");
            } while (!isNumber(this.moneyDeposit) || !this.moneyDeposit.trim());
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

const calcButton = document.getElementById('#start');

const plusButtonFirst = document.getElementsByTagName('button')[0];
const plusButtonSecond = document.getElementsByTagName('button')[1];

const depositCheckBox = document.querySelector('#deposit-check');
const additionalIncome = document.querySelectorAll('.additional_income-item');

const budgetMonthValue = document.getElementsByClassName('budget_month-value');
const budgetDayValue = document.getElementsByClassName('budget_day-value');
const expensesMonthValue = document.getElementsByClassName('expenses_month-value');
const additionalIncomeValue = document.getElementsByClassName('additional_income-value');
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value');
const incomePeriodValue = document.getElementsByClassName('income_period-value');
const targetMonthValue = document.getElementsByClassName('target_month-value');

let salaryElement = document.querySelector('.salary');
let incomeElement = document.querySelector('.income');
let additionalIncomeElement = document.querySelector('.additional_income');
let expensesElement = document.querySelector('.expenses');
let additionalExpensesElement = document.querySelector('.additional_expenses');
let depositElement = document.querySelector('.deposit');
let targetElement = document.querySelector('.target');
let periodElement = document.querySelector('.period');