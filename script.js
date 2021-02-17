'use strict';

const isNumber = function (num) {
    return !isNaN(Number(num)) && !isNaN(parseFloat(num)) && isFinite(parseFloat(num));
};

let calcStartButton = document.getElementById('start'),
    calcClearButton = document.getElementById('cancel'),

    plusButtonIncome = document.getElementsByTagName('button')[0],
    plusButtonExpenses= document.getElementsByTagName('button')[1],

    depositCheckBox = document.querySelector('#deposit-check'),
    additionalIncome = document.querySelectorAll('.additional_income-item'),

    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],

    salaryElement = document.querySelector('.salary-amount'),

    incomeTitleElement = document.querySelector('.income-title'),
    incomeItems = document.querySelectorAll('.income-items'),

    additionalIncomeElement = document.querySelectorAll('.additional_income-item'),

    expensesTitleElement = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesElement = document.querySelector('.additional_expenses-item'),

    depositCheckElement = document.querySelector('.deposit-check'),
    depositAmountElement = document.querySelector('.deposit-amount'),
    depositPercentElement = document.querySelector('.deposit-percent'),

    targetElement = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),

    placeholderSum = document.querySelectorAll('[placeholder="Сумма"]'),
    placeholderName = document.querySelectorAll('[placeholder="Наименование"]');
calcStartButton.disabled = true;

const appData = function(){
    this.budget= 0;
    this.income= {};
    this.addIncome= [];
    this.incomeMonth= 0;
    this.expenses= {};
    this.addExpenses= [];
    this.deposit= false;
    this.percentDeposit= 0;
    this.moneyDeposit= 0;
    this.budgetDay= 0;
    this.budgetMonth= 0;
    this.expensesMonth=0;
    
    appData.prototype.start = function() {
        if (salaryElement.value == '') {
            return;
        }
    
        this.budget = +salaryElement.value;

        this.getExpenses();
        this.getExpensesMonth();
        this.getIncome();

        this.getAddExpences();
        this.getAddIncome();
        this.getBudget();

        this.showResult();
        
        this.disableFields();
    },

    appData.prototype.reset = function(){
        salaryElement.value = '';
        additionalExpensesValue.value = '';
        targetElement.value = '';
        periodSelect.value = '1';
        periodAmount.textContent = '1';

        calcStartButton.style.display="block";
        calcClearButton.style.display="none";

        plusButtonExpenses.style.display = "block";
        plusButtonIncome.style.display = "block";

        let income = document.querySelectorAll('.income-items');
        income.forEach((item, index) => {
            if (index !== 0) item.remove();
        });

        let expenses = document.querySelectorAll('.expenses-items');
        expenses.forEach((item, index) => {
            if (index !== 0) item.remove();
        });


        let main = document.querySelectorAll('.data input');
        let result = document.querySelectorAll('.result input');

        main.forEach((item) => {
            if (item.type == "range") {
                item.disabled = false;
                return;
            }
            item.style.backgroundColor = "white";
            item.style.opacity = 1;
            item.disabled = false;
            item.value = '';
        });

        result.forEach((item) => {
            if (item.placeholder == '0') item.value = '0';

            if (item.placeholder == "Наименования") item.value = "Наименования";

            if (item.placeholder == "Срок") item.value = "Срок";
        });

        this.budget = 0;
        this.income = {};
        this.addIncome = [];
        this.incomeMonth = 0;
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        depositCheckBox.checked = false;
    },

    appData.prototype.disableFields = function(){
        calcStartButton.style.display="none";
        calcClearButton.style.display="block";
        let main = document.querySelectorAll('.data input');
        main.forEach((item) => {
            if (item.type == "range") {
                item.disabled = false;
                return;
            }
            item.style.backgroundColor = "#cdd0da";
            item.style.opacity = 0.9;
            item.disabled = true;
        });
    },

    appData.prototype.showResult = function(){
        let _this = this;
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = Math.ceil(this.budgetDay);
        expensesMonthValue.value = this.expensesMonth;
        targetMonthValue.value = this.getTargetMonth();
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        incomePeriodValue.value = this.calcPeriod();

        periodSelect.addEventListener('input', function () {
            incomePeriodValue.value = _this.calcPeriod();
        });
        
    },

    appData.prototype.addExpensesBlock = function () {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems = document.querySelectorAll('.expenses-items');

        cloneExpensesItem.children[0].value = '';
        cloneExpensesItem.children[1].value = '';

        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plusButtonExpenses);

        if (expensesItems.length === 2) {
            plusButtonExpenses.style.display = 'none';
        }

        this.validation();

    },

    appData.prototype.addIncomeBlock = function () {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems = document.querySelectorAll('.income-items');

        cloneIncomeItem.children[0].value = '';
        cloneIncomeItem.children[1].value = '';
        
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, plusButtonIncome);

        if (incomeItems.length === 2) {
            plusButtonIncome.style.display = 'none';
        }
        this.validation();
        
    },

    appData.prototype.getAddExpences= function () {
        let addExpenses = additionalExpensesElement.value.split(',');
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        });
    },

    appData.prototype.getAddIncome= function () {
        additionalIncomeElement.forEach((item) => {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        })
    },

    appData.prototype.getExpenses = function() {
        expensesItems = document.querySelectorAll('.expenses-items');
        expensesItems.forEach((item) => {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;

            if (itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = +cashExpenses;
            }
        });
    },

    appData.prototype.getIncome = function () {
        let IncomeItems = document.querySelectorAll('.income-items');
        IncomeItems.forEach((item) => {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;

            if (itemIncome !== '' && cashIncome !== '') {
                this.income[itemIncome] = +cashIncome;
                this.budget+=+cashIncome;
            }
        });
    },

    appData.prototype.getExpensesMonth = function() {
        let sum = 0;
        
        for (let key in this.expenses) {
            sum += this.expenses[key];
        }
    
        this.expensesMonth = sum;
    },

    appData.prototype.getBudget = function(){
        this.budgetMonth = this.budget + +this.incomeMonth - this.expensesMonth;
        this.budgetDay = +this.budgetMonth / 30;
    },

    appData.prototype.getTargetMonth= function () {
        return Math.ceil(targetElement.value / this.budgetMonth);
    },

    appData.prototype.getStatusIncome= function () {
        if (this.budgetDay >= 1200) {
        console.log("У вас высокий уровень дохода");
        } else if (this.budgetDay < 1200 && this.budgetDay >= 600){
            console.log("У вас средний уровень дохода");
        } else if (this.budgetDay < 600 && this.budgetDay >= 0) {
            console.log("К сожалению у вас уровень дохода ниже среднего");
        }
    },

    appData.prototype.getInfoDeposit = function() {
        if (this.deposit) {
            do {
                this.percentDeposit = prompt("Какой у вас годовой процент?");
            } while (!isNumber(this.percentDeposit));

            do {
                this.moneyDeposit = prompt("Какая сумма заложена?");
            } while (!isNumber(this.moneyDeposit));
        }
    },

    appData.prototype.changePeriodValue = function () {
        periodAmount.textContent = periodSelect.value;
    },

    appData.prototype.checkMonthInputValue =  function () {
        if (salaryElement.value === '') {
            calcStartButton.disabled = true;
        } else {
            calcStartButton.disabled = false;
        }
    },

    appData.prototype.calcPeriod = function () {
        return this.budgetMonth * periodSelect.value;
    },
    appData.prototype.validation =  function(){
        placeholderSum = document.querySelectorAll('[placeholder="Сумма"]');
        placeholderName = document.querySelectorAll('[placeholder="Наименование"]');

        placeholderSum.forEach(function (elem) {
            elem.addEventListener('input', () => elem.value = elem.value.replace(/[^\d]/g, ''));
        });

        placeholderName.forEach(function (elem) {
            elem.addEventListener('input', () => elem.value = elem.value.replace(/[^а-яё\s\.\,\;\:]/gi, ''));
        });
    },
    appData.prototype.initApp = function () {
        const _this = this;
        this.validation();
        calcStartButton.disabled = true;
        const startFunction = this.start.bind(this);
        let allInputs = document.querySelectorAll('.data input[type= "text"]');
        calcStartButton.addEventListener('click', function () {
            startFunction();
            calcStartButton.style.display = 'none';
            calcClearButton.style.display = 'block';
            plusButtonIncome.disabled = true;
            plusButtonExpenses.disabled = true;
            allInputs.forEach(item => {
                item.disabled = true;
            });
        });
        calcClearButton.addEventListener('click', () => {
            this.reset();
            calcStartButton.style.display = 'block';
            calcClearButton.style.display = 'none';
            plusButtonIncome.disabled = false;
            plusButtonExpenses.disabled = false;
            allInputs.forEach(item => {
                item.disabled = false;
            });
        });
        plusButtonIncome.addEventListener('click', function () {
            _this.addIncomeBlock();
            _this.validation();
        });
        plusButtonExpenses.addEventListener('click', function () {
            _this.addExpensesBlock();
            _this.validation();
        });
        periodSelect.addEventListener('input', this.changePeriodValue);
    
        calcStartButton.disabled = true;
        salaryElement.addEventListener('input', function () {
            if (salaryElement.value !== '') {
                calcStartButton.disabled = false;
            }
        });
    };
    
    
};

const appdata = new appData();
console.log(appdata);
    
appdata.initApp();
