const taskList = JSON.parse(localStorage.getItem('tasks') || '[]')

const elementsHTML = {
    input: document.querySelector('#taskInput'),
    buttonADD: document.querySelector('.addBtn'),
    buttonAllTask: document.querySelector('.total-delete__all'),
    tasksContainer: document.querySelector('.tasks-container'),
    taskCounter: document.querySelector('.total-delete__counter')
}

function createNewTask() {
    const taskValue = elementsHTML.input.value
    if(!taskValue) return 
    const newTask = {
        id: Date.now(),
        taskName: taskValue,
        done: false,
        date: new Date().toLocaleDateString(),
    }
    taskList.push(newTask)
    renderList()
    renderCounter()
    saveElementToLocalStorage()
}

function deleteAllTask() {
    taskList.length = 0
    renderCounter()
    renderList()
    saveElementToLocalStorage()
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
                    <input type="checkbox" class="checkBox" ${task.done ? 'checked' : ''}>
                    <span class="taskText ${task.done ? 'completed' : ''}">${task.taskName}</span>
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

function deleteNeedTask(id) {
    const element = document.getElementById(id)
    element.classList.add('fall')

    element.addEventListener('transitionend', function () {
        const index = taskList.findIndex(task => task.id === id)
        if (index !== -1) {
            taskList.splice(index, 1)
        }

        renderList()
        renderCounter()
        saveElementToLocalStorage()
    }, { once: true })

    // const index = taskList.findIndex(task => task.id === id)
    // if(index !== -1) {
    //     taskList.splice(index, 1)
    // }
    // renderList()
    // renderCounter()
    // saveElementToLocalStorage()
}

function toggleTaskStatus(id) {
    const task = taskList.find(task => task.id === id)
    if(task) {
        task.done = !task.done
    }
    renderList()
    saveElementToLocalStorage()
}

function saveElementToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(taskList))
}

elementsHTML.buttonAllTask.addEventListener('click', deleteAllTask)
elementsHTML.buttonADD.addEventListener('click', createNewTask)
elementsHTML.tasksContainer.addEventListener('click', (e) => {
    const deleteBtn = e.target.closest('.delete-btn')
    if(!deleteBtn) return
    const taskId = deleteBtn.closest('.task').id
    deleteNeedTask(Number(taskId))
})

elementsHTML.tasksContainer.addEventListener('click', (e) => {
    const checkBtn = e.target.closest('.checkBox')
    if(!checkBtn) return
    const taskId = checkBtn.closest('.task').id
    toggleTaskStatus(Number(taskId))
})

renderList()
renderCounter()