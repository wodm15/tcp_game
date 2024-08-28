import { createPingPacket } from '../../utils/notification/game.notification.js';

class User {
  constructor(id, socket) {
    this.id = id;
    this.socket = socket;
    this.x = 0;
    this.y = 0;
    this.sequence = 0;
    this.lastUpdateTime = Date.now();
    this.velocityX = 0;
    this.velocityY = 0;
  }

  updatePosition(x, y) {
    // 이전 위치 저장
    const previousX = this.x;
    const previousY = this.y;

    // 새로운 위치와 속도 업데이트
    this.x = x;
    this.y = y;
    this.velocityX = (x - previousX) / ((Date.now() - this.lastUpdateTime) / 1000); // 초 단위
    this.velocityY = (y - previousY) / ((Date.now() - this.lastUpdateTime) / 1000); // 초 단위
    this.lastUpdateTime = Date.now();
  }

  getNextSequence() {
    return ++this.sequence;
  }

  ping() {
    const now = Date.now();
    this.socket.write(createPingPacket(now));
  }

  handlePong(data) {
    const now = Date.now();
    this.latency = (now - data.timestamp) / 2;
  }

  // 추측항법을 사용하여 위치를 추정하는 메서드
  calculatePosition() {
    if (!this.latency) {
      return { x: this.x, y: this.y };
    }

    const timeDiff = this.latency / 1000; // 레이턴시를 초 단위로 계산

    // 레이턴시를 고려하여 이동한 거리 계산
    const predictedX = this.x + this.velocityX * timeDiff;
    const predictedY = this.y + this.velocityY * timeDiff;

    return {
      x: predictedX,
      y: predictedY,
    };
  }
}

export default User;
