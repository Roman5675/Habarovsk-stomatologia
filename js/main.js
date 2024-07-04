
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

new Swiper('.price-slider', {
    slidesPerView: 5,
    centeredSlides: true,
    simulateTouch: true,
    keyboard: {
        enabled: true,
        onlyInViewport: true,
    },
    spaceBetween: 0,
    loop: true,
    breakpoints: {
        1400: {
            slidesPerView: 5
        },
        993: {
            slidesPerView: 2
        },
        0: {
            slidesPerView: 1
        },

    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true, // Сделать точки кликабельными
    },
});