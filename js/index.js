const $input = document.querySelector(".todo_input"); //할일입력$input박스
const todoListElem = document.querySelector(".list"); //ul

let todos = [];
let id = 0;

const setTodos = (newTodos) => {
  todos = newTodos;
};

const getAllTodos = () => {
  return todos;
};

const appendTodos = (text) => {
  const newid = id++;
  const newTodos = getAllTodos().concat({
    id: newid,
    isCompleted: false,
    content: text,
  });
  setTodos(newTodos);
  paintTodos();
};

//할일이 추가될때 렌더링해주는 함수
const paintTodos = () => {
  todoListElem.innerHTML = null; //todoListElem 요소안의 html을 초가화
  const allTodos = getAllTodos(); //배열 가져오기
  allTodos.forEach((todo) => {
    const todoItemElem = document.createElement("li");
    const todoEle = document.createElement("label");
    todoEle.classList.add("txt");
    todoEle.textContent = todo.content;

    const delBtn = document.createElement("button");
    delBtn.classList.add("delete_btn");
    delBtn.innerHTML = "X";
    const checkboxElem = document.createElement("input");
    checkboxElem.setAttribute("type", "checkbox");

    todoItemElem.appendChild(checkboxElem);
    todoItemElem.appendChild(todoEle);
    todoItemElem.appendChild(delBtn);
    todoListElem.appendChild(todoItemElem);
  });
};

const init = () => {
  $input.addEventListener("keypress", (e) => {
    if (e.keyCode == 13) {
      //enter키
      appendTodos(e.target.value); //현재입력된 값을 투두리스트에 추가한다
      $input.value = ""; //추가했으면 입력창에 있는 값 지우기
    }
  });
};

init();
