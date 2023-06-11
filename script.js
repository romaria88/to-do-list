window.addEventListener("load", function () {
  tasks.forEach((item) => (item.state = "show"));
  Task.showTask();
});

let tasks = [];

const getTasks = localStorage.getItem("tasks");
if (getTasks) tasks = JSON.parse(getTasks);
console.log(tasks);

const input = document.querySelector(".create-task");

const createBtn = document.querySelector(".create");

const searchBtn = document.querySelector(".search");

const refreshBtn = document.querySelector(".refresh");

const clearAllBtn = document.querySelector(".clear-all");

class Task {
  static showTask() {
    const tasks_container = document.querySelector(".tasks");
    let _tasks = "";

    tasks.forEach((task) => {
      _tasks += `
      <li class="task ${task.state === "show" ? "" : "display-none"}">
          <div class="task-name">
          <p class="${task.completed === "true" ? "line-through" : "text"}">${
        task.name
      }</p> 
      </div>
          <button class="done" onclick="Task.completed('${
            task.id
          }')"><i class="fa-solid fa-circle-check"></i></button>
          <button class="edit" onclick="Task.edit('${
            task.id
          }')"><i class="fa-solid fa-pen-to-square"></i></button>
          <button class="remove" onclick="Task.remove('${
            task.id
          }')"><i class="fa-solid fa-trash"></i></button>
      </li>  
      `;
    });

    tasks.length === 0 || _tasks === ""
      ? clearAllBtn.classList.add("display-none")
      : clearAllBtn.classList.remove("display-none");

    tasks_container.innerHTML = _tasks;

    localStorage.setItem("tasks", JSON.stringify(tasks));

    console.log(tasks);
  }

  static create(task) {
    const generateRandomId = Math.floor(Math.random() * 99);

    tasks.push({
      id: generateRandomId,
      name: task,
      completed: "false",
      state: "show",
    });

    this.showTask();
  }

  static search(task) {
    tasks = tasks.filter((item) =>
      item.name.toLowerCase() === task
        ? (item.state = "show")
        : (item.state = "hide")
    );

    const checkTask = (elem) =>
      elem.name.toLowerCase() === `${task.toString()}`;

    if (tasks.some(checkTask) === false) {
      showError();
      // ERROR
      return clearAllBtn.classList.add("display-none");
    } else clearAllBtn.classList.remove("display-none");

    Task.showTask();
  }

  static completed(task) {
    tasks.forEach((item) => {
      if (`${item.id}` === task) {
        if (item.completed === "false") {
          item.completed = "true";
        } else {
          item.completed = "false";
        }
      }
    });
    Task.showTask();
  }

  static edit(task) {
    const editTasks = document.querySelectorAll(".task");
    const editTaskText = document.querySelectorAll(".task-name");

    tasks.forEach((item, index) => {
      if (`${item.id}` === task) {
        editTasks[index].classList.add("change");
        editTaskText[index].innerHTML = `
        <input type="text" value="${item.name}" class="edit-task">
        <button type="button" class="edit-btn">Edit task</button>   
        `;
      }

      // !!!!!!!!!!!!!!!!!!!!!!!!!!

      const editInputs = document.querySelectorAll(".edit-task");
      const editBtn = document.querySelector(".edit-btn");

      if (editInputs) {
        editInputs.forEach((input) => {
          input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
              if (input.value === "") alert("Пустая строка!!!");

              editBtn.addEventListener("click", () => {
                let inputValue = input.value;

                if (inputValue) this.edit(task, inputValue);
              });

              editBtn.click();
            }
          });
        });
      }
    });
  }

  static remove(task) {
    tasks = tasks.filter((item) => `${item.id}` !== task);
    Task.showTask();
  }

  static clearAll() {
    tasks = [];
    Task.showTask();
  }
}
createBtn.addEventListener("click", () => {
  const inputValue = input.value;
  if (inputValue !== "") {
    input.value = "";
    Task.create(inputValue);
    input.style.border = "1px solid black";
  } else {
    console.log("Error");

    // ERROR
  }
});

searchBtn.addEventListener("click", (e) => {
  let searchValue = input.value;

  if (searchValue !== "") {
    input.style.border = "1px solid blue";
    // input.value = ''
    Task.search(searchValue);
  } else {
    input.style.border = "1px solid red";

    // Error
  }
});

input.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") searchBtn.click();

  if (e.key === "Enter") createBtn.click();
});

clearAllBtn.addEventListener("click", () => {
  Task.clearAll();
});

const form = document.querySelector(".form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

refreshBtn.addEventListener("click", () => {
  location.href = location.href;
});

const theme = document.querySelector(".theme");
const body = document.querySelector("body");




const switchTheme = () => {
  if (body.classList.contains('light')) {
    body.classList.remove('light')
    body.classList.add('dark')


  } else {
    
    body.classList.remove('dark')
    body.classList.add('light')
    
  }
};

theme.addEventListener("click", switchTheme);
