let countDown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
function timer(seconds) {
    clearInterval(countDown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTime(seconds);
    displayEndTime(then);
    countDown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if(secondsLeft < 0) {
            clearInterval(countDown);
            return;
        }
        displayTime(secondsLeft);
    }, 1000);
}

function displayTime (seconds) {
    const min = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const display = `${min}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    timerDisplay.textContent = display;
    document.title = display;
}

function displayEndTime (second) {
    const end = new Date(second);
    const hr = end.getHours() > 12 ? end.getHours()-12 : end.getHours();
    const minute = end.getMinutes();
    endTime.textContent = `Be Back at ${hr}:${minute < 10 ? '0' : ''}${minute}`;
} 
function startTimer() {
    const seconds = parseInt(this.dataset.time);
    console.log(this);
    timer(seconds);
}
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const min = this.minutes.value;
    timer(min * 60);
    this.reset();

});
buttons.forEach(button => button.addEventListener('click', startTimer));