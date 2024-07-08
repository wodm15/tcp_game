
공통 패킷 구조

totalLength int         메세지의 전체 길이             4 Byte

packetType  int         패킷의 타입                  1 Byte

protobuf    protobuf    프로토콜 버퍼 구조체           가변




node src/server.js 로 서버 실행

실행 후 node client1.js로 서버를 실행하면 응답 데이터로 gameId 가 출력됨.

gameId를 client2의 코드 gameId에 붙혀넣고 node client2.js를 실행하면  플레이어 2명이 자동으로 x 축 이동.

클라이언트를 종료할 경우 움직인 만큼 db에 저장.
