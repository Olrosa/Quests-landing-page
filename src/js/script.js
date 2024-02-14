

document.addEventListener('DOMContentLoaded', function() {
    // Функция для открытия модального окна
    function openModal(modalId) {
        // Показываем подложку
        const backdrop = document.getElementById(modalId);
        backdrop.style.display = 'block';

        // Показываем контент модального окна
        const modalContent = backdrop.querySelector('.modal-content');
        modalContent.style.display = 'block';

        // Добавляем класс 'modal-open' к body для удаления скролла
        document.body.classList.add('modal-open');

        // Закрываем модальное окно при клике на подложку
        backdrop.addEventListener('click', function(event) {
            if (event.target === backdrop) {
                closeModal(modalId);
            }
        });

        // Добавляем обработчик клика на крестик, чтобы закрыть модальное окно
        const closeButton = modalContent.querySelector('.close');
        closeButton.addEventListener('click', function() {
            closeModal(modalId);
        });
    }

    // Функция для закрытия модального окна
    function closeModal(modalId) {
        // Скрываем подложку
        const backdrop = document.getElementById(modalId);
        backdrop.style.display = 'none';

        // Скрываем контент модального окна
        const modalContent = backdrop.querySelector('.modal-content');
        modalContent.style.display = 'none';

        // Удаляем класс 'modal-open' из body для возвращения скролла
        document.body.classList.remove('modal-open');
    }

    // Получаем все кнопки для вызова модальных окон
    const modalButtons = document.querySelectorAll('.open-modal');

    // Для каждой кнопки добавляем обработчик клика
    modalButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Получаем атрибут data-modal, чтобы узнать, какое модальное окно открыть
            const modalId = button.getAttribute('data-modal');
            openModal(modalId);
        });
    });

    /// MAPS
    ymaps.ready(init);

    function init() {
        var myMap = new ymaps.Map("yandex-map", {
            center: [55.76, 37.64], // Координаты центра карты
            zoom: 10 // Уровень масштабирования карты
        });

        // Создаем кастомную метку
        var customIcon = '../icons/map_logo.png'; // Путь к изображению метки

        var customPlacemark = new ymaps.Placemark(
            [55.76, 37.64], // Координаты метки
            {},
            {
                iconLayout: 'default#image', // Задаем макет для изображения метки
                iconImageHref: customIcon, // Указываем путь к изображению метки
                iconImageSize: [30, 30], // Задаем размеры изображения метки
                iconImageOffset: [-15, -15] // Задаем смещение изображения метки
            }
        );

        // Добавляем метку на карту
        myMap.geoObjects.add(customPlacemark);
    }


    /// MOBILE

    const mobileMenuIcon = document.querySelector('.header__mobile-open');
    const nav = document.querySelector('.nav');

    mobileMenuIcon.addEventListener('click', function() {
        nav.classList.toggle('show');
        toggleMenuIcon();
    });

    function toggleMenuIcon() {
        const iconImg = mobileMenuIcon.querySelector('.icon-img');
        if (nav.classList.contains('show')) {
            iconImg.src = 'icons/close.svg'; // Укажите путь к вашей иконке закрытия
        } else {
            iconImg.src = 'icons/menu.png'; // Укажите путь к вашей иконке меню
        }
    }

    const dropdowns = document.querySelectorAll('.header__dropdown');

    // Проверяем, находится ли текущее устройство в режиме мобильного просмотра
    const isMobile = window.matchMedia('(max-width: 568px)').matches;
    
    // Если текущее устройство - мобильное, скрываем все dropdown'ы
    if (isMobile) {
      dropdowns.forEach(dropdown => {
        dropdown.style.display = 'none';
      });
    }

    // Получаем ссылку на элемент заголовка
    const header = document.querySelector('.header');

    // Отслеживаем событие прокрутки страницы
    window.addEventListener('scroll', function() {
        // Проверяем текущую позицию прокрутки
        if (window.scrollY > 0) {
            // Добавляем класс header_active, если страница прокручена вниз
            header.classList.add('header_active');
        } else {
            // Удаляем класс header_active, если страница прокручена вверх и находится в начале
            header.classList.remove('header_active');
        }
    });

    // Слайдер
    if(window.innerWidth < 992) {
        new Swiper('.services__slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            breakpoints: {
                320: {
                    slidesPerView: 1,
                },
                576: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 3,
                }
            },
            pagination: {
                el: '.slider__points',
                type: 'bullets', 
                renderBullet: function (index, className) {
                  return '<span class="' + className + '"></span>';
                },
                clickable: true,
                bulletClass: 'slider__point',
                bulletActiveClass: 'slider__point_active'
            },
        });
    }
    new Swiper('.complex__slider', {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: true,
        effect: 'coverflow',
        coverflowEffect: {
            rotate: 0,
            slideShadows: false,
            stretch: 20,
          },
    });

});
