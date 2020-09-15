import HTMLRender from "./render-html.js";

let todos = [];
const main = document.getElementById("body");

const container = new HTMLRender({
    tag: "div",
    class: "container"
}).createElement();
main.appendChild(container);

const todoTitle = new HTMLRender({
    tag: 'h1',
    class: 'title',
    text: 'Todo List'
}).createElement();
container.appendChild(todoTitle)

const form = new HTMLRender({
    tag: 'form',
    class: 'form',
    action: '#',
}).createElement();
container.appendChild(form)

const addInput = new HTMLRender({
    tag: 'input',
    class: 'input form__input'
}).createElement();
form.appendChild(addInput)

const addButton = new HTMLRender({
    tag: 'button',
    class: 'button',
    text: 'ADD',
    type: 'submit'
}).createElement();
form.appendChild(addButton)

const todoList = new HTMLRender({
    tag: 'ul',
    class: 'todo-list'
}).createElement();
container.appendChild(todoList)

function renderTodos(todo) {
    todoList.innerHTML = '';

    todos.forEach(function (point) {

        const list = new HTMLRender({
            tag: 'li',
            class: 'todo-list__item',
            dataKey: point.id,
        }).createElement();
        todoList.appendChild(list);

        const checkBox = new HTMLRender({
            tag: 'input',
            class: 'checkbox todo-list__checkbox',
            type: 'checkbox',
            checked: point.completed
        }).createElement();
        list.appendChild(checkBox);

        const item = new HTMLRender({
            tag: 'input',
            class: 'input todo-list__input',
            type: 'text',
            value: point.name,
            readonly: true,
        }).createElement();
        list.appendChild(item);

        const saveButton = new HTMLRender({
            tag: 'button',
            class: 'button todo-list__save-button',
            text: 'save'
        }).createElement();

        const editButton = new HTMLRender({
            tag: 'button',
            class: 'button todo-list__edit-button',
            text: 'edit'
        }).createElement();
        list.appendChild(editButton);

        const deleteButton = new HTMLRender({
            tag: 'button',
            class: 'button todo-list__delete-button',
            text: 'X'
        }).createElement();
        list.appendChild(deleteButton);

        editButton.addEventListener('click', function () {
            list.appendChild(saveButton);
            this.style.backgroundColor = '#FF6666';
        });
    });
}

function addTodo(task) {
    if (task !== '') {
        const todo = {
            id: Date.now(),
            name: task,
            completed: false
        };

        todos.push(todo);
        addToLocalStorage(todos);
        addInput.value = ''
    }
}

form.addEventListener('submit', function (event) {
    event.preventDefault();
    addTodo(addInput.value)
});

function toggleCheckbox(id) {
    todos.forEach(function (item) {
        if (item.id == id) {
            item.completed = !item.completed;
        }
    });
    addToLocalStorage(todos);
}

function deleteTodo(id) {
    todos = todos.filter(function (item) {
        return item.id != id;
    });
    addToLocalStorage(todos);
}

function editTask(id, input) {
    return todos.filter(function (item) {
        if (item.id == id) {
            input.removeAttribute('readonly')

            input.addEventListener('change', function (e) {
                item.name = e.target.value
            });
        }
    });
}

function saveEditTask() {
    addToLocalStorage(todos);
}

function addToLocalStorage(todos) {
    localStorage.setItem('items', JSON.stringify(todos));
    renderTodos(todos);
}

function getFromLocalStorage() {
    const reference = localStorage.getItem('items');

    if (reference) {
        todos = JSON.parse(reference);
        renderTodos(todos);
    }
}

getFromLocalStorage();

todoList.addEventListener('click', function (e) {
    const DATA_KEY = e.target.parentElement.getAttribute('data-key')

    if (e.target.type === 'checkbox') {
        toggleCheckbox(DATA_KEY);
    }

    if (e.target.classList.contains('todo-list__edit-button')) {
        editTask(DATA_KEY, e.target.parentNode.querySelector('input[type=text]'));
    }

    if (e.target.classList.contains('todo-list__save-button')) {
        saveEditTask();
    }

    if (e.target.classList.contains('todo-list__delete-button')) {
        deleteTodo(DATA_KEY);
    }
});