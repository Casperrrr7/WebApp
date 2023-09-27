document.addEventListener('DOMContentLoaded', function () {
    const taskList = document.getElementById('taskList');
    const newTaskInput = document.getElementById('newTask');
    const addTaskButton = document.getElementById('addTask');

    // Check if the browser supports service workers
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(function (registration) {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(function (error) {
                console.error('Service Worker registration failed:', error);
            });
    }

    // Load tasks from local storage
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
        taskList.innerHTML = '';
        savedTasks.forEach(function (task, index) {
            const listItem = document.createElement('li');
            listItem.textContent = task;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';

            // Add a space before the "Remove" button text
            listItem.appendChild(document.createTextNode(' '));
            listItem.appendChild(removeButton);

            removeButton.addEventListener('click', function () {
                savedTasks.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(savedTasks));
                renderTasks();
            });

            taskList.appendChild(listItem);
        });
    }

    renderTasks();

    addTaskButton.addEventListener('click', function () {
        const newTask = newTaskInput.value.trim();
        if (newTask) {
            savedTasks.push(newTask);
            localStorage.setItem('tasks', JSON.stringify(savedTasks));
            renderTasks();
            newTaskInput.value = '';
        }
    });
});
