(function() {
    const slider = document.querySelector('.slider');
    const wrapper = slidder.querySelector('.slider_wrapper');
    const innerWrapper = wrapper.querySelector('.slider_inner-wrapper');
    const slides = [...document.querySelectorAll('.slider_slide')];
    const slidesCount = slides.length;
    const buttonBack = document.querySelector('.slider__button_back-js');
    const buttonNext = document.querySelector('.slider__button_next-js');
    const pagination = document.querySelector('.slider__pagination_js');
    const ANIMATION_TIME = 500;

    let activeSlideIndex = 0;
    let sileWidth = wrapper.offsetWidth;
    let timer = null;
    let dots = [];

    initWidth();
    createDots();
    setActiveSlide(0, false);

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

    function setActiveSlide(index, withAnimation = true) {
        if (index < 0 || index >= slidesCount) return;

        buttonBack.removeAttribute('disabled');
        buttonNext.removeAttribute('disabled');

        innerWrapper.style.transform = `translateX(${index * sileWidth * (-1)}px)`;

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

        activeSlideIndex = index;
        dots[activeSlideIndex].classList.remove('slider')
    }

    function initWidth() {
         sileWidth = wrapper.offsetWidth;

         slides.forEach(slide => {
            slide.style.width = `${sileWidth}px`;
        });
    }

    // function createDots() {
    //     for (let i = 0; i < slidesCount; i++) {
    //         const dot = createDot(i);
    //         dots.push(dot);
    //         pagination.insertAdjacentElement('beforeend', dot);
    //     }
    // }

    // function createDot() {
    //     const dot = document.createElement('button');
    //     dot.classList.add('slider__dot');

    //     if(index === activeSlideIndex) {
    //         dot.classList.add('slider__dot_active');
    //     }

    //     dot.addEventListener('click', () => {
    //         setActiveSlide(index);
    //     })

    //     return dot;
    // }
})();