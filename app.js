// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Events Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// Functions

function getTodos() {
    let todos = checkStorage();
    todos.forEach(function (todo) {
        loadTodos(todo);
    });
}

function addTodo(event) 
{
    event.preventDefault();

    loadTodos(todoInput.value);

    // add todo to localstorage 
    saveTodos(todoInput.value);

    // clear input value after append
    todoInput.value = "";
}

function filterTodo(e)
{
    const todos = todoList.childNodes;
    // catch the value of <option> and check if exists classes to show
    todos.forEach(function(todo) {
        switch(e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                // if exists completeds todos
                if(todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
    
}

function saveTodos(todo) 
{
    let todos = checkStorage();

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));

    console.log('entrei no storage');
}

function deleteCheck(e) {
    const item = e.target;
    const todo = item.parentElement;

    // delete todo 
    if (item.classList[0] === 'delete-btn') {
        // before delete, add class to animate this
        todo.classList.add('fall');
        //remove from storage
        deleteStorageTodos(todo);
        // wait the animation finish to delete
        todo.addEventListener('transitionend', function () {
            todo.remove();
        });
    }

    // complete todo
    else if (item.classList[0] === 'complete-btn') {
        todo.classList.toggle('completed');
    }
}

function deleteStorageTodos(todo)
{
    let todos = checkStorage();
    // getting text of todo
    const todoIndex = todo.children[0].innerText;

    // find the clicked todo and delete from array
    todos.splice(todos.indexOf(todoIndex), 1);

    // resend the array to storage
    localStorage.setItem('todos', JSON.stringify(todos));
}

// core methods
function loadTodos(value)
{
    // create div todo
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // create <li>
    const newTodo = document.createElement('li');
    newTodo.innerText = value;
    newTodo.classList.add('todo-item');

    // add li tag inside div
    todoDiv.appendChild(newTodo);

    // create check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');

    // add complete mark into div
    todoDiv.appendChild(completedButton);

    // create delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('delete-btn');

    // add delete button into div
    todoDiv.appendChild(deleteButton);

    // and finally, append the div to list
    todoList.appendChild(todoDiv);
}

function checkStorage()
{
    // check if already have todo in there
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    return todos;
}