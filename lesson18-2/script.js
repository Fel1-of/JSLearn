
'use strict';

window.addEventListener('DOMContentLoaded', () => {

    function timer() {

        let period = document.querySelector('#helloMessage'),
            dayOfTheWeek = document.querySelector('#dayOfTheWeek'),
            thisDate = document.querySelector('#thisDate'),
            abbreviation = document.querySelector('#abbreviation'),
            pointDate = document.querySelector('#time2NY');

        let nowDate = new Date();

        function changePeriod(myDate) {

            if (myDate.getHours() >= 6 && myDate.getHours() < 12) {
                return "Доброе утро";
            } else if (myDate.getHours() >= 12 && myDate.getHours() < 18) {
                return "Добрый день";
            } else if (myDate.getHours() >= 18 && myDate.getHours() < 23) {
                return "Добрый вечер";
            } else {
                return "Доброй ночи";
            }
        }

        function changeDay(myDate) {

            const weekDays = [
                'Воскресенье',
                'Понедельник',
                'Вторник',
                'Среда',
                'Четверг',
                'Пятница',
                'Суббота'
            ];

            return weekDays[myDate.getDay()];
        }

        function getCurrentTime(myDate) {


            let currentTime = ('0' + myDate.getHours()).slice(-2) + ":" + ('0' + myDate.getMinutes()).slice(-2) + ":" + ('0' + myDate.getSeconds()).slice(-2);
            return currentTime;
        }

        function getAbbreviation(myDate) {


            if (myDate.getHours() >= 0 && myDate.getHours() <= 11) {
                return 'AM';
            } else {
                return 'PM';
            }
        }


        function getTime(myDate) {

            let dateNewYear = new Date('01-01-2022').getTime(),
 
                countDay = Math.floor(((dateNewYear - myDate.getTime()) / 1000) / 60 / 60 / 24);
            return countDay;
        }


        period.textContent = changePeriod(nowDate);
        dayOfTheWeek.textContent = changeDay(nowDate);
        thisDate.textContent = getCurrentTime(nowDate);
        abbreviation.textContent = getAbbreviation(nowDate);
        pointDate.textContent = getTime(nowDate);

    }

    timer(); 

    setInterval(timer, 1000); 

});