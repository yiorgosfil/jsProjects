const taskForm = document.getElementById('task-form')
const confirmCloseDialog = document.getElementById('confirm-close-dialog')
const openTaskFormBtn = document.getElementById('open-task-form-btn')
const closeTaskFormBtn = document.getElementById('close-task-form-btn')
const addOrUpdateTaskBtn = document.getElementById('add-or-update-task-btn')
const cancelBtn = document.getElementById('cancel-btn')
const discardBtn = document.getElementById('discard-btn')
const tasksContainer = document.getElementById('tasks-container')
const titleInput = document.getElementById('title-input')
const dateInput = document.getElementById('date-input')
const descriptionInput = document.getElementById('description-input')

// taskData holds all the tasks objects
const taskData = JSON.parse(localStorage.getItem('data')) || []

// The current task to be created or modified
let currentTask = {}

// TASKS Functions
function addOrUpdateTask() {
  addOrUpdateTaskBtn.innerText = 'Add Task'
  const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id)
  const taskObj = {
    id: `${titleInput.value.toLowerCase().split(' ').join('_')}-${Date.now()}`,
    title: titleInput.value,
    date: dateInput.value,
    description: descriptionInput.value
  }

  if (dataArrIndex === -1) {
    taskData.unshift(taskObj)
  } else {
    taskData[dataArrIndex] = taskObj
  }

  localStorage.setItem('data', JSON.stringify(taskData))
  updateTaskContainer()
  reset()
}

function deleteTask(buttonEl) {
  const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  )  

  buttonEl.parentElement.remove()
  taskData.splice(dataArrIndex, 1)
  localStorage.setItem('data', JSON.stringify(taskData))
}

function editTask(buttonEl) {
  const dataArrIndex = task.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  )

  currentTask = taskData[dataArrIndex]

  titleInput.value = currentTask.title
  dateInput.value = currentTask.date
  descriptionInput.value = currentTask.description

  addOrUpdateTaskBtn.innerText = 'Update Task'

  taskForm.classList.toggle('hidden')
}

// UTILITY Funnctions //
function updateTaskContainer() {
  tasksContainer.innerHTML = ''

  taskData.forEach(
    ({ id, title, date, description }) => {
      (tasksContainer.innerHTML += `
        <div class="task" id="${id}">
          <p><strong>Title:</strong> ${title}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Description:</strong> ${description}</p>
          <button onclick="editTask(this)" type="button" class="btn">Edit</button>
          <button onclick="deleteTask(this)" type="button" class="btn">Delete</button>
        </div>
      `)
    }
  )
}

function reset() { // Resets the form input values
  titleInput.value = ''
  dateInput.value = ''
  descriptionInput.value = ''
  taskForm.classList.toggle('hidden')
  currentTask = {}
}

// Show the tasks on the UI
if (taskData.length) {
  updateTaskContainer()
}

// Event listeners
openTaskFormBtn.addEventListener('click', () => {
  taskForm.classList.toggle('hidden')
})

closeTaskFormBtn.addEventListener('click', () => {
  const formInputsContainValues = titleInput.value || dateInput.value || descriptionInput.value
  const formInputValuesUpdated = titleInput.value !== currentTask.title || dateInput.value !== currentTask.date || descriptionInput.value || currentTask.description

  if (formInputsContainValues && formInputValuesUpdated) {
    confirmCloseDialog.showModal()
  } else {
    reset()
  }
})

cancelBtn.addEventListener('click', () => confirmCloseDialog.close())

discardBtn.addEventListener('click', () => {
  confirmCloseDialog.close()
  reset()
})

taskForm.addEventListener('submit', (e) => {
  e.preventDefault()
  addOrUpdateTask()
})
