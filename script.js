
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    {   //Timer
        function countTimer(deadline) {
            let timeHours = document.querySelector('#timer-hours'),
                timeMinutes = document.querySelector('#timer-minutes'),
                timeSeconds = document.querySelector('#timer-seconds');

            function getTimeRemaining() {
            
                let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                lefthours = 24 + (Math.floor(timeRemaining / 60 / 60) - 24);

                if (lefthours < 0) {
                    deadlineCounter();
                    return;
                }
                
                let seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);
                
                    function getTime(time, ...arr) {
                        arr = arr.map( (item) => item < 10 ? '0' + item : '' + item);
                        let [seconds, minutes, hours] = [...arr];
                        return { timeRemaining, seconds, minutes, hours };
                    }

                return getTime(timeRemaining, seconds, minutes, hours);
            }   

            const updateClock = setInterval( () => {
                let timer = getTimeRemaining();
                if (timer === undefined) {
                    clearInterval(updateClock);
                    return;
                }
                timeHours.textContent = timer.hours;
                timeMinutes.textContent = timer.minutes;
                timeSeconds.textContent = timer.seconds;

                if ( timer.timeRemaining <= 1 ) {
                    clearInterval(updateClock);
                }
            }, 1000);
        }
        //Deadline
        function deadlineCounter() {
            let date = new Date();
            let deadline = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1}`;
            return deadline; 
        }

        countTimer(deadlineCounter());
    }

    {//Menu 
    const toggleMenu = () => {

        const menu = document.querySelector('menu');

        // function for close and open menu
        const handlerMenu = () => menu.classList.toggle('active-menu');
 
         //Scroll links animate function
         function scroll(block, dur) {
            const endPoint = block.offsetTop;

            let idAnimate;
            let num = 0;

            function animateScroll() {  
                idAnimate = requestAnimationFrame(animateScroll);

                // Function to increase scroll speed
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

        //All listeners for header 
        document.addEventListener('click', event => {
            let target = event.target;
            //Main block
            if ( target.closest('main') && !menu.classList.contains('active-menu') ) {
                if ( target.closest('.menu') ) {
                    // Open menu 
                    handlerMenu(); 
                } else if ( target.closest('a[href="#service-block"]') ) {
                    //Scroll button to next slide at main block
                    event.preventDefault();
                    scroll(document.getElementById('service-block'), 2);
                }
            } else if (menu.classList.contains('active-menu')) {
                if ( target.closest('menu') === null || target.classList.contains('close-btn') ) {
                    // Close menu
                    handlerMenu();
                } else if ( target.tagName === 'A' && !target.classList.contains('.close-btn') ) {
                    // Close menu and scroll to blocks of target-link
                    event.preventDefault();
                    handlerMenu();
                    const targetId = target.getAttribute('href').substring(1);
                    const block = document.getElementById(targetId);
                    scroll(block, 3);
                } 
            }
        });
    };

    toggleMenu();
    }

    {//Popup
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
             popupBtn = document.querySelectorAll('.popup-btn'),
             popupContent = popup.querySelector('.popup-content'),
             popupContentRect =  popupContent.getBoundingClientRect(),
             popupContentX = popupContentRect.x;
        
        popupBtn.forEach( elem => elem.addEventListener('click', () => {
            popup.style.display = 'block';   
            if (screen.width > 768) {
                animationPopUp();
            }
        }));

        //popup Close
        popup.addEventListener('click', event => {
            let target = event.target;

            if (target.classList.contains('popup-close')) {
                popup.style.display = 'none';
            } else {
                target = target.closest('.popup-content');
                if ( !target ) {
                    popup.style.display = 'none';
                }
            }
        });

        //Popup Animation function
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

    {//Tabs 
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');


        const toggleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++) {
                if ( index === i ) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.service-header-tab');

            if ( target ) {
                tab.forEach( (item, i) => {
                    if ( item === target ) {
                        toggleTabContent(i);
                    }
                });
            }
        });

    };

    tabs();
    }

    { //Slider

		const slider = () => {

			const slide = document.querySelectorAll('.portfolio-item'),
				slider = document.querySelector('.portfolio-content'),
				dotsUl = document.querySelector('.portfolio-dots');

			const addDots = () => {
				for (let i = 0; i < slide.length; i++) {
					const dotElement = document.createElement('li');
					dotsUl.appendChild(dotElement);
					dotElement.classList.add('dot');
					if (i === 0) dotElement.classList.add('dot-active');
				}
			};

			addDots();

			const dot = document.querySelectorAll('.dot');
			let currentSlide = 0,
				interval;

			const prevSlide = (elem, index, strClass) => {
				elem[index].classList.remove(strClass);
			};

			const nextSlide = (elem, index, strClass) => {
				elem[index].classList.add(strClass);
			};

			const autoPlaySlide = () => {

				prevSlide(slide, currentSlide, 'portfolio-item-active');
				prevSlide(dot, currentSlide, 'dot-active');
				currentSlide++;
				if (currentSlide >= slide.length) {
					currentSlide = 0;
				}
				nextSlide(slide, currentSlide, 'portfolio-item-active');
				nextSlide(dot, currentSlide, 'dot-active');
			};

			const startSlide = (time = 3000) => {
				interval = setInterval(autoPlaySlide, time);
			};

			const stopSlide = () => {
				clearInterval(interval);
			};

			slider.addEventListener('click', event => {
				event.preventDefault();

				const target = event.target;

				if (!target.matches('.portfolio-btn, .dot')) {
					return;
				}

				prevSlide(slide, currentSlide, 'portfolio-item-active');
				prevSlide(dot, currentSlide, 'dot-active');

				if (target.matches('#arrow-right')) {
					currentSlide++;
				} else if (target.matches('#arrow-left')) {
					currentSlide--;
				} else if (target.matches('.dot')) {
					dot.forEach((elem, index) => {
						if (elem === target) {
							currentSlide = index;
						}
					});
				}

				if (currentSlide >= slide.length) {
					currentSlide = 0;
				}

				if (currentSlide < 0) {
					currentSlide = slide.length - 1;
				}

				nextSlide(slide, currentSlide, 'portfolio-item-active');
				nextSlide(dot, currentSlide, 'dot-active');

			});

			slider.addEventListener('mouseover', event => {
				if (event.target.matches('.portfolio-btn') ||
                event.target.matches('.dot')) {
					stopSlide();
				}
			});

			slider.addEventListener('mouseout', event => {
				if (event.target.matches('.portfolio-btn') ||
                event.target.matches('.dot')) {
					startSlide();
				}
			});


			startSlide(1500);

		};

		slider();
	}


    {//change photo
		const commandPhoto = document.querySelectorAll('#command .command__photo');

		commandPhoto.forEach(item => {
			const photoSrc = item.getAttribute('src');
			const photoData = item.dataset.img;
			item.addEventListener('mouseenter', event => event.target.src = photoData);
			item.addEventListener('mouseleave', event => event.target.src = photoSrc);
		});
	}

    //valid
    {   const validation = () => {
            const form = document.querySelectorAll('input');
            form.forEach((element)=>{
                if(element.matches('.form-email')){
                    element.addEventListener('blur', () => {{//replace(/[а-яА-ЯёЁ]|^[ -]*|( |-)(?=\1)|[ -]*$/g, '')
                        element.value = element.value.match(/\w+@\w+\.\w{2,3}/g);
                    
                    }});
                }
                else if(element.matches('.form-phone')){
                    element.addEventListener('blur', () => {{
                        element.value = element.value.match(/\+?[78]([-()]*\d){10}/g);
                    
                    }});
                }
                else if(element.matches('.top-form') || element.matches('.form-name') || element.matches('.mess')){
                    element.addEventListener('blur', () => {{
                        element.value = element.value.replace(/[^а-яА-ЯёЁ\s\-]|^[ -]*|( |-)(?=\1)|[ -]*$/g, '');
                        element.value = element.value.slice(0,1).toUpperCase() + element.value.slice(1, element.value.length);
                    
                    }});
                }
                else if(element.matches('.calc-item') && !element.matches('.calc-type')){
                    element.addEventListener('blur', () => {{
                        element.value = element.value.replace(/\D/g, '');
                    
                    }});
                }
                
            });
    };
        validation();
    }
    
});