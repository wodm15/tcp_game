import { getGameSession } from '../../session/game.session.js';
import { handleError } from '../../utils/error/errorHandler.js';
import CustomError from '../../utils/error/customError.js';
import { ErrorCodes } from '../../utils/error/errorCodes.js';
import updatePosition from '../../utils/updatePosition.js';
import {getUserGameId} from '../../session/user.session.js';


const updateLocationHandler = ({ socket, userId, payload }) => {
  try {
    const { x, y } = payload;

    const gameId = getUserGameId(userId);

    if(!gameId) {

      throw new CustomError(ErrorCodes.GAME_NOT_FOUND, 'gameId 삭제됨');
    }
    const gameSession = getGameSession(gameId);

    if (!gameSession) {
      throw new CustomError(ErrorCodes.GAME_NOT_FOUND, '게임 세션을 찾을 수 없습니다.');
    }

    const user = gameSession.getUser(userId);
    if (!user) {
      throw new CustomError(ErrorCodes.USER_NOT_FOUND, '유저를 찾을 수 없습니다.');
    }

     // 이전 위치와 시간을 가져오기
     const { previousX, previousY, lastUpdateTime } = user.updatePosition();

     // 현재 시간
     const currentTime = Date.now();
     const deltaTime = (currentTime - lastUpdateTime) / 1000; // 밀리초를 초로 변환

     const velocityX = (x - previousX) / deltaTime;
     const velocityY = (y - previousY) / deltaTime;
 
     // 추측항법
     const predictedX = x + velocityX * deltaTime;
     const predictedY = y + velocityY * deltaTime;
 
     // 유저의 위치와 속도 업데이트
     user.updatePosition(predictedX, predictedY, velocityX, velocityY, currentTime);
    user.updatePosition(x, y);
    const packet = gameSession.getAllLocation();

    socket.write(packet);
  } catch (error) {
    handleError(socket, error);
  }
};

export default updateLocationHandler;