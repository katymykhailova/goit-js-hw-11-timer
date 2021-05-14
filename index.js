class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.intervalId = null;
    this.selector = selector;
    this.targetDate = targetDate;
    this.init();
  }

  init() {
    let prevTime = this.getTimeComponents(this.targetDate - new Date());
    this.creatEl(prevTime);
    this.intervalId = setInterval(() => {
      const currentTime = new Date();
      const deltaTime = this.targetDate - currentTime;
      const time = this.getTimeComponents(deltaTime);
      for (const key in time) {
        const valueNewEl = document.querySelector(`[data-value="${key}New"]`);
        const valueOldEl = document.querySelector(`[data-value="${key}Old"]`);
        const newValue = time[key];
        const currentValue = prevTime[key];
        const parent = valueNewEl.parentNode;
        if (newValue !== currentValue) {
          parent.classList.remove('anim');
          valueNewEl.textContent = newValue;
          valueOldEl.textContent = currentValue;
          const reflow = parent.offsetWidth;
          parent.classList.add('anim');
        }
      }
      prevTime = { ...time };

      if (deltaTime < 1000) {
        clearInterval(this.intervalId);
      }
    }, 1000);
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }

  creatEl(time = {}) {
    const timer1El = document.querySelector(this.selector);
    for (const key in time) {
      const valueEl = timer1El.querySelector(`[data-value="${key}"]`);
      valueEl.innerHTML = `<span class="valueNew" data-value="${key}New">${time[key]}</span>
          <span class="valueOld" data-value="${key}Old">${time[key]}</span>`;
    }
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 28, 2021'),
});
