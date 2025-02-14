function addTodo() {
    let todoName = document.getElementById('todoName').value;
    let todoContent = document.getElementById('todoContent').value;
    if (todoName && todoContent) {
        let li = document.createElement('li');
        let span = document.createElement('span');
        span.textContent = `${todoName} : ${todoContent}`;
        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = '🗑';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = function () { li.remove(); };
        li.appendChild(span);
        li.appendChild(deleteBtn);
        document.getElementById('todoList').appendChild(li);
        document.getElementById('todoName').value = '';
        document.getElementById('todoContent').value = '';
    }
}