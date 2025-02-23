// Создаём звуки
const meowSound = new Audio('https://assets.mixkit.co/active_storage/sfx/583/583-preview.mp3');
const backgroundMusic = new Audio('rave-tonight.mp3');
backgroundMusic.loop = true; // Музыка будет играть в цикле
backgroundMusic.volume = 0.5; // Начальная громкость 50%

// Получаем элементы управления музыкой
const toggleButton = document.getElementById('toggleMusic');
const volumeSlider = document.getElementById('volumeSlider');
let isMusicPlaying = false;

// Обработчик кнопки включения/выключения музыки
toggleButton.onclick = function () {
    if (isMusicPlaying) {
        backgroundMusic.pause();
        toggleButton.textContent = '🔈 Включить музыку';
    } else {
        backgroundMusic.play();
        toggleButton.textContent = '🔇 Выключить музыку';
    }
    isMusicPlaying = !isMusicPlaying;
}

// Обработчик регулятора громкости
volumeSlider.oninput = function () {
    backgroundMusic.volume = volumeSlider.value;
}

// Получаем нужные элементы со страницы
const messageBoard = document.getElementById('messageBoard');
const catsCount = document.getElementById('catsCount');

// Сколько котиков уже проснулось
let awakeCats = 0;

// Возможные фразы котиков
const phrases = [
    "Мяу... Уже утро?",
    "Ещё пять минуточек...",
    "А завтрак готов?",
    "Иду-иду...",
    "Мур-мур, доброе утро!",
    "Когда завтрак?"
];

// Цвета для фона в зависимости от количества проснувшихся котиков
const colors = [
    '#000033', // Ночь
    '#00004C', // Предрассветные сумерки
    '#000066', // Рассвет начинается
    '#0000FF', // Светлеет
    '#4169E1', // Утреннее небо
    '#87CEEB'  // Ясное утреннее небо
];

// Функция обновления фона
function updateBackground() {
    document.body.style.backgroundColor = colors[awakeCats];
}

// Находим все комнаты
const rooms = document.querySelectorAll('.room');

// Для каждой комнаты добавляем действие при клике
rooms.forEach(function (room, index) {
    room.onclick = function () {
        // Проверяем, не проснулся ли уже котик
        if (!room.classList.contains('awake')) {
            // Играем звук мяуканья
            meowSound.currentTime = 0;
            meowSound.play();

            // Добавляем класс комнате
            room.classList.add('awake');

            // Меняем статус котика
            const status = room.querySelector('.status');
            status.textContent = "Проснулся!";

            // Считаем котиков
            awakeCats = awakeCats + 1;
            catsCount.textContent = awakeCats;

            // Делаем видимым соответствующего гуляющего котика
            const walkingCat = document.querySelector(`.walking-cat:nth-child(${awakeCats})`);
            if (walkingCat) {
                walkingCat.classList.add('visible');
            }

            // Обновляем фон
            updateBackground();

            // Выбираем случайную фразу
            const randomIndex = Math.floor(Math.random() * phrases.length);
            messageBoard.textContent = phrases[randomIndex];

            // Проверяем, все ли котики проснулись
            if (awakeCats === 6) {
                messageBoard.textContent = "Ура! Все котики проснулись и гуляют внизу!";
            }
        }
    }
});