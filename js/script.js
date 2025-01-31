
let taskList = document.getElementById('taskList');
let taskInput = document.getElementById('taskInput');
let pendingTask = [];
let taskCompleted = [];
let completadas = document.querySelector('.completadas');
let tab = document.querySelectorAll('.tab');
let tabContent = document.querySelectorAll('.tab-content');
let tabTodas = document.querySelector('.todas');
// Llamar a `loadTasks` cuando la página cargue
document.addEventListener('DOMContentLoaded', loadTasks);
function getInput(){
    taskInput.addEventListener('keydown', (e) => {
        if(e.key === 'Enter' && taskInput.value !== ""){
            let task = taskInput.value;
            createElement(task);
            taskInput.value = '';
        }
    })
}
function createElement(task) {
    // Crea el contenedor del elemento
    let div = document.createElement('div');
    div.classList.add('item');
    // Crea el checkbox
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');
    // Crea el párrafo
    let p = document.createElement('p');
    p.textContent = task;
    // Agrega elementos al contenedor
    div.appendChild(checkbox);
    div.appendChild(p);
    // Agrega el contenedor a la lista de tareas pendientes
    taskList.appendChild(div);
    // Agrega la tarea a la lista de pendientes
    pendingTask.push(task);
    console.log(pendingTask);
    saveTask(task);
    // Crear botón de eliminar
    let moreOptionsDiv = document.createElement('div');
    moreOptionsDiv.classList.add('delete-btn');
    moreOptionsDiv.textContent = 'Eliminar';
    moreOptionsDiv.style.display = 'none'; // Inicialmente oculto
    // Agregar el botón dentro del div de la tarea
    taskList.appendChild(moreOptionsDiv);
    // Evento para mostrar/ocultar el botón de eliminar al hacer clic en la tarea
    div.addEventListener('click', () => {
        moreOptionsDiv.style.display = moreOptionsDiv.style.display === 'none' ? 'block' : 'none';
    });
    // Evento para eliminar la tarea al hacer clic en el botón de eliminar
    moreOptionsDiv.addEventListener('click', (event) => {
        event.stopPropagation(); // Evita que el evento de `click` en `div` se active también
        div.remove(); // Elimina la tarea del DOM
        moreOptionsDiv.style.display='none';
        // Remover del `localStorage`
        let tasks = JSON.parse(localStorage.getItem('Tareas')) || [];
        tasks = tasks.filter(t => t !== task);
        localStorage.setItem('Tareas', JSON.stringify(tasks));
    });
    // Listener para manejar cuando se complete una tarea
    checkbox.addEventListener('click', (event) => {
       event.stopPropagation();
        let taskIndexPending = pendingTask.indexOf(task);
        let taskIndexCompleted = taskCompleted.indexOf(task);
        if (taskIndexPending !== -1) { 
            // Si la tarea está en `pendingTask` y se marca como completada
            if (checkbox.checked) {
                checkbox.classList.add('changeColor');
                p.classList.add('checked');
                moreOptionsDiv.remove();
                moveToCompleted(task, div);  
            }
        } else if (taskIndexCompleted !== -1) { 
            // Si la tarea está en `taskCompleted` y se desmarca para volver a pendientes
            if (!checkbox.checked) {
                checkbox.classList.remove('changeColor');
                p.classList.remove('checked');
                moreOptionsDiv.remove();
                moveToPending(task, div); 
            }
        }
    });
}
function moveToCompleted(task, div) {
    // Mueve el elemento a la lista de completadas después de 500ms
    setTimeout(() => {
        // Elimina la tarea de pendientes
        const taskIndex = pendingTask.indexOf(task);
        if (taskIndex !== -1) {
            pendingTask.splice(taskIndex, 1);
        }      
        // Agrega la tarea a completadas
        taskCompleted.push(task);
        console.log(taskCompleted);
        // Remueve el div de la lista de pendientes
        div.remove();
        // Crea un nuevo elemento para completadas
        let completedDiv = document.createElement('div');
        completedDiv.classList.add('item');      
        let completedCheckbox = document.createElement('input');
        completedCheckbox.type = 'checkbox';
        completedCheckbox.checked = true;
        completedCheckbox.classList.add('checkbox', 'changeColor');
        let completedP = document.createElement('p');
        completedP.textContent = task;
        completedDiv.appendChild(completedCheckbox);
        completedDiv.appendChild(completedP);
        completadas.appendChild(completedDiv);
        completedCheckbox.addEventListener('click', () => {
                completedCheckbox.classList.toggle('changeColor');
                completedP.classList.toggle('checked');
                moveToPending(task, completedDiv);
        })
    }, 500);
}
function moveToPending(task, taskElement){
    setTimeout(() => {
        // Elimina la tarea de completadas
        const taskIndex = taskCompleted.indexOf(task);
        if (taskIndex !== -1) {
            taskCompleted.splice(taskIndex, 1);
        }
        // Agrega la tarea nuevamente a la lista de pendientes
        pendingTask.push(task);
        // Remueve la tarea de la lista de completadas
        taskElement.remove();
        // Crea un nuevo elemento en la lista de pendientes
        createElement(task);
    }, 500);
}
function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('Tareas')) || [];
    // Evitar duplicados en `localStorage`
    if (!tasks.includes(task)) {
        tasks.push(task);
        localStorage.setItem('Tareas', JSON.stringify(tasks));
    }
}
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('Tareas')) || []; 
    // Verificar si la tarea ya está en el DOM antes de agregarla
    let existingTasks = [...document.querySelectorAll('.item p')].map(p => p.textContent);
    tasks.forEach(task => {
        if (!existingTasks.includes(task)) {
            createElement(task);
        }
    });
}
getInput();
taskInput.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' && completadas.classList.contains('active')){ //das click, se deteca el enter y si es que tab completadas esta con la clase activo.
        tab.forEach((item) => item.classList.remove('active')); //se remueve la clase de tab completadas y se agrega la clase a tab todas
        tabContent.forEach(content => content.classList.remove('active'));    //limpiar clase active en tabcontent.
        tabTodas.classList.add('active');//agregar clase active a tab todas.
        taskList.classList.add('active');// agrgar clase activa al tab content de tasklist
    }
})


