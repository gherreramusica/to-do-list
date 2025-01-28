
let taskList = document.getElementById('taskList');
let taskInput = document.getElementById('taskInput');
let pendingTask = [];
let taskCompleted = [];
let completadas = document.querySelector('.completadas');


function getInput(){
    taskInput.addEventListener('keydown', (e) => {
        if(e.key === 'Enter' && taskInput.value !== ""){
            let task = taskInput.value;

            console.log(task);
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

    // Listener para manejar cuando se complete una tarea
    checkbox.addEventListener('click', () => {
        checkbox.classList.toggle('changeColor');
        p.classList.toggle('checked');
        
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
            completedCheckbox.classList.add('checkbox');

            let completedP = document.createElement('p');
            completedP.textContent = task;

            completedDiv.appendChild(completedCheckbox);
            completedDiv.appendChild(completedP);

            completadas.appendChild(completedDiv);
        }, 500);
    });
}

getInput();