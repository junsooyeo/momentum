const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
let toDos = [];

function deleteToDos(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerHTML = "X";
  delBtn.classList.add("delBtn");
  delBtn.addEventListener("click", deleteToDos);
  span.innerText = `${text}`;
  span.classList.add("toDo");
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function cleanAllToDos(event) {
  toDoList.innerHTML = "";
  toDos = [];
  saveToDos();
}

function paintClean() {
  const cleanBtn = document.createElement("button");
  const cleanTxt = document.createElement("span");
  cleanBtn.innerHTML = "X";
  cleanBtn.classList.add("cleanBtn");
  cleanTxt.innerText = "Clean All";
  cleanTxt.classList.add("cleanTxt");
  cleanBtn.addEventListener("click", cleanAllToDos);
  const div = document.querySelector(".js-cleanList");
  div.appendChild(cleanBtn);
  div.appendChild(cleanTxt);
}

function loadTodos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.text);
    });
  }
  paintClean();
}

function init() {
  loadTodos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
