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

//UpdatedCountDown()
function updatedCountDown() {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  countDown.innerText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  if (time < 0) {
    stop();
    countDown.innerText = `${breakTime.innerText}:00`;
    mainSectionText.innerText = "Take a  break 😄";
    toggleBtn()
    startBreak()
    
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
// function startBreak() {

// }
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
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
// resetBtn.addEventListener("click", resetTimer);
///////////////////////////////////////////////////
