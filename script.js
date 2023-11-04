//Display Elements Main Container
const mainSectionText = document.getElementById("main-session-text");
const countDown = document.getElementById("time-left");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
//Reset Container Elements
const increaseBreak = document.getElementById("increase-break");
const breakTime = document.getElementById("break-time");
const decreaseBreak = document.getElementById("decrease-break");
//Edit Pomodoro Section Time
const increaseSectionBtn = document.getElementById("increase-section");
const decreaseSectionBtn = document.getElementById("decrease-section");

let startingMinutes = 1;
let startBreak = 5;
let time = startingMinutes * 60;
let timer; // to store the interval timer
let inBreak = false;

//UpdatedCountDown()
function updatedCountDown() {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  countDown.innerText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  if (time <= 0) {
    stop();
    countDown.innerText = `${breakTime.innerText}:00`;
    mainSectionText.innerText = "Take a  break 😄";
    toggleBtn();
  } else if (time === startBreak) {
    startBreakFun();
  } else {
    time--;
  }
}

//Start Countdown Event
function startTimer() {
  timer = setInterval(() => {
    time--;
    updatedCountDown();
  }, 100);
  toggleBtn();
}

//Start Break
function startBreakFun() {
  mainSectionText.innerText = "Break Time - Relax";
  inBreak = true;
  clearInterval(timer); // Clear any existing timers
  time = startBreak * 60; // Reset the countdown timer to the break time
  updatedCountDown(); // Update the countdown display immediately
  startTimer();

  if (inBreak && time <= 0) {
    inBreak = false;
    mainSectionText.innerText = "Session";
    startTimer(); // Start the Pomodoro session immediately
  }
}

//Delay 5 seconds the Break Countdown
function startBreakWithDelay() {
  setTimeout(startBreakFun, 5000); //5 seconds
}

//Clear Interval
function stop() {
  clearInterval(timer);
}
//Pause Timer
function pauseTimer() {
  stop();
  toggleBtn();
}

//Toggle Btns Classes
function toggleBtn() {
  startBtn.classList.toggle("d-none");
  pauseBtn.classList.toggle("d-none");
  pauseBtn.classList.toggle("d-block");
}
//Handle Events

startBtn.addEventListener("click", () => {
  if (timer) {
    startBreakFun();
  } else {
    startTimer();
  }
});
pauseBtn.addEventListener("click", pauseTimer);
// resetBtn.addEventListener("click", resetTimer);
///////////////////////////////////////////////////
