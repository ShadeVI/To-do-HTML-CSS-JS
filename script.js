const form = document.querySelector('#form');
const input = document.querySelector('#input');
const todosListEl = document.querySelector('#todos');
/* Results */
const totalValueEl = document.querySelector('#totalTodos');
const totalCompletedEl = document.querySelector('#totalCompleted');
const totalLeftEl = document.querySelector('#totalLeft');

/* Load from LS */
const todos = JSON.parse(localStorage.getItem('todos'));

if(todos) {
    todos.forEach(todo => {
        addToDo(todo);
    })
}

/* Add EventListener to the form */

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addToDo();
})

function addToDo(todo){

    let todoText = input.value;
    
    if(todo) {
        todoText = todo.text;
    }

    const todoEl = document.createElement('li');
    
    if( todo && todo.completed) {
        todoEl.classList.add('completed');
    }

    todoEl.innerText = todoText;

    todoEl.addEventListener('click', () => {
        todoEl.classList.toggle('completed');
        updateLS();
    })

    todoEl.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        todoEl.remove();
        updateLS();
    })

    todosListEl.appendChild(todoEl);
    input.value = '';

    updateLS();
}

function updateResults(todosEls){
    totalValueEl.innerText = todosEls.length;
    let completed = 0;
    let left = 0;
    
    todosEls.forEach(el => {
        el.classList.contains('completed') ? completed++ : left++;
    });
    totalCompletedEl.innerText = completed;
    totalLeftEl.innerText = left;
}

function updateLS(){
    const todosEls = document.querySelectorAll('li');

    const todos = [];

    todosEls.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        });
    });
    
    localStorage.setItem('todos', JSON.stringify(todos));

    updateResults(todosEls);
}