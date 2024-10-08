document.addEventListener('DOMContentLoaded', function () {
    // Проверяем, существует ли контейнер карты на странице
    var mapContainer = document.getElementById('map');
    if (mapContainer) {
        initMap(); // Инициализируем карту только если контейнер существует
    }
});

async function initMap() {
    // Проверяем, определена ли библиотека ymaps3
    if (typeof ymaps3 !== 'undefined') {
        try {
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
        } catch (error) {
            console.error('Error initializing the map:', error);
        }
    } else {
        console.error('ymaps3 is not defined');
    }
}