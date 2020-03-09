const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greeting");
const USER_LS = "currentUser";
const SHOWING_CN = "showing";
const time = new Date();
const hr = time.getHours();

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintName(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function paintName(text) {
  if (hr < 6) {
    greeting.innerText = `Hello ${text} you should sleep more!`;
  } else if (hr < 11) {
    greeting.innerText = `Good morning ${text}!`;
  } else if (hr < 16) {
    greeting.innerText = `Good afternoon ${text}!`;
  } else if (hr < 20) {
    greeting.innerText = `Good evening ${text}!`;
  } else {
    greeting.innerText = `Good night ${text}!`;
  }
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintName(currentUser);
  }
}

function init() {
  loadName();
}

init();
