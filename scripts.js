function addTask() {
  const taskInput = document.getElementById("task");
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    return;
  }

  const taskList = document.getElementById("task-list");
  const li = document.createElement("li");
  li.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-button" onclick="deleteTask(this)">Delete</button>
    `;
  taskList.appendChild(li);
  saveTasksToLocalStorage(taskList);
  taskInput.value = "";
}
function deleteTask(button) {
  const taskList = document.getElementById("task-list");
  const li = button.parentElement;
  taskList.removeChild(li);

  saveTasksToLocalStorage(taskList);
}
function saveTasksToLocalStorage(taskList) {
  const tasks = [];
  const taskItems = taskList.querySelectorAll("li");

  taskItems.forEach((item) => {
    const taskText = item.querySelector("span").textContent;
    tasks.push(taskText);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  const taskList = document.getElementById("task-list");
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((taskText) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <span>${taskText}</span>
            <button class="delete-button" onclick="deleteTask(this)">Delete</button>
        `;
    taskList.appendChild(li);
  });
}

loadTasksFromLocalStorage();
