const $input = document.querySelector(".todo_input"); //할일입력 $input박스
const todoListElem = document.querySelector(".list"); //ul

let todos = [];

let id = 0;
let Stor_ID = 0;

// 현재 todo를 업데이트 하는 함수
const setTodos = (newTodos) => {
  todos = newTodos;
};

// 현재 todo를 가져오는 함수
const getAllTodos = () => {
  return todos;
};

//todo를 추가하는 함수
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

//todos를 삭제하는 함수
const deleteTodo = (todoId) => {
  console.log("click!");
  const newTodos = getAllTodos().filter((todo) => todo.id !== todoId); //id가 같은 todo를 제외하고 새로운 todo에 넣어줌
  setTodos(newTodos);
  paintTodos(); //다시 렌더링
};

//할일이 추가될때 렌더링해주는 함수
const paintTodos = () => {
  todoListElem.innerHTML = null; //todoListElem 요소안의 html을 초가화
  const allTodos = getAllTodos(); //배열 가져오기
  allTodos.forEach((todo) => {
    // 추가할 li
    const todoItemElem = document.createElement("li");

    // 할일 text
    const todoEle = document.createElement("label");
    todoEle.classList.add("txt");
    todoEle.textContent = todo.content;

    // 삭제 버튼
    const delBtn = document.createElement("button");
    delBtn.classList.add("delete_btn");
    delBtn.innerHTML = "X";
    delBtn.addEventListener("click", () => deleteTodo(todo.id));

    // 체크박스
    const checkboxElem = document.createElement("input");
    checkboxElem.setAttribute("type", "checkbox");

    //할일이 완료되면 선을 그어줄 li

    //체크박스 체크시 isCompleted: true로 변경
    checkboxElem.addEventListener("change", (e) => {
      const $li = e.currentTarget.parentNode;
      if (e.currentTarget.checked) {
        $li.classList.add("check");
        todo.isCompleted = true;
      } else {
        console.log("체크 안됨");
        todo.isCompleted = false;
        $li.classList.remove("check");
      }
    });

    //isCompleted가 true이면 check되어있는 상태 렌더링
    if (todo.isCompleted) {
      checkboxElem.checked = true;
      todoItemElem.classList.add("check");
    }

    todoItemElem.appendChild(checkboxElem); //li 구성 1.checkbox
    todoItemElem.appendChild(todoEle); //li 구성 2.label(할일입력)
    todoItemElem.appendChild(delBtn); //li 구성 3.삭제버튼

    todoListElem.appendChild(todoItemElem); // 하나의 li을 ul에 추가
  });
};

const init = () => {
  $input.addEventListener("keypress", (e) => {
    if (e.keyCode == 13) {
      appendTodos(e.target.value); //현재입력된 값을 투두리스트에 추가한다
      $input.value = ""; //추가했으면 입력창에 있는 값 지우기
    }
  });
};

paintTodos();
init(); //index.js가 실행될때 호출

const $lil = document.querySelector(".list");
