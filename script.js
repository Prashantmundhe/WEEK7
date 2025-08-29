document.getElementById('task-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const input = document.getElementById('task-input');
  const taskText = input.value.trim();
  if (taskText !== '') {
    addTask(taskText);
    input.value = '';
  }
});

function addTask(text) {
  const li = document.createElement('li');
  li.className = 'task-item';
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'complete-checkbox';

  const span = document.createElement('span');
  span.className = 'task-text';
  span.textContent = text;

  const deleteBtn = document.createElement('button');
  deleteBtn.type = 'button';
  deleteBtn.className = 'delete-btn';
  deleteBtn.setAttribute('aria-label', 'Delete task');
  deleteBtn.textContent = '×';

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  document.getElementById('task-list').appendChild(li);
}

document.getElementById('task-list').addEventListener('change', function (e) {
  if (e.target.classList.contains('complete-checkbox')) {
    const taskText = e.target.nextElementSibling;
    const li = e.target.closest('li');
    if (e.target.checked) {
      taskText.classList.add('completed');
      if (li) li.classList.add('done');
    } else {
      taskText.classList.remove('completed');
      if (li) li.classList.remove('done');
    }
  }
});

document.getElementById('task-list').addEventListener('click', function (e) {
  if (e.target.classList.contains('delete-btn')) {
    const li = e.target.closest('li');
    if (!li) return;
    li.classList.add('removing');
    const handleAnimationEnd = function () {
      li.removeEventListener('animationend', handleAnimationEnd);
      if (li.parentElement) {
        li.parentElement.removeChild(li);
      }
    };
    li.addEventListener('animationend', handleAnimationEnd);
  }
});