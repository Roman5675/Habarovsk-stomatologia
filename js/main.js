
//Меню бургер
document.addEventListener('DOMContentLoaded', function () {
    const iconMenu = document.querySelector('.menu__icon');
    const menuBody = document.querySelector('.menu__body');
    if (iconMenu) {
        iconMenu.addEventListener("click", function (e) {
            document.body.classList.toggle('_lock');
            iconMenu.classList.toggle('_active');
            menuBody.classList.toggle('_active');
        });
    }
});
async function initMap() {
    // Промис `ymaps3.ready` будет зарезолвлен, когда загрузятся все компоненты основного модуля API
    await ymaps3.ready;

    const {YMap, YMapDefaultSchemeLayer} = ymaps3;

    // Иницилиазируем карту
    const map = new YMap(
        // Передаём ссылку на HTMLElement контейнера
        document.getElementById('map'),

        // Передаём параметры инициализации карты
        {
            location: {
                // Координаты центра карты
                center: [135.098564, 48.460415],

                // Уровень масштабирования
                zoom: 18
            }
        }
    );

    // Добавляем слой для отображения схематической карты
    map.addChild(new YMapDefaultSchemeLayer());
}

initMap();

const swiper = new Swiper('.price-slider', {
    slidesPerView: 5,
    centeredSlides: true,
    touchEventsTarget: 'swiper-wrapper',
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

function initSlideWidths(swiper) {
    var slides = swiper.slides;

    slides.forEach(function(slide) {
        var image = slide.querySelector('img');
        if (image) {
            image.onload = function() {
                var imgWidth = image.naturalWidth;
                slide.style.width = `${imgWidth}px`;
                // Сохранение исходного размера в data-атрибут
                slide.dataset.originalWidth = imgWidth;
                updateSlideWidths(swiper);
            };
            if (image.complete) {
                var imgWidth = image.naturalWidth;
                slide.style.width = `${imgWidth}px`;
                slide.dataset.originalWidth = imgWidth;
            }
        }
    });
}

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

        // Используем сохраненный исходный размер
        var originalWidth = slide.dataset.originalWidth;
        if (originalWidth) {
            var imgWidth = originalWidth * scale;
            slide.style.width = `${imgWidth}px`;
        }
    });
}

window.addEventListener('load', function() {
    swiper.on('init', function() {
        initSlideWidths(swiper);
    });

    swiper.on('slideChangeTransitionStart', function() {
        updateSlideWidths(swiper);
    });

    swiper.on('slideChangeTransitionEnd', function() {
        updateSlideWidths(swiper);
    });

    swiper.init();
});

