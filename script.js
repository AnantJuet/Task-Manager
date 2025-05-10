document.getElementById('addTaskBtn').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput');
    const timeInput = document.getElementById('timeInput');
    const taskValue = taskInput.value.trim();
    const timeValue = parseInt(timeInput.value);

    if (taskValue && timeValue > 0) {
        addTask(taskValue, timeValue);
        taskInput.value = ''; // Clear input field
        timeInput.value = ''; // Clear time input
    }
});

function addTask(task, time) {
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');

    li.textContent = task + ' (Time: ' + time + ' mins)';
    li.addEventListener('click', function() {
        li.classList.toggle('completed');
    });

    const timerDisplay = document.createElement('span');
    timerDisplay.className = 'timer';
    li.appendChild(timerDisplay);

    let timerValue = time * 60; // Convert minutes to seconds
    const timerInterval = setInterval(() => {
        if (timerValue <= 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = 'Time is up!';
            li.style.color = '#e74c3c'; // Change color to indicate time's up
        } else {
            timerDisplay.textContent = `Timer: ${Math.floor(timerValue / 60)}m ${timerValue % 60}s`;
            timerValue--;
        }
    }, 1000);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'deleteBtn';
    deleteBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent triggering the li click event
        clearInterval(timerInterval); // Clear the timer
        taskList.removeChild(li);
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}
