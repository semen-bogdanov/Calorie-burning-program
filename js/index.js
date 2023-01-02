// TODO: Кнопки и указанные значения
const gender__male = document.querySelector(`#gender-male`); // Мужчина кнопка
const gender__female = document.querySelector(`#gender-female`); // Женщина кнопка
const age = document.querySelector(`#age`); // input возраст
const height = document.querySelector(`#height`); // input рост см
const weight = document.querySelector(`#weight`); // input вес кг
// Выбираем все типы где вводяться цифры(number)
const input__num = document.querySelectorAll(`input[type=number]`);
// Физическая активность
const activity = document.querySelectorAll(`.activity`); // массив input: физическая активность
// Кнопка расчитать
const form__submit = document.querySelector(`.form__submit-button`); // Кнопка расчитать
// Кнопка очистить поле и расчёт
const form__reset = document.querySelector(`.form__reset-button`); // Кнопка очистить поле и расчёт
// Показать или удалить поле с калориями
const counter__result = document.querySelector(`.counter__result--hidden`); // Показать или удалить поле с калориями 
const calories__norm = document.querySelector(`#calories-norm`); // Калории норма
const calories__minimal = document.querySelector(`#calories-minimal`); // Калорий минимально
const calories__maximal = document.querySelector(`#calories-maximal`); // Калорий максимально

// TODO: Кнопки мужчина и женщина
let count = +5;

gender__male.oninput = function () {
    count = +5;
    console.log(count);
};


gender__female.oninput = function () {
    count = -161;
    console.log(count);
}


// TODO: Валидация. Если все поля заполнены, то кнопка "Расчитать" и "Очистить поле расчёта" появляються
input__num.forEach((element, item, arr) => {
    element.oninput = function () {
        if ((age.value && height.value && weight.value) > 0 && (age.value && height.value && weight.value) != null) { // "Расчитать"
            form__submit.disabled = false;
            activity[1].click();
            activity[0].click();
        } else {
            form__submit.disabled = true;
        }
        if ((age.value || height.value || weight.value) > 0 && (age.value || height.value || weight.value) != null) { // "Очистить поле расчёта"
            form__reset.disabled = false;
        } else {
            form__reset.disabled = true;
        }
    }
    element.addEventListener('change', function () {
        activity[1].click();
        activity[0].click();
    });
});

// TODO: Физическая активность
activity.forEach((element, item, arr) => {
    element.addEventListener('change', function () {
        const coutFiz2 = {
            minimal: 1.2,
            nizkaya: 1.46,
            midle: 1.55,
            visokie: 1.64,
            veryHi: 1.9,
            OUT: 1.2, // передаёться выбранное значение
            DCI: 0, // среднее значение калорий (в сутки)
            DCI_minimal: 0, // снижение веса
            DCI_maximal: 0, // максимаотное значение калорий (в сутки)
            fullFiza: function () {
                if (element == arr[0]) {
                    this.OUT = this.minimal; // минимальная 1.2
                }
                if (element == arr[1]) {
                    this.OUT = this.nizkaya; // низкая 1.46
                }
                if (element == arr[2]) {
                    this.OUT = this.midle; // средняя 1.55
                }
                if (element == arr[3]) {
                    this.OUT = this.visokie; // высокая 1.64
                }
                if (element == arr[4]) {
                    this.OUT = this.veryHi; // очень высокая 1.9
                }
            },
            // TODO: Валидация. Если все поля заполнены, то только тогда значения передаються для просчёта формулы
            Validation: function () {
                if ((age.value && height.value && weight.value) > 0 && (age.value && height.value && weight.value) != null) {
                    this.DCI = ((weight.value * 10) + (height.value * 6.25) - (age.value * 5) + count) * this.OUT;
                    this.DCI = Math.trunc(this.DCI);
                    this.DCI_minimal = this.DCI - (this.DCI * 0.2); // снижение веса
                    this.DCI_maximal = this.DCI + (this.DCI * 0.5) // максимаотное значение калорий (в сутки)
                    calories__norm.textContent = this.DCI; // среднее значение калорий (в сутки)
                    calories__minimal.textContent = Math.trunc(this.DCI_minimal); // снижение веса округление числа
                    calories__maximal.textContent = Math.trunc(this.DCI_maximal); // максимаотное значение калорий (в сутки) округление числа
                }
            }
        };
        coutFiz2.fullFiza();
        coutFiz2.Validation();
    });
});

gender__male.addEventListener('change', function () {
    activity[1].click();
    activity[0].click();
});

gender__female.addEventListener('change', function () {
    activity[1].click();
    activity[0].click();
});


// Кнопка Расчитать
form__submit.addEventListener('click', function () {
    counter__result.style.visibility = `visible`;
    counter__result.style.opacity = 1;
});

// Кнопка очистить поле (сброс)
form__reset.addEventListener('click', function () {
    input__num.forEach((element, item, arr) => {
        element.value = "";
        form__submit.disabled = true;
        form__reset.disabled = true;
        counter__result.style.visibility = `hidden`;
        counter__result.style.opacity = 0;
    });
});