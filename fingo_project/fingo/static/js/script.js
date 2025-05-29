// Ждём загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.header__burger');
    const nav = document.querySelector('.header__nav');

    // Переключаем класс active для показа/скрытия меню
    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.classList.toggle('active'); // Для анимации иконки бургера
    });

    // Закрываем меню при клике на ссылку
    const navLinks = document.querySelectorAll('.header__list-item--link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            burger.classList.remove('active');
        });
    });
});