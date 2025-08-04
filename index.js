let [seconds, minutes, hours] = [0, 0, 0];
let displayTime = document.getElementById("displayTime");
let timer = null;

// --- ADDITION: Load saved time from localStorage on page load ---
window.onload = function () {
  hours = parseInt(localStorage.getItem("hours")) || 0;
  minutes = parseInt(localStorage.getItem("minutes")) || 0;
  seconds = parseInt(localStorage.getItem("seconds")) || 0;

  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  displayTime.innerHTML = h + ":" + m + ":" + s;
};

function stopwatch() {
  seconds++;
  if (seconds == 60) {
    seconds = 0;
    minutes++;
    if (minutes == 60) {
      minutes = 0;
      hours++;
    }
  }

  // --- ADDITION: Save current time to localStorage each second ---
  localStorage.setItem("hours", hours);
  localStorage.setItem("minutes", minutes);
  localStorage.setItem("seconds", seconds);

  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;

  displayTime.innerHTML = h + ":" + m + ":" + s;
}

function watchStart() {
  if (timer !== null) {
    clearInterval(timer);
  }
  timer = setInterval(stopwatch, 1000);
}

function watchPause() {
  clearInterval(timer);
  timer = null;
}

function watchReset() {
  clearInterval(timer);
  timer = null;
  [seconds, minutes, hours] = [0, 0, 0];
  displayTime.innerHTML = "00:00:00";

  // --- ADDITION: Clear saved time from localStorage on reset ---
  localStorage.removeItem("hours");
  localStorage.removeItem("minutes");
  localStorage.removeItem("seconds");
}
