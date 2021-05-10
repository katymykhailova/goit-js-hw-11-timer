class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.intervalId = null;
    this.selector = selector;
    this.targetDate = targetDate;

    this.init();
  }

  init() {
    this.creatEl(this.getTimeComponents(this.targetDate - new Date()));
    this.intervalId = setInterval(() => {
      const currentTime = new Date();
      const deltaTime = this.targetDate - currentTime;
      const time = this.getTimeComponents(deltaTime);
      for (const key in time) {
        document.querySelector(`[data-value="${key}"]`).textContent = time[key];
      }
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
    const timer1 = document.querySelector(this.selector);
    const timeEl = [];
    for (const key in time) {
      timeEl.push(`<div class="field">
        <span class="value" data-value="${key}">${time[key]}</span>
        <span class="label">${key[0].toUpperCase() + key.slice(1)}</span>
      </div>`);
      timer1.innerHTML = timeEl.join('');
    }
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 17, 2021'),
  // targetDate: new Date(1620599958290),
});