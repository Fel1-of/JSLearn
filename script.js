'use strict';
  
window.addEventListener('DOMContentLoaded', () =>{
  
    const timerHours = document.querySelector('#timer-hours'),
          timerMinutes = document.querySelector('#timer-minutes'),
          timerSeconds = document.querySelector('#timer-seconds');
  
    const countTimer = (deadline) => {
  
      const getTimeRemaining = () => {
        const dateStop = new Date(deadline).getTime(),
              dateNow = new Date().getTime(),
              timeRemaining = dateStop > dateNow ? (dateStop - dateNow) / 1000 : 0;
  
        return {
          "timeRemaining": timeRemaining,
          'hours': Math.round(timeRemaining / 3600).toString().padStart(2, '0'),
          'minutes': Math.round((timeRemaining / 60) % 60).toString().padStart(2, '0'),
          'seconds': Math.round(timeRemaining % 60).toString().padStart(2, '0')
        };
      };
  
      const updateClock = () => {      
        const result = getTimeRemaining();
  
        timerHours.textContent = result.hours;
        timerMinutes.textContent = result.minutes;
        timerSeconds.textContent = result.seconds;
      };
  
      setInterval(updateClock, 1000);
  
      };
  
    countTimer('10 July 2021');

  });

  const toggleMenu = () => {

    const btnMenu = document.querySelector('.menu'),
        menu = document.querySelector('menu'),
        closeBtn = document.querySelector('.close-btn'),
        menuItems = menu.querySelectorAll('ul>li'),
        menuLinks = menu.querySelectorAll('li>a');

    const handlerMenu = () => menu.classList.toggle('active-menu');

    btnMenu.addEventListener('click', handlerMenu); 
    closeBtn.addEventListener('click', handlerMenu);
    menuItems.forEach( elem => elem.addEventListener('click', handlerMenu));
    
    //Scroll animate 
    function scroll(block, dur) {
        const endPoint = block.offsetTop;

        let idAnimate;
        let num = 0;

        function animateScroll() {  
            idAnimate = requestAnimationFrame(animateScroll);
            
            // scroll speed
            function duration(count) {
                if (num > (endPoint * 0.95) && count !== 1) {
                    count = count / 2;
                } else {
                    if (endPoint > 4000) {
                        count += 3;
                    } else  if (endPoint > 3000) {
                        count += 2;
                    }
                }
                num = num + (count * 20);  
            }

            duration(dur);
            document.documentElement.scrollTop = num;

            if (num > endPoint) {
                document.documentElement.scrollTop = endPoint;
                cancelAnimationFrame(idAnimate);
            }
        }

        idAnimate = requestAnimationFrame(animateScroll);
    }

    menuLinks.forEach( item => {
        const itemId = item.getAttribute('href').substring(1);
        item.addEventListener('click', e => {
            e.preventDefault();
            const block = document.getElementById(itemId);
            scroll(block, 3);
        });
    });

    //Button to next slide at main block
    let mainLinkImg = document.querySelector('main>a[href="#service-block"]');
    mainLinkImg.addEventListener('click', (e) => {
        e.preventDefault();
        scroll(document.getElementById('service-block'), 1);
    });

};

toggleMenu();

let bool; 
if(screen.width>768){
    bool = true;
} else{
    bool = false;
}
window.addEventListener(`resize`, () => {
    if(screen.width>768){
        bool = true;
    } else{
        bool = false;
    }
  });
{//Popup
const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
         popupBtn = document.querySelectorAll('.popup-btn'),
         popupClose = document.querySelector('.popup-close'),
         popupContent = popup.querySelector('.popup-content'),
         popupContentRect =  popupContent.getBoundingClientRect(),
         popupContentX = popupContentRect.x;
    
    popupBtn.forEach( elem => elem.addEventListener('click', () => {
        popup.style.display = 'block';   
        if (bool) {
            animationPopUp();
        }
    }));

    popupClose.addEventListener('click', () => popup.style.display = 'none');

    //Popup Animation
    function animationPopUp() {
        let animationId;
        let count = -1200;
        popupContent.style.transform = `translate(${count}px)`; 
        
            const animationFunc = () => {
                animationId = requestAnimationFrame(animationFunc);
                count += 50;
                    if ( count >= popupContentX - 50 ) {
                        cancelAnimationFrame(animationId);
                    } 
                    
                popupContent.style.transform = `translate(${count}px)`;
            };  
        animationFunc();
    }   
};

togglePopUp();
}