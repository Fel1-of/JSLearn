'use strict';

let todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelectorAll('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

let todoData = [''];
localStorage.setItem('todoData', JSON.stringify(todoData));
const render = function () {
    todoList.textContent = '';
    todoCompleted.textContent = '';
    todoData=JSON.parse(localStorage.getItem('todoData'));
    if(todoData.length>0){
        for (let item = 1; item < todoData.length; item++) {
            let dataItem = todoData[item];

            let li = document.createElement('li');
            if (dataItem.value.trim() !== '') {
                li.classList.add('todo-item');
                li.innerHTML = `<span class="text-todo">${dataItem.value}</span>
                    <div class="todo-buttons">
                    <button class="todo-remove"></button>
                    <button class="todo-complete"></button>
                    </div>`;

                if (dataItem.completed) {
                    todoCompleted.append(li);
                } else {
                    todoList.append(li);
                }

                const todoComplete = li.querySelector('.todo-complete');
                todoComplete.addEventListener('click', function() {
                    dataItem.completed = !dataItem.completed;
                    localStorage.setItem('todoData', JSON.stringify(todoData));
                    render();
                });
                const todoRemove = li.querySelector('.todo-remove');
                todoRemove.addEventListener('click', function() {
                    todoData.splice(item, 1);
                    localStorage.setItem('todoData', JSON.stringify(todoData));
                    render();
                });
            }
        }
    }
};

todoControl.addEventListener('submit', function (event) {
    event.preventDefault();
    headerInput = document.querySelector('.header-input');

    const newTodo = {
        value: headerInput.value,
        completed: false,
    };
    todoData.push(newTodo);
    headerInput.value = '';
    localStorage.setItem('todoData', JSON.stringify(todoData));
    render();
});

render();