// Для слайдера

(function() {
    const slider = document.querySelector('.slider');
    const wrapper = slider.querySelector('.slider_wrapper');
    const innerWrapper = wrapper.querySelector('.slider_inner-wrapper');
    const slides = [...document.querySelectorAll('.slider_slide')];
    const slidesCount = slides.length;
    const buttonBack = document.querySelector('.slider__button_back-js');
    const buttonNext = document.querySelector('.slider__button_next-js');
    const pagination = document.querySelector('.slider__pagination_js');
    const ANIMATION_TIME = 500;

    let activeSlideIndex = 0;
    let siledWidth = wrapper.offsetWidth;
    let timer = null;
    let dots = [];
    let checkerMouseDown = false;
    let clientX = 0;
    let percentDiff = 0.2;
    let lastClientX = 0;
    let isTouched = false;

    initWidth();
    createDots();
    setActiveSlide(0, false);

    wrapper.addEventListener('touchstart', (e) => {
        isTouched = true;
        const touch = e.touches[0];
        clientX = touch.clientX;
        lastClientX = touch.clientX;
    })

    wrapper.addEventListener('touchmove',(e) => {
        if(!isTouched) return;
        const touch = e.touches[0];
        lastClientX = touch.clientX;
        setActiveSlide(activeSlideIndex, false, clientX - lastClientX);
    })

    wrapper.addEventListener('touchend', (e) => {
        if(!isTouched) return;
        isTouched = false;
        if ( clientX - lastClientX > percentDiff * siledWidth) {
            setActiveSlide(activeSlideIndex + 1);
        } else if (lastClientX - clientX > percentDiff * siledWidth) {
            setActiveSlide(activeSlideIndex - 1);
        } else {
            setActiveSlide(activeSlideIndex);
        }
    })

    buttonNext.addEventListener('click', () => {
        setActiveSlide(activeSlideIndex + 1);
    })

    buttonBack.addEventListener('click', () => {
        setActiveSlide(activeSlideIndex - 1);
    })

    window.addEventListener('resize', () => {
        initWidth();
        setActiveSlide(activeSlideIndex, false);
    })

    wrapper.addEventListener('mousedown', (e) => {
        checkerMouseDown = true;
        clientX = e.clientX;
    });

    wrapper.addEventListener('mouseup', endMouseEvent);
    wrapper.addEventListener('mouseout', endMouseEvent);

    function setActiveSlide(index, withAnimation = true, diff = 0) {
        if (index < 0 || index >= slidesCount) return;

        buttonBack.removeAttribute('disabled');
        buttonNext.removeAttribute('disabled');

        innerWrapper.style.transform = `translateX(${index * siledWidth * (-1) + diff}px)`;

        if(withAnimation) {
            innerWrapper.style.transition = `transform ${ANIMATION_TIME}ms`;
            timer = setTimeout(() => {
                innerWrapper.style.transition ='';
            }, ANIMATION_TIME);
        }

        if (index === 0) {
            buttonBack.setAttribute('disabled', '');
        }

        if (index === slidesCount - 1) {
            buttonNext.setAttribute('disabled', '');
        }

        dots[activeSlideIndex].classList.remove('slider__dot_active');
        dots[index].classList.add('slider__dot_active');
        activeSlideIndex = index;
    }

    function initWidth() {
         siledWidth = wrapper.offsetWidth;

         slides.forEach(slide => {
            slide.style.width = `${siledWidth}px`;
        });
    }

    function createDots() {
        for (let i = 0; i < slidesCount; i++) {
            const dot = createDot(i);
            dots.push(dot);
            pagination.insertAdjacentElement('beforeend', dot);
        }
    }

    function createDot(index) {
        const dot = document.createElement('button');
        dot.classList.add('slider__dot');

        if(index === activeSlideIndex) {
            dot.classList.add('slider__dot_active');
        }

        dot.addEventListener('click', () => {
            setActiveSlide(index);
        })

        return dot;
    }

    function endMouseEvent(e) {
     if(!checkerMouseDown) {
        return;
     }

     checkerMouseDown = false;
     if(clientX - e.clientX > percentDiff * siledWidth) {
       setActiveSlide(activeSlideIndex + 1);
     } else if ( e.clientX - clientX > percentDiff * siledWidth ) {
        setActiveSlide(activeSlideIndex - 1);
     } 
    }
})();

// Открытие и закрытие модалки Sign in

const signPopup = document.querySelector('.popup__sign-in');
const button = document.querySelector('.link-js');
const closeSign = document.querySelector('.popup-close');

button.addEventListener('click', () => {
    signPopup.classList.add('open__sign');
})

closeSign.addEventListener('click', () => {
    signPopup.classList.remove('open__sign');
})

window.addEventListener('keydown', function(event) {
    if (event.code === "Escape" && signPopup.classList.contains('open__sign')) {
        signPopup.classList.remove('open__sign');
    }
})

// Открытие и закрытие модалки Register

const regPopup = document.querySelector('.popup__register');
const regButton = document.querySelector('.register__js');
const regClose = document.querySelector('.popup-register__js');

regButton.addEventListener('click', () => {
    regPopup.classList.add('open__register');
})

regClose.addEventListener('click', () => {
    regPopup.classList.remove('open__register');
})

window.addEventListener('keydown', function(event) {
    if (event.code === "Escape" &&  regPopup.classList.contains('open__register')) {
        regPopup.classList.remove('open__register');
    }
})

// Открытие и закрытие модалки Send message

const popup = document.querySelector('.popup');
const btn = document.querySelector('.btn__js');
const closePopup = document.querySelector('.popup-close__js');

btn.addEventListener('click', () => {
    popup.classList.add('open');
})

closePopup.addEventListener('click', () => {
    popup.classList.remove('open');
})

window.addEventListener('keydown', function(event) {
    if(event.code === "Escape" && popup.classList.contains('open')) {
        popup.classList.remove('open');
    }
})

// // fixed кнопка

// // контекстное меню это на что мы нажимаем правой кнопкой мыши

// // получение ссылки на контекстное меню
// const contextMenu = document.querySelector('.contextmenu_js');

// // Вешаем слушатель на событие которое у нас связано с контекстным меню.
// window.addEventListener('contextmenu', (e) => {
//     e.preventDefault(); //Ломаем стандартное поведение контекстного меню.

//     //Толкаем элеменет от границ экрана в соответствии с позицией курсора.
//     contextMenu.style.top = `${e.clientY}px`;
//     contextMenu.style.left = `${e.clientX}px`;

//     contextMenu.classList.remove('contextmenu_hidden');

//     window.addEventListener('scroll', scrollHandler);
//     window.addEventListener('click', clickHandler);
//     window.addEventListener('keydown', closeMenu);
// })

// Функции для передачи событий

// Открытие при скролле
// function scrollHandler(e) {
//     console.log('scrollHandler');
//     closeMenu();
// }

// // Открытие при клике
// function clickHandler(e) {
//     console.log('clickHandler');
//     if(!contextMenu.contains(e.target)) {
//         closeMenu();
//     }
// }

// // Открытие при нажатии кнопки
// function escHandler(e) {
//     console.log('escHandler');
//     if(e.keyCode === 27) {
//         closeMenu();
//     }
// }

// // Функция закрытия меню
// function closeMenu() {
//     window.removeEventListener('scroll', scrollHandler);
//     window.removeEventListener('click', clickHandler);
//     window.removeEventListener('keydown', closeMenu);
//     contextMenu.classList.add('contextmenu_hidden'); //Добавляем класс контекстного меню обратно
// }



