document.addEventListener('DOMContentLoaded', () => {
    const sliderWrapper = document.querySelector('.slider__inner-wrapper');
    const slides = document.querySelectorAll('.slider__slide');
    const totalSlides = slides.length;
    const pagination = document.querySelector('.slider__pagination_js');
    const btnPrev = document.querySelector('.slider__button-back_js');
    const btnNext = document.querySelector('.slider__button-next_js');

    let currentIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50; // Минимальное расстояние для свайпа (в пикселях)

    // Создаём точки для пагинации
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.classList.add('slider__dot');
        if (i === 0) dot.classList.add('slider__dot_active');
        dot.addEventListener('click', () => goToSlide(i));
        pagination.appendChild(dot);
    }

    const dots = document.querySelectorAll('.slider__dot');

    // Функция перехода к слайду
    function goToSlide(index) {
        currentIndex = index;
        if (currentIndex >= totalSlides) currentIndex = 0;
        if (currentIndex < 0) currentIndex = totalSlides - 1;

        sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Обновляем активную точку
        dots.forEach((dot, i) => {
            dot.classList.toggle('slider__dot_active', i === currentIndex);
        });
    }

    // Кнопка "Назад"
    btnPrev.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
    });

    // Кнопка "Вперёд"
    btnNext.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
    });

    // Обработка сенсорных событий для свайпа
    sliderWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX; // Запоминаем начальную позицию касания
    });

    sliderWrapper.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX; // Отслеживаем движение пальца
    });

    sliderWrapper.addEventListener('touchend', () => {
        const swipeDistance = touchEndX - touchStartX;

        // Если свайп вправо (больше 50px), переключаем на предыдущий слайд
        if (swipeDistance > swipeThreshold) {
            goToSlide(currentIndex - 1);
        }
        // Если свайп влево (меньше -50px), переключаем на следующий слайд
        else if (swipeDistance < -swipeThreshold) {
            goToSlide(currentIndex + 1);
        }

        // Сбрасываем значения
        touchStartX = 0;
        touchEndX = 0;
    });

    // Автопрокрутка (опционально)
    setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 5000);
});