'use strict';

const isNumber = function (num) {
    return !isNaN(Number(num)) && !isNaN(parseFloat(num)) && isFinite(parseFloat(num));
}

let money;


let calcStartButton = document.getElementById('start');
let calcClearButton = document.getElementById('cancel');

let plusButtonIncome = document.getElementsByTagName('button')[0];
let plusButtonExpenses = document.getElementsByTagName('button')[1];

let depositCheckBox = document.querySelector('#deposit-check');
let additionalIncome = document.querySelectorAll('.additional_income-item');

let budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
let budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
let expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
let additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
let incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
let targetMonthValue = document.getElementsByClassName('target_month-value')[0];

let salaryElement = document.querySelector('.salary-amount');

let incomeTitleElement = document.querySelector('.income-title');
let incomeItems = document.querySelectorAll('.income-items');

let additionalIncomeElement = document.querySelectorAll('.additional_income-item');

let expensesTitleElement = document.querySelector('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
let additionalExpensesElement = document.querySelector('.additional_expenses-item');

let depositCheckElement = document.querySelector('.deposit-check');
let depositAmountElement = document.querySelector('.deposit-amount');
let depositPercentElement = document.querySelector('.deposit-percent');

let targetElement = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select');
let periodAmount = document.querySelector('.period-amount');

let placeholderSum = document.querySelectorAll('[placeholder="Сумма"]')
let placeholderName = document.querySelectorAll('[placeholder="Наименование"]')


let appData = {
    budget: 0,
    income: {},
    addIncome: [],
    incomeMonth: 0,
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,

    start: function () {
        appData.budget = +salaryElement.value;

        appData.getExpenses();
        appData.getExpensesMonth();
        appData.getIncome();

        appData.getAddExpences();
        appData.getAddIncome();
        appData.getBudget();

        appData.showResult();
    },

    showResult: function () {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = Math.ceil(appData.budgetDay);
        expensesMonthValue.value = appData.expensesMonth;
        targetMonthValue.value = appData.getTargetMonth();
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        incomePeriodValue.value = appData.calcPeriod();

        periodSelect.addEventListener('input', appData.showResult);

    },

    addExpensesBlock: function () {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems = document.querySelectorAll('.expenses-items');

        cloneExpensesItem.children[0].value = '';
        cloneExpensesItem.children[1].value = '';

        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plusButtonExpenses);

        if (expensesItems.length === 2) {
            plusButtonExpenses.style.display = 'none';
        }

        placeholderSum = document.querySelectorAll('[placeholder="Сумма"]');
        placeholderName = document.querySelectorAll('[placeholder="Наименование"]');

        placeholderSum.forEach(function (elem) {
            elem.addEventListener('input', () => elem.value = elem.value.replace(/[^\d]/g, ''));
        });

        placeholderName.forEach(function (elem) {
            elem.addEventListener('input', () => elem.value = elem.value.replace(/[^а-яё\s\.\,\;\:]/gi, ''));
        });

    },

    addIncomeBlock: function () {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems = document.querySelectorAll('.income-items');

        cloneIncomeItem.children[0].value = '';
        cloneIncomeItem.children[1].value = '';

        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, plusButtonIncome);

        if (incomeItems.length === 2) {
            plusButtonIncome.style.display = 'none';
        }

        placeholderSum = document.querySelectorAll('[placeholder="Сумма"]');
        placeholderName = document.querySelectorAll('[placeholder="Наименование"]');

        placeholderSum.forEach(function (elem) {
            elem.addEventListener('input', () => elem.value = elem.value.replace(/[^\d]/g, ''));
        });

        placeholderName.forEach(function (elem) {
            elem.addEventListener('input', () => elem.value = elem.value.replace(/[^а-яё\s\.\,\;\:]/gi, ''));
        });
    },

    getAddExpences: function () {
        let addExpenses = additionalExpensesElement.value.split(',');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },

    getAddIncome: function () {
        additionalIncomeElement.forEach(function (item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        })
    },

    getExpenses: function () {
        expensesItems = document.querySelectorAll('.expenses-items');
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;

            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = +cashExpenses;
            }
        });
    },

    getIncome: function () {
        let IncomeItems = document.querySelectorAll('.income-items');
        IncomeItems.forEach(function (item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;

            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = +cashIncome;
            }
        });
    },

    getExpensesMonth: function () {
        let sum = 0;

        for (let key in appData.expenses) {
            sum += appData.expenses[key];
        }

        appData.expensesMonth = sum;
    },

    getBudget: function () {
        appData.budgetMonth = appData.budget + +appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = +appData.budgetMonth / 30;
    },

    getTargetMonth: function () {
        return Math.ceil(targetElement.value / appData.budgetMonth);
    },

    getStatusIncome: function () {
        if (appData.budgetDay >= 1200) {
            console.log("У вас высокий уровень дохода");
        } else if (appData.budgetDay < 1200 && appData.budgetDay >= 600) {
            console.log("У вас средний уровень дохода");
        } else if (appData.budgetDay < 600 && appData.budgetDay >= 0) {
            console.log("К сожалению у вас уровень дохода ниже среднего");
        };
    },

    getInfoDeposit: function () {
        if (appData.deposit) {
            do {
                appData.percentDeposit = prompt("Какой у вас годовой процент?");
            } while (!isNumber(appData.percentDeposit));

            do {
                appData.moneyDeposit = prompt("Какая сумма заложена?");
            } while (!isNumber(appData.moneyDeposit));
        }
    },

    changePeriodValue: function () {
        periodAmount.textContent = periodSelect.value;
    },

    checkMonthInputValue: function () {
        console.log('here :>> ');
        if (salaryElement.value === '') {
            calcStartButton.removeEventListener('click', appData.start);
        } else {
            calcStartButton.addEventListener('click', appData.start);
        }
    },

    calcPeriod: function () {
        return appData.budgetMonth * periodSelect.value;
    }
};

placeholderSum.forEach(function (elem) {
    elem.addEventListener('input', () => elem.value = elem.value.replace(/[^\d]/g, ''));
});

placeholderName.forEach(function (elem) {
    elem.addEventListener('input', () => elem.value = elem.value.replace(/[^а-яё\s\.\,\;\:]/gi, ''));
});
calcStartButton.addEventListener('mouseenter', appData.checkMonthInputValue);
calcStartButton.addEventListener('click', appData.start);

plusButtonExpenses.addEventListener('click', appData.addExpensesBlock);
plusButtonIncome.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.changePeriodValue);