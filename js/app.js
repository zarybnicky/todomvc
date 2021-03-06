(function mainFn() {
  const database = [];
  const main = document.querySelector('.main');
  const footer = document.querySelector('.footer');
  footer.classList.add('hidden');
  main.classList.add('hidden');

  function makeKey() {
    let txt = '';
    const alphanum = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      txt += alphanum.charAt(Math.floor(Math.random() * alphanum.length));
    }
    return txt;
  }

  function redraw() {
    const todoList = document.querySelector('.todo-list');
    todoList.innerHTML = '';

    if (database.length === 0) {
      footer.classList.add('hidden');
      main.classList.add('hidden');
    } else {
      footer.classList.remove('hidden');
      main.classList.remove('hidden');
    }

    database.forEach((x) => {
      const todo = document.createElement('li');
      todo.dataset.key = x.id;
      if (x.completed) {
        todo.classList.add('completed');
      }

      const div = document.createElement('div');
      div.classList.add('view');

      const input = document.createElement('input');
      input.type = 'checkbox';
      input.classList.add('toggle');
      input.addEventListener('change', (e) => {
        e.preventDefault();
        input.parentNode.parentNode.classList.toggle('completed');
        const kee = input.parentNode.parentNode.dataset.key;
        if (input.checked === false) {
          input.checked = true;
          database.find(elm => elm.id === kee).completed = true;
        } else {
          input.checked = false;
          database.find(elm => elm.id === kee).completed = false;
        }
        redraw();
      });
      div.appendChild(input);

      const label = document.createElement('label');
      label.innerText = x.title;
      label.addEventListener('dblclick', (e) => {
        e.preventDefault();
        label.parentNode.parentNode.classList.add('editing');
        label.parentNode.nextSibling.focus();
      });
      div.appendChild(label);

      const button = document.createElement('button');
      button.classList.add('destroy');
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const kee = button.parentNode.parentNode.dataset.key;
        const indx = database.findIndex(elm => elm.id === kee);
        database.splice(indx, 1);
        redraw();
      });
      div.appendChild(button);
      todo.appendChild(div);

      const inp = document.createElement('input');
      inp.classList.add('edit');
      inp.value = x.title;
      inp.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const key = inp.parentNode.dataset.key;
          database.find(elm => elm.id === key).title = inp.value.trim();
          redraw();
        } else if (e.key === 'Escape') {
          e.preventDefault();
          const key = inp.parentNode.dataset.key;
          inp.value = database.find(elm => elm.id === key).title;
          inp.parentNode.classList.remove('editing');
        }
      });
      todo.appendChild(inp);

      todoList.appendChild(todo);
    });
  }

  const newTodo = document.querySelector('.new-todo');
  newTodo.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && newTodo.value !== '') {
      e.preventDefault();
      const elemObj = {
        id: makeKey(),
        title: newTodo.value.trim(),
        completed: false,
      };
      database.push(elemObj);
      newTodo.value = '';
      redraw();
    }
  });

//  document.querySelectorAll('.todo-list li label').forEach((elem) => {
//    elem.addEventListener('dblclick', (e) => {
//      e.preventDefault();
//      elem.parentNode.parentNode.classList.add('editing');
//    });
//  });

//  document.querySelectorAll('.todo-list li input').forEach((elem) => {
//    elem.addEventListener('keypress', (e) => {
//      if (e.key === 'Enter') {
//        e.preventDefault();
//        const key = elem.parentNode.dataset.key;
//        database.find(x => x.id === key).title = elem.value;
//        redraw();
//      } else if (e.key === 'Escape') {
//        e.preventDefault();
//        redraw();
//      }
//    });
//  });

}());
