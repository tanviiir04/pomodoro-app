const bells = new Audio('./sounds/bell.wav');
const startBtn = document.querySelector('.btn-start');
const pauseBtn = document.querySelector('.btn-pause');
const resetBtn = document.querySelector('.btn-reset');
const minuteDiv = document.querySelector('.minutes');
const secondDiv = document.querySelector('.seconds');

let myInterval;
let totalSeconds;
let state = 'stopped'; // can be 'stopped', 'running', or 'paused'
const initialTime = 25 * 60;

const updateSeconds = () => {
    totalSeconds--;

    const minutesLeft = Math.floor(totalSeconds / 60);
    const secondsLeft = totalSeconds % 60;

    secondDiv.textContent = secondsLeft < 10 ? '0' + secondsLeft : secondsLeft;
    minuteDiv.textContent = `${minutesLeft}`;

    if (minutesLeft === 0 && secondsLeft === 0) {
        bells.play();
        clearInterval(myInterval);
        state = 'stopped';
    }
};

const appTimer = () => {
    if (state === 'stopped') {
        totalSeconds = initialTime;
        updateDisplay(totalSeconds);
        myInterval = setInterval(updateSeconds, 1000);
        state = 'running';
    } else if (state === 'paused') {
        myInterval = setInterval(updateSeconds, 1000);
        state = 'running';
    } else {
        alert('Session is already running.');
    }
};

const pauseTimer = () => {
    if (state === 'running') {
        clearInterval(myInterval);
        state = 'paused';
        pauseBtn.textContent = 'resume';
    } else if (state === 'paused') {
        myInterval = setInterval(updateSeconds, 1000);
        state = 'running';
        pauseBtn.textContent = 'pause';
    }
};

const resetTimer = () => {
    clearInterval(myInterval);
    totalSeconds = initialTime;
    updateDisplay(totalSeconds);
    state = 'stopped';
    pauseBtn.textContent = 'pause';
};

const updateDisplay = (seconds) => {
    const minutesLeft = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    minuteDiv.textContent = minutesLeft;
    secondDiv.textContent = secondsLeft < 10 ? '0' + secondsLeft : secondsLeft;
};

startBtn.addEventListener('click', appTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
