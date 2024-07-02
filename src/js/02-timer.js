import flatpickr from 'flatpickr';
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const startButton = document.querySelector('[data-start]');
const dateTimePicker = document.getElementById('datetime-picker');
let intervalId;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr(dateTimePicker, options);

startButton.addEventListener('click', () => {
  const targetDate = new Date(dateTimePicker.value);
  
  if (intervalId) {
    clearInterval(intervalId);
  }
  
  intervalId = setInterval(() => {
    const currentTime = new Date();
    const timeDifference = targetDate - currentTime;

    if (timeDifference <= 0) {
      clearInterval(intervalId);
      updateTimer(0);
      startButton.disabled = false;
      return;
    }

    updateTimer(timeDifference);
  }, 1000);
});

function updateTimer(timeDifference) {
  const { days, hours, minutes, seconds } = convertMs(timeDifference);

  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
