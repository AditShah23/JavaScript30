const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const toggle = document.querySelector('.toggle');
const skipButtons = document.querySelectorAll('[data-skip]');
const ranges = document.querySelectorAll('.player__slider');
const fullScreen = document.querySelector('.full_screen');

function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdates() {
    video[this.name] = this.value;
}

function handleProgress() {
    const percentage = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percentage}%`;
}

function scrub(e) {
    console.log(mousedown);
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

let isFullScreen = false;
let Screen = document.querySelector('.player');
let defaultScreenSize = window.getComputedStyle(Screen).getPropertyValue('width');

function toggleScreen(e) {
    if(isFullScreen) {
        isFullScreen = false;
        Screen.style.width = defaultScreenSize;
        console.log(Screen.style.width);
    }
    else {
        isFullScreen = true;
        Screen.style.width = '100%';
        console.log(Screen.style.width);
    }


}

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdates));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdates));

video.addEventListener('timeupdate', handleProgress);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

fullScreen.addEventListener('click', toggleScreen);