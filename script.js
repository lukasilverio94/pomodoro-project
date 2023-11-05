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
let time = startingMinutes * 60;
let timer; //  store the interval timer
let inBreak = false;
let cycles = 0;
//update countdown display
function updateCountDownDisplay() {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  countDown.innerText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  if (time <= 0) {
    stop();
    countDown.innerText = `${breakTime.innerText}:00`;
    toggleBtn();
    startBreakFun();
  } else {
    time--;
  }
}
//Start Countdown Event
function startTimer() {
  timer = setInterval(() => {
    updateCountDownDisplay();
  }, 1000);
  toggleBtn();
}
//Start Break
function startBreakFun() {
  if (inBreak) {
    mainSectionText.innerText = "Back to work";
    inBreak = false;
    time = startingMinutes * 60; //reset the countdown to session pomodoro again
  } else {
    mainSectionText.innerText = "Break Time - Relax";
    inBreak = true;
    time = startBreak * 60; // Reset the countdown timer to the break time
  }
  //Check if a cycle is completed
  if (!inBreak && time === startingMinutes * 60) {
    counter.innerText = parseInt(counter.innerText) + 1;
  }
  updateCountDownDisplay(); // Update the countdown display immediately
  startTimer();
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
  time = startingMinutes * 60; // Reset time to the initial session time (25 minutes)
  mainSectionText.innerText = "Session"; // Set the text back to "Session"
  countDown.innerText = `${startingMinutes}:00`; // Display the initial time
  breakTime.innerText = startBreak;
  sectionTimeDisplay.innerText = startingMinutes;
  inBreak = false;
  counter.innerText = cycles;
  toggleBtn();
  updateCountDownDisplay();
}
//Update - Increase/Decrease Section Time
function updateSectionTime(minutes) {
  startingMinutes = minutes;
  time = startingMinutes * 60;
  if (startingMinutes < 5) startingMinutes = 5;
  countDown.innerText = `${startingMinutes}:00`;
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
    time = startBreak * 60;
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
  if (timer && time === startingMinutes) {
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
