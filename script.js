
let taskList = document.getElementById('taskList');
let taskInput = document.getElementById('taskInput');

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

function createElement(task){
    //CREATES ELEMENTOS
    let div = document.createElement('div');
    let checkbox = document.createElement('input');
    let p = document.createElement('p');
    checkbox.type = 'checkbox';
    


    //AGREGAR ELEMENTOS AL DOM
    taskList.appendChild(div);
    div.appendChild(checkbox);
    checkbox.classList.add('checkbox');
    div.appendChild(p);
    div.classList.add('item');
    p.textContent = task;

    checkbox.addEventListener('click', () => {
        checkbox.classList.toggle('changeColor');
        p.classList.toggle('checked');
         // Esconde el div después de 2 segundos
    setTimeout(() => {
        div.style.display = 'none';
    }, 1000);
        
    })

    

    
}

getInput();