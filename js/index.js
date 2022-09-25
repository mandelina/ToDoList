const $input = document.querySelector(".todo_input"); //할일입력 $input박스
const todoListElem = document.querySelector(".list"); //ul

//완료한일
const comleteBtn = document.querySelector(".complete");
//해야할일
const todoBtn = document.querySelector(".todo");
//모두보기
const allBtn = document.querySelector(".all");

let todos = []; // todo를 관리할 배열
let local = JSON.parse(localStorage.getItem("todos")); //todos 배열이 들어있는 로컬 스토리지

//----------------------------------------------------------

// 현재 todo를 업데이트 하는 함수
const setTodos = (newTodos) => {
  todos = newTodos;
  localStorage.setItem("todos", JSON.stringify(todos)); //local스토리지에 배열을 통째로 넣고
  local = JSON.parse(localStorage.getItem("todos")); // string을 잘라서 다시 array로 꺼낸다
};

//----------------------------------------------------------

// 현재 todo를 가져오는 함수
const getAllTodos = () => {
  if (localStorage.length > 0) {
    // 로컬스토리지에 한개 이상의 객체가 들어가면 그때부터 로컬스토리지 데이터 리턴
    return local;
  } else {
    // 로컬스토리지에 아무것도 없으면 일단 빈 배열로 시작
    return todos;
  }
};

// 완료한 일을 가져오는 함수

const getCompletedTodos = () => {
  if (localStorage.length === 0) {
    return todos;
  } else {
    return local.filter((todo) => todo.isCompleted);
  }
};

// 할 일을 가져오는 함수
const getActiveodos = () => {
  if (localStorage.length === 0) {
    return todos;
  } else {
    return local.filter((todo) => !todo.isCompleted);
  }
};

//----------------------------------------------------------

//todo를 추가하는 함수
const appendTodos = (text) => {
  let newid = localStorage.length > 0 ? local.length : 0;

  const newTodos = getAllTodos().concat({
    id: newid,
    isCompleted: false,
    content: text,
  });

  setTodos(newTodos);
  paintTodos();
};

//----------------------------------------------------------

//todos를 삭제하는 함수
const deleteTodo = (todoId) => {
  const newTodos = getAllTodos().filter((todo) => todo.id !== todoId); //id가 같은 todo를 제외하고 새로운 todo에 넣어줌
  setTodos(newTodos);
  paintTodos(); //다시 렌더링
};

//--------------------수정 관련 함수 --------------------------

// 더블클릭시 할일 수정 함수
const ondblclick = (e, todoId) => {
  const todoItemElem = e.target;
  const todoEle = e.target; // li
  const inputText = e.target.children[1].textContent; //lable의 글
  const text = document.createElement("input");
  text.value = inputText;
  text.classList.add("editInput"); //수정시 영역 확장

  todoItemElem.appendChild(text);

  // //다른 영역 클릭시 수정 취소 함수
  const onClickBody = (e) => {
    if (e.target !== text) {
      //현재 클릭한곳이 inputBox가 아니면
      todoItemElem.removeChild(text);
      document.body.removeEventListener("click", onClickBody);
    }
  };

  document.body.addEventListener("click", onClickBody);

  // 엔터키 이벤트
  text.addEventListener("keypress", (e) => {
    if (e.keyCode == 13) {
      updateTodo(e.target.value, todoId);
    }
  });
};

//enter키를 친 후 저장하는 함수
const updateTodo = (inputText, todoId) => {
  const newTodos = getAllTodos().map((todo) =>
    todo.id === todoId ? { ...todo, content: inputText } : todo
  ); // 수정할 id값만 내용을 바꾼다.
  setTodos(newTodos);
  paintTodos();
};

//-------------------------------------------------------
//상태에 따른 렌더링 함수
const paintTodo = (todoState) => {
  todoState.forEach((todo) => {
    // 추가할 li
    const todoItemElem = document.createElement("li");

    // 할일 text
    const todoEle = document.createElement("label");
    todoEle.classList.add("txt");
    todoEle.textContent = todo.content;

    //할일수정  - 더블클릭시 수정
    todoItemElem.addEventListener("dblclick", (e) => ondblclick(e, todo.id));

    // 삭제 버튼
    const delBtn = document.createElement("button");
    delBtn.classList.add("delete_btn");
    delBtn.innerHTML = "X";
    delBtn.addEventListener("click", () => deleteTodo(todo.id));

    //----------------------

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
        setTodos(local); // local에 true 저장 (새로고침시 체크 유지되도록)
        paintTodos();
      } else {
        todo.isCompleted = false;
        $li.classList.remove("check");
        setTodos(local);
        paintTodos();
      }
    });

    //isCompleted가 true이면 check되어있는 상태 렌더링
    if (todo.isCompleted) {
      checkboxElem.checked = true;
      todoItemElem.classList.add("check");
    }
    //-----------------------
    //전체삭제
    const Clearbtn = document.querySelector(".clear");
    Clearbtn.addEventListener("click", (e) => {
      localStorage.clear();
      location.reload();
    });

    todoItemElem.appendChild(checkboxElem); //li 구성 1.checkbox
    todoItemElem.appendChild(todoEle); //li 구성 2.label(할일입력)
    todoItemElem.appendChild(delBtn); //li 구성 3.삭제버튼
    todoListElem.appendChild(todoItemElem); // 하나의 li을 ul에 추가
  });
};

//-------------------------------------------------------

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

    //할일수정  - 더블클릭시 수정
    todoItemElem.addEventListener("dblclick", (e) => ondblclick(e, todo.id));

    // 삭제 버튼
    const delBtn = document.createElement("button");
    delBtn.classList.add("delete_btn");
    delBtn.innerHTML = "X";
    delBtn.addEventListener("click", () => deleteTodo(todo.id));

    //----------------------

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
        setTodos(local); // local에 true 저장 (새로고침시 체크 유지되도록)
        paintTodos();
      } else {
        todo.isCompleted = false;
        $li.classList.remove("check");
        setTodos(local);
        paintTodos();
      }
    });

    //isCompleted가 true이면 check되어있는 상태 렌더링
    if (todo.isCompleted) {
      checkboxElem.checked = true;
      todoItemElem.classList.add("check");
    }
    //-----------------------
    //전체삭제
    const Clearbtn = document.querySelector(".clear");
    Clearbtn.addEventListener("click", (e) => {
      localStorage.clear();
      location.reload();
    });

    todoItemElem.appendChild(checkboxElem); //li 구성 1.checkbox
    todoItemElem.appendChild(todoEle); //li 구성 2.label(할일입력)
    todoItemElem.appendChild(delBtn); //li 구성 3.삭제버튼

    todoListElem.appendChild(todoItemElem); // 하나의 li을 ul에 추가
  });
};

//----------------------------------------------------------

const init = () => {
  $input.addEventListener("keypress", (e) => {
    if (e.keyCode == 13) {
      if (e.target.value !== "") {
        appendTodos(e.target.value); //현재입력된 값을 투두리스트에 추가한다
        $input.value = ""; //추가했으면 입력창에 있는 값 지우기
      } else {
        alert("해야 할 일을 입력해주세요!");
      }
    }
  });
  comleteBtn.addEventListener("click", onClickShowTodo);
  todoBtn.addEventListener("click", onClickShowTodo);
  allBtn.addEventListener("click", onClickShowTodo);
};

//----------------------------------------------------------

//button을 클릭했을때 상태를 알려줌
const btnList = document.querySelector(".btn_Wrapper");

const onClickShowTodo = (e) => {
  const currBtn = e.target; //현재 클릭한 버튼
  const curState = currBtn.getAttribute("class").replace("btn", "");

  return paintTodoState(curState);
};

//----------------------------------------------------------
//상태에 따른 랜더링

const paintTodoState = (curState) => {
  todoListElem.innerHTML = null;

  switch (curState) {
    case " all":
      const allTodos = getAllTodos();
      paintTodos();
      break;

    case " todo":
      const activeTodos = getActiveodos();
      paintTodo(activeTodos);
      break;

    case " complete":
      const completedTodos = getCompletedTodos();
      paintTodo(completedTodos);
      break;

    default:
      break;
  }
};

//----------------------------------------------------------

//로컬스토리지에 저장된 값이 있으면 렌더링 해주고 시작
if (localStorage.length > 0) {
  paintTodos();
}

init();

//----------------------------------------------------------
//시간 및 날짜설정
const TODAY = document.querySelector(".day");
const TODAY_TIME = document.querySelector(".time");

// 날짜
const date = new Date();
const year = date.getFullYear();
const month = ("0" + (date.getMonth() + 1)).slice(-2);
const day = ("0" + date.getDay()).slice(-2);
const dateStr = year + "-" + month + "-" + day;

// 시간
const hours = ("0" + date.getHours()).slice(-2);
const minutes = ("0" + date.getMinutes()).slice(-2);
const seconds = ("0" + date.getSeconds()).slice(-2);
const timeStr = hours + ":" + minutes;
TODAY.textContent = dateStr;
TODAY_TIME.textContent = timeStr;
