'use strict';

const isNumber = function (num) {
    return !isNaN(Number(num)) && !isNaN(parseFloat(num)) && isFinite(parseFloat(num));
};

const calcStartButton = document.getElementById('start'),
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

    incomeTitleElement = document.querySelector('.income-title'),

    additionalIncomeElement = document.querySelectorAll('.additional_income-item'),

    expensesTitleElement = document.querySelector('.expenses-title'),
    additionalExpensesElement = document.querySelector('.additional_expenses-item'),

    depositCheckElement = document.querySelector('.deposit-check'),
    depositAmountElement = document.querySelector('.deposit-amount'),
    depositPercentElement = document.querySelector('.deposit-percent'),

    targetElement = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    salaryElement = document.querySelector('.salary-amount'),
    placeholderSum = document.querySelectorAll('[placeholder="Сумма"]'),
    placeholderName = document.querySelectorAll('[placeholder="Наименование"]'),
    periodAmount = document.querySelector('.period-amount');

    

let incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items');
    

calcStartButton.disabled = true;

class appData{
    constructor(){
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
    }
    
    
    start() {
        if (salaryElement.value == '') {
            return;
        }
    
        this.budget = +salaryElement.value;
        this.getExpensesMonth();
        this.getExpInc();

        this.getAddExpInc();
        this.getBudget();

        this.showResult();
        
        this.disableFields();
    }

    reset(){
        salaryElement.value = '';
        additionalExpensesValue.value = '';
        targetElement.value = '';
        periodSelect.value = '1';
        periodAmount.textContent = '1';

        calcStartButton.style.display="block";
        calcClearButton.style.display="none";

        plusButtonExpenses.style.display = "block";
        plusButtonIncome.style.display = "block";

        const income = document.querySelectorAll('.income-items');
        income.forEach((item, index) => {
            if (index !== 0) item.remove();
        });

        const expenses = document.querySelectorAll('.expenses-items');
        expenses.forEach((item, index) => {
            if (index !== 0) item.remove();
        });


        const main = document.querySelectorAll('.data input');
        const result = document.querySelectorAll('.result input');

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
    }

    disableFields(){
        calcStartButton.style.display="none";
        calcClearButton.style.display="block";
        const main = document.querySelectorAll('.data input');
        main.forEach((item) => {
            if (item.type == "range") {
                item.disabled = false;
                return;
            }
            item.style.backgroundColor = "#cdd0da";
            item.style.opacity = 0.9;
            item.disabled = true;
        });
    }

    showResult(){
        const _this = this;
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
        
    }

    addIncExpBlock(button, items) {
        const addItem = (item) => {
            const cloneItem = item[0].cloneNode(true);
            const start = item[0].className.split('-')[0];
            cloneItem.querySelector(`.${start}-title`).value = null;
            cloneItem.querySelector(`.${start}-amount`).value = null;
            item[item.length - 1].after(cloneItem);
            item = document.querySelectorAll(`.${start}-items`);
            if (start === 'income') {
                incomeItems = document.querySelectorAll(`.${start}-items`);
            } else if (start === 'expenses') {
                expensesItems = document.querySelectorAll(`.${start}-items`);
            }
            if (item.length === 3) {
                button.style.display = 'none';
            }
            this.validation();
        };
        addItem(items);
    }



    getAddExpInc(){
        const addExpenses = additionalExpensesElement.value.split(',');

        const getadd = (item, val, type) => {
            item.forEach((i) => {
                if (type === 'expenses') {
                    i = i.trim();
                } else if (type === 'income') {
                    i = i.value.trim();
                }
                if (i !== '') {
                    val.push(i);
                }
            });
        };
        getadd(addExpenses, this.addExpenses, 'expenses');
        getadd(additionalIncomeElement, this.addIncome, 'income');
    }
    

    getExpInc(){
        incomeItems = document.querySelectorAll('.income-items');
        expensesItems = document.querySelectorAll('.expenses-items');
        const count = item =>{
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if (itemTitle !== '' && itemAmount !== '') {
                this[startStr][itemTitle] = +itemAmount;
            }
        };

        incomeItems.forEach(count);
        expensesItems.forEach(count);

        for(const key in this.income){
            this.incomeMonth += this.income[key]; 
        }
        for(const key in this.expenses){
            this.expensesMonth += this.expenses[key]; 
        }
        
    }

    getExpensesMonth() {
        let sum = 0;
        
        for (const key in this.expenses) {
            sum += this.expenses[key];
        }
    
        this.expensesMonth = sum;
    }

    getBudget(){
        this.budgetMonth = this.budget + +this.incomeMonth - this.expensesMonth;
        this.budgetDay = +this.budgetMonth / 30;
    }

    getTargetMonth(){
        return Math.ceil(targetElement.value / this.budgetMonth);
    }

    getStatusIncome() {
        if (this.budgetDay >= 1200) {
        console.log("У вас высокий уровень дохода");
        } else if (this.budgetDay < 1200 && this.budgetDay >= 600){
            console.log("У вас средний уровень дохода");
        } else if (this.budgetDay < 600 && this.budgetDay >= 0) {
            console.log("К сожалению у вас уровень дохода ниже среднего");
        }
    }

    getInfoDeposit(){
        if (this.deposit) {
            do {
                this.percentDeposit = prompt("Какой у вас годовой процент?");
            } while (!isNumber(this.percentDeposit));

            do {
                this.moneyDeposit = prompt("Какая сумма заложена?");
            } while (!isNumber(this.moneyDeposit));
        }
    }

    changePeriodValue() {
        periodAmount.textContent = periodSelect.value;
    }

    checkMonthInputValue() {
        if (salaryElement.value === '') {
            calcStartButton.disabled = true;
        } else {
            calcStartButton.disabled = false;
        }
    }

    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    }
    validation(){
        const placeholderSum = document.querySelectorAll('[placeholder="Сумма"]');
        const placeholderName = document.querySelectorAll('[placeholder="Наименование"]');

        placeholderSum.forEach(function (elem) {
            elem.addEventListener('input', () => elem.value = elem.value.replace(/[^\d]/g, ''));
        });

        placeholderName.forEach(function (elem) {
            elem.addEventListener('input', () => elem.value = elem.value.replace(/[^а-яё\s\.\,\;\:]/gi, ''));
        });
    }
    initApp() {
        const _this = this;
        this.validation();
        calcStartButton.disabled = true;
        const startFunction = this.start.bind(this);
        const allInputs = document.querySelectorAll('.data input[type= "text"]');
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
            _this.addIncExpBlock(plusButtonIncome, incomeItems);
        });
        plusButtonExpenses.addEventListener('click', function () {
            _this.addIncExpBlock(plusButtonExpenses, expensesItems);
        });
        periodSelect.addEventListener('input', this.changePeriodValue);
    
        calcStartButton.disabled = true;
        salaryElement.addEventListener('input', function () {
            if (salaryElement.value !== '') {
                calcStartButton.disabled = false;
            }
        });
    }
    
    
};

const appdata = new appData();
    
appdata.initApp();
