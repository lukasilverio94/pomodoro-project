//Display Elements Main Container
const mainSectionText = document.getElementById("main-session-text");
const countDown = document.getElementById("time-left");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const increaseBreak = document.getElementById("increase-break-btn");
const breakTime = document.getElementById("break-time");
const decreaseBreak = document.getElementById("decrease-break-btn");
const increaseSectionBtn = document.getElementById("increase-section");
const decreaseSectionBtn = document.getElementById("decrease-section");
const sectionTimeDisplay = document.getElementById("section-time");
const counter = document.getElementById("counter");
//initial variables
let startingMinutes = 25;
let startBreak = 5;
let timeInSeconds = startingMinutes * 60;
let timer; //  store the interval timer
let inBreak = false;
let cycles = 0;

//FormatTime
function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  return (countDown.innerText = `${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`);
}
//Render Clock
function renderClock(timeString) {
  countDown.innerText = timeString;
}
//Control Clock
function controlClock() {
  if (inBreak) {
    renderClock(formatTime(timeInSeconds));
    mainSectionText.innerText = "Break Time - Relax";
  } else {
    renderClock(formatTime(timeInSeconds));
    mainSectionText.innerText = "Session";
  }
}
//update countdown display
function updateCountDownDisplay() {
  timeInSeconds--;
  if (timeInSeconds <= 0) {
    stop();
    if (inBreak) {
      timeInSeconds = startBreak * 60;
    } else {
      timeInSeconds = startingMinutes * 60;
    }
    toggleBtn();
    startBreakFun();
  }
  renderClock(formatTime(timeInSeconds));
}
//Start Countdown Event
function startTimer() {
  updateCountDownDisplay();
  toggleBtn();
  timer = setInterval(() => {
    updateCountDownDisplay();
  }, 1000);
  controlClock();
}
//Start Break
function startBreakFun() {
  if (inBreak) {
    inBreak = false;
    timeInSeconds = startingMinutes * 60;
  } else {
    inBreak = true;
    timeInSeconds = startBreak * 60;
  }
  if (!inBreak && timeInSeconds === startingMinutes * 60) {
    counter.innerText = parseInt(counter.innerText) + 1;
  }
  controlClock();
  startTimer();
  toggleBtn();
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
//Reset State
function resetTimer() {
  stop();
  clearInterval(timer);
  startingMinutes = 25;
  startBreak = 5;
  sectionTimeDisplay.innerText = "5";
  timeInSeconds = startingMinutes * 60; // Reset time to the initial session time (25 minutes)
  renderClock(formatTime(timeInSeconds));
  mainSectionText.innerText = "Session"; // Set the text back to "Session"
  countDown.innerText = `${startingMinutes}:00`; // Display the initial time
  breakTime.innerText = startBreak;
  sectionTimeDisplay.innerText = startingMinutes;
  inBreak = false;
  counter.innerText = cycles;
  toggleBtn();
}
//Update - Increase/Decrease Section Time
function updateSectionTime(minutes) {
  startingMinutes = minutes;
  timeInSeconds = startingMinutes * 60;
  if (startingMinutes < 5) startingMinutes = 5;
  renderClock(formatTime(timeInSeconds));
  sectionTimeDisplay.innerText = startingMinutes;
}
//Update Break/Time
function updateBreak(minutes) {
  if (!inBreak) {
    startBreak = minutes; // If you're not in a break, just update the break time
    if (startBreak < 1) startBreak = 1;
    breakTime.innerText = startBreak;
  } else {
    // If you're in a break, update the break time and reset the countdown
    startBreak = minutes;
    if (startBreak < 1) startBreak = 1;
    breakTime.innerText = startBreak;
    timeInSeconds = startBreak * 60;
  }
}
//Toggle buttons classes
function toggleBtn() {
  startBtn.classList.toggle("d-none");
  pauseBtn.classList.toggle("d-none");
  pauseBtn.classList.toggle("d-block");
}
//Handle Events
startBtn.addEventListener("click", () => {
  if (timer && timeInSeconds === startingMinutes) {
    startBreakFun();
  } else {
    startTimer();
  }
});
increaseSectionBtn.addEventListener("click", () => {
  updateSectionTime(startingMinutes + 1);
});
decreaseSectionBtn.addEventListener("click", () => {
  updateSectionTime(startingMinutes - 1);
});
//Increase Break Time
increaseBreak.addEventListener("click", () => {
  updateBreak(startBreak + 1);
});
//Decrease Break Time
decreaseBreak.addEventListener("click", () => {
  updateBreak(startBreak - 1);
});
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
