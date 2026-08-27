const birthDateInput = document.getElementById("birthDate");
const calculateBtn = document.getElementById("calculateBtn");

const yearsElement = document.getElementById("years");
const monthsElement = document.getElementById("months");
const daysElement = document.getElementById("days");

const birthdayMessage = document.getElementById("birthdayMessage");
const errorMessage = document.getElementById("errorMessage");

// Set today's date as the maximum allowed date
const today = new Date();

const todayString =
    today.getFullYear() +
    "-" +
    String(today.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(today.getDate()).padStart(2, "0");

birthDateInput.max = todayString;


// Calculate age when button is clicked
calculateBtn.addEventListener("click", function () {

    errorMessage.textContent = "";

    // Check if date is selected
    if (!birthDateInput.value) {
        errorMessage.textContent = "Please select your date of birth.";
        return;
    }

    // Get date safely without timezone problems
    const [year, month, day] = birthDateInput.value
        .split("-")
        .map(Number);

    const birthDate = new Date(year, month - 1, day);

    const currentDate = new Date();

    // Check future date
    if (birthDate > currentDate) {
        errorMessage.textContent =
            "Date of birth cannot be in the future.";
        return;
    }

    // Calculate age
    let ageYears =
        currentDate.getFullYear() - birthDate.getFullYear();

    let ageMonths =
        currentDate.getMonth() - birthDate.getMonth();

    let ageDays =
        currentDate.getDate() - birthDate.getDate();


    // If current day is before birth day
    if (ageDays < 0) {

        ageMonths--;

        const previousMonth =
            new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                0
            );

        ageDays += previousMonth.getDate();
    }


    // If current month is before birth month
    if (ageMonths < 0) {

        ageYears--;
        ageMonths += 12;
    }


    // Display result
    yearsElement.textContent = ageYears;
    monthsElement.textContent = ageMonths;
    daysElement.textContent = ageDays;


    // Calculate next birthday
    showNextBirthday(month, day);

});


// Next birthday calculation
function showNextBirthday(birthMonth, birthDay) {

    const today = new Date();

    let nextBirthday = new Date(
        today.getFullYear(),
        birthMonth - 1,
        birthDay
    );


    // Birthday already passed this year
    if (nextBirthday < today) {

        nextBirthday = new Date(
            today.getFullYear() + 1,
            birthMonth - 1,
            birthDay
        );
    }


    // Calculate days remaining
    const difference =
        nextBirthday.getTime() - today.getTime();

    const daysRemaining =
        Math.ceil(
            difference / (1000 * 60 * 60 * 24)
        );


    if (daysRemaining === 0) {

        birthdayMessage.textContent =
            "🎂 Happy Birthday! Today is your birthday!";

    } else if (daysRemaining === 1) {

        birthdayMessage.textContent =
            "🎉 Your next birthday is tomorrow!";

    } else {

        birthdayMessage.textContent =
            `🎈 Your next birthday is in ${daysRemaining} days.`;
    }
}