const ageCalculate = () => {
  const today = new Date();
  const inputDate = new Date(document.getElementById("date-inp").value);
  const birthDetails = {
    date: inputDate.getDate(),
    month: inputDate.getMonth() + 1,
    year: inputDate.getFullYear(),
  };
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDate = today.getDate();

  if (isFutureDate(birthDetails, currentYear, currentMonth, currentDate)) {
    alert("YOU ARE NOT BORN YET!"); // Mistake: This alert message might be inappropriate.
    displayResult("-", "-", "-");
    return;
  }
  const { years, months, days } = calculateAge(
    birthDetails,
    currentYear,
    currentMonth,
    currentDate
  );
  displayResult(days, months, years);
};

const isFutureDate = (birthDetails, currentYear, currentMonth, currentDate) => {
  return (
    birthDetails.year > currentYear ||
    (birthDetails.year === currentYear &&
      (birthDetails.month > currentMonth ||
        (birthDetails.month === currentMonth &&
          birthDetails.date > currentDate)))
  );
};

const calculateAge = (birthDetails, currentYear, currentMonth, currentDate) => {
  let years = currentYear - birthDetails.year;
  let months = currentMonth - birthDetails.month;
  let days = currentDate - birthDetails.date;

  if (days < 0) {
    months--;
    const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const daysInLastMonth = getDaysInMonth(lastMonth, currentYear);
    days = daysInLastMonth + days; // Mistake: Corrected calculation of days.
  }
  if (months < 0) {
    years--;
    months = months + 12;
  }
  return { years, months, days };
};

const getDaysInMonth = (month, year) => {
  const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const daysInMonth = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return daysInMonth[month - 1];
};

const displayResult = (bdate, bMonth, bYear) => {
  document.getElementById("years").textContent = bYear;
  document.getElementById("months").textContent = bMonth;
  document.getElementById("days").textContent = bdate;
};

document.getElementById("calculate-button").addEventListener("click", ageCalculate); // Mistake: Corrected the attachment of event listener.
