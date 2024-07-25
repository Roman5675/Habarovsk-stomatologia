//Слайдер swiper
new Swiper('.price-slider', {
    slidesPerView: 5,
    centeredSlides: true,
    simulateTouch: true, // Включает возможность перетаскивания слайдов мышью
    grabCursor: true,
    
    keyboard: {
        enabled: true,
        onlyInViewport: true,
    },
    spaceBetween: 0,
    loop: true,
    speed: 600, // Устанавливаем скорость перехода в миллисекундах
    breakpoints: {
        701: {
            slidesPerView: 5
        },
        0: {
            slidesPerView: 3
        },
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    on: {
        init: function() {
            updateSlideWidths(this);
        },
        slideChangeTransitionStart: function() {
            updateSlideWidths(this);
        },
        slideChangeTransitionEnd: function() {
            updateSlideWidths(this);
        }
    }
});

function updateSlideWidths(swiper) {
    var slides = swiper.slides;
    var activeIndex = swiper.activeIndex;
    var nextIndex = activeIndex + 1 < slides.length ? activeIndex + 1 : 0;
    var prevIndex = activeIndex - 1 >= 0 ? activeIndex - 1 : slides.length - 1;

    slides.forEach(function(slide, index) {
        var scale = 0.41;
        var zIndex = 1;
        if (index === activeIndex) {
            scale = 1;
            zIndex = 3;
        } else if (index === nextIndex || index === prevIndex) {
            scale = 0.54;
            zIndex = 2;
        }
        slide.style.transform = `scale(${scale})`;
        slide.style.zIndex = zIndex;

        var image = slide.querySelector('img');
        if (image) {
            var imgWidth = image.naturalWidth * scale;
            slide.style.width = `${imgWidth}px`;
        }
    });
}

window.addEventListener('load', function() {
    updateSlideWidths(swiper);
});

