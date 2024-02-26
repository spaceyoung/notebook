# 공책 Note, Book
#### 개인 프로젝트 기여도 100%
> 2024.01.10 ~ 2024.02.13 개발 배포 완료<br>
> 리팩토링, 기능 추가 및 보완을 통한 버전 관리 진행 중
<br>

**📕 배포 사이트 주소** ｜ [notebook-service.vercel.app](https://notebook-service.vercel.app/#/)

**💡 작업 기록 및 회고** ｜ [padlet.com/myoungever/padlet-1](https://padlet.com/myoungever/padlet-1pebk43tm5u1ezu8)
<br>
<br>
<br>
![notebook-pc](https://github.com/spaceyoung/notebook/assets/154400292/5bd607a7-cf5d-4f14-9bd4-c5d157bf9585)
<p align="center"><img src="https://github.com/spaceyoung/notebook/assets/154400292/58a4240f-aa1e-44bf-be18-48614145a839" width="480" /></p>
<br>
<br>

### 🔎 개요
공책(Note, Book)은 **도서 검색 및 기록을 통해 자신만의 독서 기록을 관리할 수 있는 웹 앱**입니다.

2024년 새해 목표 중 하나로 '독서 습관 기르기'를 계획하여, 이에 대한 기록 및 동기부여와 **CRUD 기능**을 직접 구현하고 **Open API**와 연계해 확장하기 위해서 작업한 프로젝트입니다. **기획부터 화면 구현, 배포까지 스스로 진행**하는 걸 목표로 삼았습니다.
<br>
<br>
<br>
### 🛠 사용 기술
```
* Language
    - JavaScript

* Framework
    - Vue.js
    - Vuetify3

* Library
    - Vue router
    - Axios
    - Pinia
    - Vuefire

* Database
    - Firebase

* Tools
    - Figma
    - Github
    - Vercel
    - Visual Studio Code
```
<br>
<br>

### ✨ 구현 기능
- **로그인/회원 가입**
    - **Firebase 인증**을 통한 **로그인/회원 가입** 및 **구글 소셜 로그인** 연동

- **마이 페이지(나의 기록)**
    - 구글 소셜 첫 로그인 또는 회원 가입 시 사용자의 정보를 DB에 저장, 이를 통한 **독서 기록 데이터 조회 및 관리** 개인화
    - **동적 컴포넌트**를 이용한 독서 중/독서 완료 탭 전환 기능

- **도서 검색**
    - **알라딘 Open API**를 활용하여 사용자가 입력한 검색어에 따라 **도서명/작가명으로 도서 검색**
    - 검색된 도서 데이터를 JSON 형식으로 저장 후, 화면에 리스트 형식으로 결과 출력

- **도서 상세 정보 및 독서 기록 페이지**
    - 도서의 고유한 ISBN 값으로 Open API를 재호출하여 해당하는 도서의 상세 정보를 받아와 저장, 화면에 출력
    - **Firebase DB**를 활용하여 **로그인한 사용자의 독서 기록 정보 CRUD** 기능 구현
    - 독서 기록 폼의 '독서 시작/완료일', '읽은 페이지 수' 입력 필드에 **사용자 입력값 유효성 검증** 적용
    - 각 route에 **lazy loading**을 적용하여 **초기 화면의 로딩을 1초가량 단축**

- **배포 및 CI/CD**
    - **Github Actions, Vercel**를 활용하여 빌드부터 배포까지의 **워크플로우 자동화**
    - **Git flow의 branch 전략**을 도입하여 **체계적인 개발 단계를 구축**, 배포 안정성을 높이면서 **버전 관리** 진행

- **리팩토링 및 유지 보수**
    - 초기에 설계한 component 구조를 통일성 있게 재구성하여 **유지 보수 효율 및 확장성 향상**
    - **기능에 따라 스토어를 분리**, 사용자 인증 정보, API 호출을 제외한 **단일 컴포넌트 내의 상태값은 지역으로 관리**하여 초기의 불규칙하고 무분별한 전역 상태 관리를 감소
<br>
<br>

### 💣 트러블 슈팅
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

### 🖥 구현 화면
- **회원 가입 페이지**

![signup](https://github.com/spaceyoung/notebook/assets/154400292/9388309c-488d-48cd-936c-fe4a1a441b3b)
<br>
<br>
- **로그인 페이지**

![login](https://github.com/spaceyoung/notebook/assets/154400292/e3b98718-bd90-4518-a685-801dce0c5d5a)
<br>
<br>
- **My 페이지**

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
