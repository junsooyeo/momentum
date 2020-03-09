const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");

function getTime() {
  const time = new Date();
  const hr = time.getHours();
  const min = time.getMinutes();
  const sec = time.getSeconds();

  clockTitle.innerText = `${hr < 10 ? `0${hr}` : hr}:${
    min < 10 ? `0${min}` : min
  }:${sec < 10 ? `0${sec}` : sec}`;
  return hr;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}
init();
