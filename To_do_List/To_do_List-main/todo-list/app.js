document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() !== '') {
        const task = {
            id: new Date().getTime(),
            text: taskInput.value,
            completed: false,
        };

        const li = document.createElement('li');
        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        taskText.setAttribute('data-id', task.id);

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.addEventListener('click', () => completeTask(task.id));

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => removeTask(task.id));

        li.appendChild(taskText);
        li.appendChild(completeButton);
        li.appendChild(removeButton);

        taskList.appendChild(li);
        saveTask(task);

        taskInput.value = '';
    }
}

function completeTask(taskId) {
    const taskList = document.getElementById('taskList');
    const task = document.querySelector(`li span[data-id="${taskId}"]`);

    if (task) {
        task.classList.toggle('completed');
        updateTaskStatus(taskId);
    }
}

function removeTask(taskId) {
    const taskList = document.getElementById('taskList');
    const task = document.querySelector(`li span[data-id="${taskId}"]`);

    if (task) {
        const li = task.parentElement;
        li.remove();
        deleteTask(taskId);
    }
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const taskList = document.getElementById('taskList');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => {
        const li = document.createElement('li');
        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        taskText.setAttribute('data-id', task.id);

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.addEventListener('click', () => completeTask(task.id));

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => removeTask(task.id));

        li.appendChild(taskText);
        li.appendChild(completeButton);
        li.appendChild(removeButton);

        if (task.completed) {
            taskText.classList.add('completed');
        }

        taskList.appendChild(li);
    });
}

function updateTaskStatus(taskId) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.findIndex(task => task.id == taskId);

    if (taskIndex !== -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function deleteTask(taskId) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
