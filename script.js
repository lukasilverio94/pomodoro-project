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

//initial variables
let startingMinutes = 25;
let startBreak = 5;
let time = startingMinutes * 60;
let timer; //  store the interval timer
let inBreak = false;

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
    time--;
    updateCountDownDisplay();
  }, 100);
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
    const counter = document.getElementById("counter");
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
  updateCountDownDisplay();
  toggleBtn();
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

//Increase Pomodoro Time
increaseSectionBtn.addEventListener("click", () => {
  startingMinutes += 1;
  time = startingMinutes * 60;
  countDown.innerText = `${startingMinutes}:00`;
  sectionTimeDisplay.innerText = startingMinutes;
});

//Decrease pomodoro time
decreaseSectionBtn.addEventListener("click", () => {
  startingMinutes -= 1;
  time = startingMinutes * 60;
  countDown.innerText = `${startingMinutes}:00`;
  sectionTimeDisplay.innerText = startingMinutes;
});

//Increase Break Time
increaseBreak.addEventListener("click", () => {
  startBreak += 1;
  time = startBreak * 60;
  breakTime.innerText = startBreak;
  // If you are not in a break, update the time
  if (!inBreak) {
    time = startingMinutes * 60;
    countDown.innerText = `${startingMinutes}:00`;
  }
});
//Decrease Break Time
decreaseBreak.addEventListener("click", () => {
  startBreak -= 1;
  if (startBreak < 1) startBreak = 1;
  time = startBreak * 60;
  breakTime.innerText = startBreak;
  // If you are not in a break, update the time
  if (!inBreak) {
    time = startingMinutes * 60;
    countDown.innerText = `${startingMinutes}:00`;
  }
});

pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
