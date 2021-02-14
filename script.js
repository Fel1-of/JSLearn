'use strict';
let userName = document.querySelector('.user__name'),
    regButton = document.querySelector('.reg-btn'),
    authButton = document.querySelector('.auth-btn'),
    userList = document.querySelector('.user__list');

let yearMonth = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа",
    "Сентября", "Октября", "Ноября", "Декабря"
];
let userArray = [];

const render = function () {
    userList.textContent = '';
    userArray = [];

    let storageUsers = JSON.parse(localStorage.getItem('Users'));

    if (!storageUsers) {
        return;
    }

    for (let i = 0; i < storageUsers.length; i++) {
        let item = storageUsers[i];
        userArray[i] = item;

        let li = document.createElement('li');
        li.classList.add('list__item');
        li.innerHTML = `Имя: <span>${item.name}, </span>
        Фамилия: <span>${item.surname}, </span>
        Зарегистрирован: <span>${item.regDate}</span> 
        <button class="delete">Удалить пользователя</button>`;
        userList.append(li);

        const removeBtn = li.querySelector('.delete');
        removeBtn.addEventListener('click', () => {
            item.active = false;
            storageUsers.splice(i, 1);
            localStorage.setItem('Users', JSON.stringify(storageUsers));
            render();
        });
    }
};

regButton.addEventListener("click", () => {
    let userName,
        login,
        password,
        user;

    do {
        userName = prompt('Введите Ваше имя и фамилию:').split(' ');
        if (userName.length !== 2) {
            alert('Ошибка! Введите корректное имя!');
        }
    } while (userName.length !== 2);

    do {
        login = prompt('Введите Ваш логин:');
        if (login.includes(' ')) {
            alert('В логине не должно быть проблеов');
        };
    } while (login.includes(' '));

    do {
        password = prompt('Введите Ваш пароль:');
        if (password.includes(' ')) {
            alert('В пароле не должно быть проблеов');
        };
    } while (password.includes(' '));

    let userRegDate = new Date();
    let parseTime = userRegDate.toLocaleString('ru').split(', ');
    let date = parseTime[0].split('.');
    let time = parseTime[1];
    let fullDate = (date[1] + ' ' + yearMonth[userRegDate.getMonth()] + ' ' + date[2] + 'г., ' + time);


    user = {
        name: userName[0],
        surname: userName[1],
        login: login,
        password: password,
        regDate: fullDate,
        active: true
    }
    userArray.push(user);
    console.log('User: ', user);
    localStorage.setItem('Users', JSON.stringify(userArray));

    render();
})

authButton.addEventListener('click', () => {
    let userLog = prompt('Введите ваш Логин:');
    let userPassw = prompt('Введите ваш пароль');
    let userFlag = false;

    let storageUsers = JSON.parse(localStorage.getItem('Users'));

    if (!storageUsers || storageUsers.length === 0) {
        alert('Пользователь не найден!');
        return;
    }

    storageUsers.forEach((item) => {

        if (item.login == userLog && item.password == userPassw) {
            userName.textContent = item.name;
            userFlag = true;
            return;
        }
        
    });
    if (userFlag!==true) {
        alert('Пользователь не найден!');
    }
});

render();