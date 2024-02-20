
const cardInputs = document.querySelectorAll('.card__input');
const submitButton = document.querySelector('.card__button');

const validateDay = (day) => {
    return day && day > 0 && day <= 31;
};
  
const validateMonth = (month) => {
    return month && month > 0 && month <= 12;
};
  
const validateYear = (year) => {
    const currentYear = new Date().getFullYear();
    return year && year > 0 && year <= currentYear;
};

const isDateValid = (dayElement, monthElement, yearElement) => {
    const day = parseInt(dayElement.value);
    const month = parseInt(monthElement.value);
    const year = parseInt(yearElement.value);

    const validDay = validateDay(day);
    const validMonth = validateMonth(month);
    const validYear = validateYear(year);

    dayElement.classList.toggle("card__input--error", !validDay);
    monthElement.classList.toggle("card__input--error", !validMonth);
    yearElement.classList.toggle("card__input--error", !validYear);

    return validDay && validMonth && validYear;
};

const calculateAge = (year, month, day) => {
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);

    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
        ageYears--;
        ageMonths += 12;
    }
    if (ageDays < 0) {
        const tempDate = new Date(today.getFullYear(), today.getMonth() - 1, 0);
        ageDays = tempDate.getDate() - birthDate.getDate() + today.getDate();
        ageMonths--;
    }

    return { years: ageYears, months: ageMonths, days: ageDays };
};

const onclickCalculate = () => {
    const dayElement = document.querySelector('.card__input[name="day"]');
    const monthElement = document.querySelector('.card__input[name="month"]');
    const yearElement = document.querySelector('.card__input[name="year"]');
    const resultElement = document.querySelector('.card__resultValue');

    if (!isDateValid(dayElement, monthElement, yearElement)) {
        resultElement.textContent = "--";
        return;
    }

    const age = calculateAge(parseInt(yearElement.value), parseInt(monthElement.value), parseInt(dayElement.value));
    resultElement.textContent = `${age.years} years, ${age.months} months, ${age.days} days`;

};

cardInputs.forEach(input => {
    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            onclickCalculate();
        }
    });
});

submitButton.addEventListener('click', onclickCalculate);
