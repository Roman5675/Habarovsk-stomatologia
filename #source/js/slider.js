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