로컬호스트 테스트

.env
PORT=5555
HOST=127.0.0.1
CLIENT_VERSION=1.0.0

DB1_NAME=GAME_DB
DB1_USER=root
DB1_PASSWORD=rootroot
DB1_HOST=127.0.0.1
DB1_PORT=3306

DB2_NAME=USER_DB
DB2_USER=root
DB2_PASSWORD=rootroot
DB2_HOST=127.0.0.1
DB2_PORT=3306



서버 실행 테스트

1. USER_DB, GAME_DB 데이터베이스 생성
   
2. npm run migrate 로 데이터 테이블 생성
   
3. node src/server.js 로 서버 실행

4. 실행 후 node client1.js로 서버를 실행하면 응답 데이터로 gameId 가 출력됨.

5. gameId를 client2의 코드 gameId에 붙여넣고 node client2.js를 실행하면  플레이어 2명이 자동으로 x 축 이동.


클라이언트를 종료할 경우 움직인 만큼 db에 저장.
