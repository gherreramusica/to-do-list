// Seleccionar elementos del DOM
let taskList = document.getElementById('taskList');
let taskInput = document.getElementById('taskInput');
let pendingTask = [];
let taskCompleted = [];
let completadas = document.querySelector('.completadas');
let tab = document.querySelectorAll('.tab');
let tabContent = document.querySelectorAll('.tab-content');
let tabTodas = document.querySelector('.todas');

// 🔹 Cargar tareas cuando la página se abra
document.addEventListener('DOMContentLoaded', loadTasks);

// 🔹 Capturar el input cuando se presiona "Enter"
function getInput() {
    taskInput.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter' && taskInput.value !== "") {
            let text = taskInput.value;
            let newTask = await saveTask(text);
            createElement(newTask); // ✅ Ahora usamos el objeto devuelto por la API
            taskInput.value = ''; // Limpiar el input
        }
    });
}

// 🔹 Crear un nuevo elemento de tarea en la UI
function createElement(task) {
    if (pendingTask.some(t => t._id === task._id)) return; // 🔥 Evita duplicados

    let div = document.createElement('div');
    div.classList.add('item');

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');
    checkbox.checked = task.completed;

    let p = document.createElement('p');
    p.textContent = task.text;

    let moreOptionsDiv = document.createElement('div');
    moreOptionsDiv.classList.add('delete-btn');
    moreOptionsDiv.textContent = 'Eliminar';

    taskList.prepend(div);
    div.appendChild(checkbox);
    div.appendChild(p);
    div.appendChild(moreOptionsDiv);

    pendingTask.push(task); // Agregar a la lista de tareas pendientes

    // 🔹 Evento para eliminar la tarea
    moreOptionsDiv.addEventListener('click', async (event) => {
        event.stopPropagation();
        div.remove();
        pendingTask = pendingTask.filter(t => t._id !== task._id);
        await deleteTask(task._id); // ✅ Ahora usamos el ID real
    });

    // 🔹 Evento para completar la tarea
    checkbox.addEventListener('click', async (event) => {
        event.stopPropagation();
        let updatedTask = await updateTask(task._id, checkbox.checked);
        if (updatedTask.completed) {
            moveToCompleted(task, div);
        }
    });
}

// 🔹 Mover tarea a la lista de completadas
function moveToCompleted(task, div) {
    setTimeout(() => {
        pendingTask = pendingTask.filter(t => t._id !== task._id);
        taskCompleted.push(task);

        div.remove();

        let completedDiv = document.createElement('div');
        completedDiv.classList.add('item');

        let completedCheckbox = document.createElement('input');
        completedCheckbox.type = 'checkbox';
        completedCheckbox.checked = true;
        completedCheckbox.classList.add('checkbox', 'changeColor');

        let completedP = document.createElement('p');
        completedP.textContent = task.text;

        completedDiv.appendChild(completedCheckbox);
        completedDiv.appendChild(completedP);
        completadas.prepend(completedDiv);

        completedCheckbox.addEventListener('click', () => {
            moveToPending(task, completedDiv);
        });
    }, 500);
}

// 🔹 Mover tarea de completadas a pendientes
function moveToPending(task, taskElement) {
    setTimeout(() => {
        taskCompleted = taskCompleted.filter(t => t._id !== task._id);
        pendingTask.push(task);

        taskElement.remove();
        createElement(task);
    }, 500);
}

// 🔹 Guardar tarea en la base de datos
async function saveTask(text) {
    try {
        const response = await fetch('http://localhost:3000/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });
        return await response.json();
    } catch (error) {
        console.error('❌ Error saving task:', error);
    }
}

// 🔹 Actualizar tarea en la base de datos
async function updateTask(taskId, completed) {
    try {
        const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed })
        });
        return await response.json();
    } catch (error) {
        console.error('❌ Error updating task:', error);
    }
}

// 🔹 Eliminar tarea de la base de datos
async function deleteTask(taskId) {
    try {
        await fetch(`http://localhost:3000/api/tasks/${taskId}`, { method: 'DELETE' });
        console.log(`✅ Tarea eliminada: ${taskId}`);
    } catch (error) {
        console.error('❌ Error deleting task:', error);
    }
}

// 🔹 Cargar tareas desde la API
async function loadTasks() {
    const response = await fetch('http://localhost:3000/api/tasks');
    const tasks = await response.json();
    taskList.innerHTML = "";
    tasks.forEach(createElement);
}

// 🔹 Iniciar captura de input
getInput();
