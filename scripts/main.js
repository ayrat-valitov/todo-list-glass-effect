const taskList = []

const elementsHTML = {
    input: document.querySelector('#taskInput'),
    buttonADD: document.querySelector('.addBtn'),
    tasksContainer: document.querySelector('.tasks-container'),
    taskCounter: document.querySelector('.total-delete__counter')
}

function createNewTask() {
    const taskValue = elementsHTML.input.value
    const newTask = {
        id: Date.now(),
        taskName: taskValue,
        done: false,
        date: new Date().toLocaleDateString(),
    }
    taskList.push(newTask)
    renderList()
    renderCounter()
}

function renderCounter() {
    elementsHTML.taskCounter.innerHTML = taskList.length
}

function renderList() {
    elementsHTML.input.value = '';
    elementsHTML.tasksContainer.innerHTML = '';
    taskList.forEach((task) => {
        const taskHTML = `
            <li class="task" id="${task.id}">
                <div class="left-place">
                    <input type="checkbox">
                    <span>${task.taskName}</span>
                </div>
                <div class="right-place">
                    <button aria-label="Edit task">
                        <img src="./images/description_btn.svg" alt="">
                    </button>
                    <button aria-label="Delete task" class="delete-btn">
                        <img src="./images/clear_btn.svg" alt="" class="">
                    </button>
                </div>
            </li>
        `;
        elementsHTML.tasksContainer.insertAdjacentHTML('beforeend', taskHTML)
    })
}

elementsHTML.buttonADD.addEventListener('click', createNewTask)