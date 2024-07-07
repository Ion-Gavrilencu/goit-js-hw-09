import Notiflix from 'notiflix';
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('promiseForm');

  if (form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();

      const delay = Number(form.delay.value);
      const step = Number(form.step.value);
      const amount = Number(form.amount.value);

      for (let i = 0; i < amount; i++) {
        const currentDelay = delay + i * step;
        createPromise(i + 1, currentDelay)
          .then(({ position, delay }) => {
           Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
          })
          .catch(({ position, delay }) => {
             Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
          });
      }
    });
  } else {
    console.error('Form element not found');
  }

  function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const shouldResolve = Math.random() > 0.3;
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay);
    });
  }
});


