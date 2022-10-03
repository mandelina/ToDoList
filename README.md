# 투두리스트

- 배포링크 : https://mandelina.github.io/ToDoList

<br>

## [preview]

![투두리스트](https://user-images.githubusercontent.com/83548784/182441184-018a6f8d-ddac-41d6-9c04-0a1089163384.gif)

<br>

# 💻 사용한 스택

- `HTML` , `CSS`
- `JavaScript`

<br>

# 💻 프로젝트 설명

- 할 일을 적어두는 투두 리스트

<br>

# 💻 메인 기능

- 할 일을 입력후 enter을 누르면 할일 추가
- X 버튼을 누를시 할일 삭제
- 더블 클릭으로 할 일 수정가능
- 완료된 일이면 체크표시
- 체크표시에 따라 해야할 일과 완료한 일을 따로 보기 가능 (정렬 기능)
- 전체삭제 기능
- 왼쪽 상단에서 현재 시간 및 날짜를 확인 가능

<br>

# 💻 프로젝트 진행 상황

- ## v.1.1.0
  - 투두리스트를 CRUD하는 코드를 함수화 하여 작성
  - `localstorage`를 이용하여 브라우저를 나갔다가 들어와도 리스트가 남아있게 구현

<br>
    
- ## v1.1.1 
    - 전체적인 UI 변경
    - 투두리스트 왼쪽 상단에 현재 시간 및 날짜 추가

<br>

- ## v2.1.0
      - 같은 동작을 `React`와 `TypeScript`를 사용하여 구현해보기
      - 레포 : https://github.com/mandelina/ToDoList_TypeScript
  <br>

# 💻 프로젝트를 통해 배운점

- JavaScript에서 DOM을 다루는 방법

- `localstorage`의 정의 및 사용법

  - 투두리스트를 관리 할 배열을 만들어 놓고 localStoage와 JSON형식의 데이터를 직렬화,역직렬화를 하며 데이터를 동기화 시켰다.

  <br>

- 각 투두리스트의 CRUD 기능별로 함수로 만들어서 사용
