# 📕 공책 Note, Book
### 책으로 기록하는 나만의 공간
##### 2024.01.10 ~ 진행 중
<br>

## 📃 개요
공책(Note, Book)은 도서 검색 및 기록을 통해 독서 기록을 관리할 수 있는 웹 앱입니다.

2024년 새해 목표 중 하나로 '독서 습관 기르기'를 계획하여, 이에 대한 기록 및 동기부여와 **CRUD 기능**을 직접 구현하고 **Open API**와 연계해 확장하기 위해서 작업한 프로젝트입니다. **기획부터 화면 구현까지** 스스로 진행하는 걸 목표로 삼았습니다.

해당 프로젝트를 통해 기본적인 **데이터 처리 기능**과 **SPA 프레임워크의 이점**을 알고 경험했으며, React와 같은 다른 프레임워크에도 관심을 두게 되었습니다. 또한, 기획부터 시작해 기본적인 개발 프로세스를 따르면서 **서비스 흐름**에 관해 구체적으로 고민해 보고, **협업의 필요성**을 몸소 느낄 수 있었던 기회였습니다.
<br>
<br>
<br>
## 🔎 배포 사이트 주소
https://spaceyoung.github.io/notebook/
- 배포 환경에서의 CORS proxy 설정을 아직 해결하지 못해 현재 도서 검색 기능이 지원되지 않는 상태입니다.
<br>
<br>

## 🛠 사용 기술
JavaScript / Vue.js / Vuetify3 / Vue Router / Axios / Pinia / Firebase
<br>
<br>

## ✨ 구현 기능
- 알라딘 Open API를 활용한 도서 검색 기능
- 독서 기록 정보 CRUD 기능
- 동적 컴포넌트를 활용한 독서 중/독서 완료 탭 전환 기능
- 동적 라우트를 활용한 개별 도서 정보 및 독서 기록 페이지
- 사용자의 독서 기록 정보 입력 조건 설정 및 유효성 검사
- 웹 앱을 고려한 반응형 디자인
<br>
<br>

## 💣 트러블 슈팅
- **도서 검색 결과 랜덤 출력**

<table>
  <tr>
    <th width="100">문제 배경</th>
    <td>같은 검색어를 입력해도 검색 시마다 검색 결과 리스트 순서가 일정하지 않고 랜덤하게 뒤바뀌는 현상 발생.</td>
  </tr>
  <tr>
    <th>문제 원인</th>
    <td>검색 결과 데이터를 받아와 저장하는 과정에서 순차적 처리가 이루어지지 않음.</td>
  </tr>
  <tr>
    <th>해결 과정</th>
    <td>async await으로 불러온 검색 결과 순서가 일정했기에, 받아온 데이터를 forEach 문으로 배열에 저장하는 과정에 문제가 있다고 판단. 반복문의 비동기 처리에 관하여 찾아본 결과, forEach 문은 순차 처리를 하지 않는다는 것을 깨닫고 for…of 문으로 바꾸어 문제 해결.</td>
  </tr>
  <tr>
    <th>알게 된 점</th>
    <td>forEach 문의 동작 원리와 배열에 비동기 작업을 실행할 때의 순차 처리와 병렬 처리 방법을 알게 됨.</td>
  </tr>
</table>
<br>

- **도서 검색 결과, 독서 기록 입력/수정 페이지 새로고침 오류**
<table>
  <tr>
    <th width="100">문제 배경</th>
    <td>도서 검색 결과, 독서 기록 입력/수정 페이지에서 새로고침을 누르면 404 페이지로 넘어가는 오류 발생.</td>
  </tr>
  <tr>
    <th>문제 원인</th>
    <td>Pinia를 사용해 저장한 state 객체 정보가 새로고침 시 초기화됨.</td>
  </tr>
  <tr>
    <th>해결 과정</th>
    <td>JavaScript로 To Do List를 만들어 볼 때 웹 스토리지를 사용하여 데이터를 저장했던 방법을 떠올리고, pinia-plugin-persistedstate 라이브러리를 추가 설치해서 데이터를 로컬 스토리지에 저장해 문제 해결.</td>
  </tr>
  <tr>
    <th>알게 된 점</th>
    <td>웹 스토리지 API를 통해 데이터의 지속성을 유지하는 방법을 다시 한번 상기할 수 있었음.</td>
  </tr>
</table>
<br>
<br>

## 🖥 구현 화면
- **메인 home**

![home](https://github.com/spaceyoung/notebook/assets/154400292/9ea21faf-7f21-44d6-98ac-66eea7b83ff4)
<br>
<br>
- **검색 및 기록 저장**

![search](https://github.com/spaceyoung/notebook/assets/154400292/c580a146-3626-4183-88db-17d39ce1a632)
<br>
<br>
- **독서 중 기록 수정 -> 독서 완료로 이동**

![reading-done](https://github.com/spaceyoung/notebook/assets/154400292/db1eb6bb-3cb6-4ab6-9f2b-105b9753df49)
<br>
<br>
- **독서 완료 기록 수정 -> 독서 중으로 이동**

![reading](https://github.com/spaceyoung/notebook/assets/154400292/e138cd9b-3c96-4b15-a82d-a7065f5926bd)
