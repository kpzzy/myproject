### Directory Structure

```
.
├── app.js
├── routes
│   ├── index.js
│   ├── comments.js
│   └── posts.js
└── schemas
    ├── index.js
    ├── comment.js
    └── post.js
```  

### api 설계
![api1](https://user-images.githubusercontent.com/107670953/181434674-141e04f4-c7d2-4bc7-82da-f23a823d4e67.png)
![api2](https://user-images.githubusercontent.com/107670953/181434688-6d8038bd-55c9-4ac3-9ba3-9c7e7fe1826e.png)

### 수정, 삭제 API의 request를 어떤 방식으로 사용하셨나요? (param, query, body) 

Request 객체의 API를 컨트롤 하기 위한 메소드 중 param과 body를 사용하였음  
param을 통하여 게시물 아이디값과 댓글의 아이디값을 조회하고
게시물을 수정할때는 param으로 확인한 데이터의 pw를 확인하여 수정,삭제를 했으며
댓글에서 수정할때는 body의 컨텐트의 존재 유무를 확인하여 수정하며 삭제시에는 원하는 정보를 삭제하도록 함  

### 어떤 상황에 어떤 방식의 request를 써야하나요?  

GET = 서버에게 resource를 보내달라고 요청할 때 사용합니다. 서버(혹은 DB)의 resource는 클라이언트로 전달만 될 뿐 변경되지 않습니다  

POST - 서버에게 resource를 보내면서 해당 resource를 DB혹은 서버에 저장해달라고 요청할 때 사용합니다. 예를들어 회원가입을 하면 DB에 새로운 회원정보가 등록되고, 사진을 업로드 하면 그 사진이 웹사이트에 등록되는데 이러한 요청은 post를 통해 이루어 집니다.  

PUT - 서버에게 resource의 업데이트를 요청할 때 사용됩니다. 회원정보 수정, 작성된 게시물의 수정 등의 요청에 사용됩니다.  

DELETE - DB, 서버에 존재하는 resource의 삭제를 요청할 때 사용됩니다.  

### RESTful한 API를 설계했나요? 어떤 부분이 그런가요? 어떤 부분이 그렇지 않나요?  

Create : 데이터 생성(POST)  
Read : 데이터 조회(GET)  
Update : 데이터 수정(PUT)  
Delete : 데이터 삭제(DELETE)  

CRUD 를 잘 구현한 부분은 잘 설계했다고 생각한다  
하지만 URL 주소를 guitarId, commentId 를 사용한 부분은 RESTful하지 않았다  

### 역할별로 Directory Structure를 분리하였을 경우 어떠한 이점이 있을까요?  

장점은 다음과 같다.  

특정 파일, 함수, 클래스 등을 찾기 쉽다  
팀 작업 하기 용이하다  
유지보수가 쉬워진다  

이를 한줄로 요약하자면 '관심사의 분리와 이름 짓기에 신경을 써야 한다' 라고 생각한다
