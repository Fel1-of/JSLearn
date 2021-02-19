'use strict';

const isNumber = function (num) {
    return !isNaN(Number(num)) && !isNaN(parseFloat(num)) && isFinite(parseFloat(num));
};

const calcStartButton = document.getElementById('start'),
    calcClearButton = document.getElementById('cancel'),

    plusButtonIncome = document.getElementsByTagName('button')[0],
    plusButtonExpenses= document.getElementsByTagName('button')[1],

    
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

    depositCheck = document.querySelector('#deposit-check'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    depositBank = document.querySelector('.deposit-bank'),

    targetElement = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    salaryElement = document.querySelector('.salary-amount'),
    placeholderSum = document.querySelectorAll('[placeholder="Сумма"]'),
    placeholderName = document.querySelectorAll('[placeholder="Наименование"]'),
    periodAmount = document.querySelector('.period-amount');

    

let incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items');
    

calcStartButton.disabled = true;
class CookieManager {
    getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
  
    setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      var expires = "expires="+ d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
  
    deleteCookie(name) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
  
  }


class appData{
    constructor() {
        this.budget = 0;
        this.addIncome = [];
        this.addExpenses = [];
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.expenses = {};
        this.expensesMonth = 0;
        this.period = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.cookieManager = new CookieManager();
        this.storageNames = new Set (['budgetMonth', 'budgetDay', 'expenses', 'addIncome', 'addExpenses', 'incomeMonth', 'targetMonth', 'isLoad']);
    }
    
    
    start() {
        if (salaryElement.value == '') {
            return;
        }
    
        this.budget = +salaryElement.value;
        this.getExpensesMonth();
        this.getExpInc();

        this.getAddExpInc();
        
        this.getInfoDeposit();
        
        this.getBudget();
        this.showResult();
        this.disableFields();
        this.saveData();
        this.lockInputs();
    }
    lockInputs() {
        calcStartButton.style.display = 'none';
        calcClearButton.style.display = 'block';
        let inputs = document.querySelectorAll('input[type=text]');
        inputs.forEach((item) => {
          item.disabled = true;
        });
      }
    reset(){
        this.clearData();
        salaryElement.value = '';
        additionalExpensesValue.value = '';
        targetElement.value = '';
        periodSelect.value = '1';
        periodAmount.textContent = '1';

        calcStartButton.style.display="block";
        calcClearButton.style.display="none";

        plusButtonExpenses.style.display = "block";
        plusButtonIncome.style.display = "block";

        incomeItems.forEach((item, index) => {
            if (index !== 0) item.remove();
        });

        expensesItems.forEach((item, index) => {
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
        depositBank.value = '0';
        depositPercent.style.display = 'none';
        depositCheck.checked = false;
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
    }

    getInfoDeposit() {
        if (this.deposit) {
            this.percentDeposit = +depositPercent.value;
            this.moneyDeposit = +depositAmount.value;
        }
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
        const monthDeposit = this.moneyDeposit * this.percentDeposit / 100;
        this.budgetMonth = this.budget + this.incomeMonth - +this.expensesMonth + monthDeposit;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
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
    validation() {
        const allInputs = document.querySelectorAll('.data input[type= "text"]');
        allInputs.forEach((item) => {
            if (item.placeholder === 'Сумма') {
                item.addEventListener('input', () => {
                    item.value = item.value.replace(/\D/, '');
                });
            } else if (item.placeholder === 'Наименование') {
                item.addEventListener('input', () => {
                    item.value = item.value.replace(/[^?!,.а-яА-ЯёЁ\s\-]+$/, '');
                });
            } else if (item.placeholder === 'Процент') {
                item.addEventListener('input', () => {
                    item.value = item.value.replace(/\D/, '');
                    if (item.value >= 100) {
                        item.value = 100;
                    }
                });
            }
        });
    }

    changePercent() {
        const valueIndex = this.value;
        if (valueIndex === 'other') {
            depositPercent.style.display = 'inline-block';
            depositPercent.disabled = false;
            depositPercent.value = '';
        } else {
            depositPercent.style.display = 'none';
            depositPercent.value = +valueIndex * 100;
        }
    }

    depositHandler() {
        if (depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositBank.value = '0';
            depositAmount.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);
        }
    }

    checkMemory() {
        let loaded = true;
    
        for (let item of this.storageNames) {
          const cookieValue = this.cookieManager.getCookie(item);
          if (cookieValue === undefined) {
            loaded = false;
            break;
          }
    
          if (localStorage[item] !== undefined) {
            if (localStorage[item] !== cookieValue) {
              loaded = false;
              break;
            }
    
            if (item === 'addExpenses' || item === 'addIncome') {
              for (let memoryItem of JSON.parse(localStorage[item])) {
                this[item].push(memoryItem);
              }
            } else if (item === 'expenses') {
              this[item] = JSON.parse(localStorage[item]);
            } else {
                this[item] = +localStorage[item];
            }
          } else {
            loaded = false;
            break;
          }
        }
    
        if (loaded) {
          this.lockInputs();
          this.showResult();
        } else {
          this.clearData();
          this.clearCookies();
        }
      }
    
      clearData() {
        this.income = {};
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.incomeMonth = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.targetMonth = 0;
        this.clearLocalStorage();
      }
    
      clearLocalStorage() {
        for (let item of this.storageNames) {
          if (localStorage[item] !== undefined) {
            localStorage.removeItem(item);
          }
        }
      }
    
      clearCookies() {
        for (let item of this.storageNames) {
          this.cookieManager.deleteCookie(item);
        }
      }
    
      saveData() {
        for (let item of this.storageNames) {
          let value;
    
          if (item === 'addExpenses' || item === 'addIncome' || item === 'expenses') {
            value = JSON.stringify(this[item]);
          } else if (item === 'isLoad') {
            value = true;
          } else {
            value = this[item];
          }
    
          localStorage[item] = value;
    
          this.cookieManager.setCookie(item, value, 1000);
        }
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
            depositCheck.disabled = true;
            depositBank.disabled = true;
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
            depositCheck.disabled = false;
            depositBank.disabled = false;
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
        if(depositCheck){
            depositCheck.addEventListener('change', this.depositHandler.bind(this));
        }
        
        
        calcStartButton.disabled = true;
        salaryElement.addEventListener('input', function () {
            if (salaryElement.value !== '') {
                calcStartButton.disabled = false;
            }
        });
    }
    
    
}

const appdata = new appData();
    
appdata.initApp();
appdata.checkMemory();