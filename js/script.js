'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

let todoData = [];

if(localStorage.getItem('todo')) {
    todoData = JSON.parse(localStorage.getItem('todo'));
}    

const render = function() {
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function(item) {
        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' + 
            '<div class="todo-buttons">' +
                '<button class="todo-remove"></button>' + 
                '<button class="todo-complete"></button>' +
            '</div>';

        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        const btnTodoCompleted = li.querySelector('.todo-complete');
        
        btnTodoCompleted.addEventListener('click', function() {
            item.completed = !item.completed;
            render();
        });

        const list = li.querySelector('.todo-remove');
        list.addEventListener('click', function(){
            li.remove('.todo-item');
        });

    });
   
};


todoControl.addEventListener('submit', function(event){
    event.preventDefault();
    const newTodo = {
        value: headerInput.value,
        completed: false
    };

    if (headerInput.value === '') {
        return alert('Введите что-то');  
    }
    else {
        todoData.push(newTodo);
    }
    headerInput.value = '';

    localStorage.setItem('todo', JSON.stringify(todoData));
    render(); 

});



render();