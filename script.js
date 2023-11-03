//Display Elements Main Container
const mainSectionText = document.getElementById('main-session-text');
const countDown = document.getElementById("time-left");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
//Reset Container Elements
const increaseBreak = document.getElementById("increase-break");
const breakTime = document.getElementById("break-time");
const decreaseBreak = document.getElementById("decrease-break");

const startingMinutes = 25;
let time = startingMinutes * 60;
let timer; // to store the interval timer

//UpdatedCountDown()
function updatedCountDown() {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  countDown.innerText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  time--;

  if (time < 0) {
    stop();
    countDown.innerText = breakTime.innerText + ":00";
    mainSectionText.innerText = "Take a break 😄";
  
  }
}

//function stop
function stop() {
  clearInterval(timer);
}
//Start Countdown Event
startBtn.addEventListener("click", () => {
  if (!timer) {
    timer = setInterval(updatedCountDown, 1000);
  }
  startBtn.classList.toggle("d-none");
  pauseBtn.classList.toggle("d-none");
  pauseBtn.classList.toggle("d-block");
});

//pause btn
pauseBtn.addEventListener("click", () => {
  stop();
  timer = undefined;
  startBtn.classList.toggle("d-none");
  pauseBtn.classList.toggle("d-none");
  pauseBtn.classList.toggle("d-block");
});

//reset state
resetBtn.addEventListener("click", () => {
  stop();
  timer = undefined;
  time = startingMinutes * 60;
  updatedCountDown();
  pauseBtn.classList.add('d-none');
  startBtn.classList.add('d-inline')
});
