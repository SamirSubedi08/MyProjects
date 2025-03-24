let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    const filteredTasks = getFilteredTasks();
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;
        li.className = task.completed ? 'completed' : '';

        li.onclick = () => toggleTaskCompletion(task.id);
        li.ondblclick = () => deleteTask(task.id);

        taskList.appendChild(li);
    });
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if (!text) {
        alert('Please enter a task');
        return;
    }

    const newTask = {
        id: Date.now(),  // Unique identifier
        text,
        completed: false
    };

    tasks.push(newTask);
    taskInput.value = '';

    saveTasks();
    renderTasks();
}

function toggleTaskCompletion(taskId) {
    tasks = tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    saveTasks();
    renderTasks();
}

function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks = tasks.filter(task => task.id !== taskId);
        saveTasks();
        renderTasks();
    }
}

function filterTasks(filter) {
    currentFilter = filter;
    renderTasks();
}

function getFilteredTasks() {
    switch (currentFilter) {
        case 'completed':
            return tasks.filter(task => task.completed);
        case 'pending':
            return tasks.filter(task => !task.completed);
        default:
            return tasks;
    }
}

// Initial render
renderTasks();
