Проект Игра в слова
----------
В верхней части экрана - горизонтальная строка из ячеек.
В нижней части экрана - кнопки с буквами и кнопка Сбросить.
При нажатии на кнопки с буквами, буквы вводятся в клетки (по одной в клетку).
При нажатии кнопки “Сбросить”, буквы стираются из клеток.

Таблица результатов храниться в localstorage.
Для сброса введите в консоль браузера: localStorage.setItem('words-game-score', null);

----------
- vue 2.6.11 (https://ru.vuejs.org)
с использованием:
- bootstrap-vue 2.6.1 (https://bootstrap-vue.js.org)
- axios 0.19.2

Установка под Windows, developer mode

npm install
npm install bootstrap-vue --save

запуск: npm run serve
