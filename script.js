
const taskInput = document.querySelector('input[name="task-input"]');
const addBtn = document.querySelector('.input-btn');
const taskWrapper = document.querySelector('.task-wrapper');
const filterButtons = document.querySelectorAll('.filter');

let tasks = [];
let currentFilter = 'all';

addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    addTask();
  }
});

// sets filter
filterButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    if (button.classList.contains('filter--pending')) {
      currentFilter = 'pending';
    } else if (button.classList.contains('filter--completed')) {
      currentFilter = 'completed';
    } else {
      currentFilter = 'all';
    }

    renderTasks();
  });
});


function addTask() {

  const text = taskInput.value;

  const newTask = {
    id: Date.now(),
    title: text,
    completed: false
  };

  tasks.push(newTask);
  taskInput.value = '';
  renderTasks();
}


function renderTasks() {
  while (taskWrapper.firstChild) {
    taskWrapper.removeChild(taskWrapper.firstChild);
  }

  let visibleTasks = tasks;

  if (currentFilter === 'pending') {
    visibleTasks = tasks.filter(task => !task.completed);
  }

  if (currentFilter === 'completed') {
    visibleTasks = tasks.filter(task => task.completed);
  }

  visibleTasks.forEach(function (task) {
    const taskElement = createTaskElement(task);
    taskWrapper.appendChild(taskElement);
  });
}

function createTaskElement(task) {
  const item = document.createElement('div');
  item.classList.add('task-item');

  const text = document.createElement('span');
  text.textContent = task.title;
  text.classList.add('task-text');

  if (task.completed) {
    text.classList.add('completed');
  }

  const actions = document.createElement('div');
  actions.classList.add('task-actions');

  const completeBtn = document.createElement('span');
  completeBtn.textContent = '✔';
  completeBtn.classList.add('action-icon');
  completeBtn.addEventListener('click', function () {
    task.completed = !task.completed;
    renderTasks();
  });

  const editBtn = document.createElement('span');
  editBtn.textContent = '✏️';
  editBtn.classList.add('action-icon');
  editBtn.addEventListener('click', function () {
    const updatedText = prompt('Edit task:', task.title);

    if (updatedText === null) return;
    if (updatedText.trim() === '') return;

    task.title = updatedText.trim();
    renderTasks();
  });

  const deleteBtn = document.createElement('span');
  deleteBtn.textContent = '❌';
  deleteBtn.classList.add('action-icon');
  deleteBtn.addEventListener('click', function () {
    tasks = tasks.filter(t => t.id !== task.id);
    renderTasks();
  });

  actions.appendChild(completeBtn);
  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  item.appendChild(text);
  item.appendChild(actions);

  return item;
}
