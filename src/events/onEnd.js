import { removeUser } from '../session/user.session.js';
import { saveUserPosition } from '../session/userPosition.session.js';
import { getUserBySocket } from '../session/user.session.js';

export const onEnd = (socket) => async () => {
  try {
  console.log('클라이언트 연결이 종료되었습니다.');
  const user = getUserBySocket(socket);
  console.log(user);
  if(!user){
    console.log('getUserBySocket 오류')
  }
  else {
    const {id , x, y} = user;

    await saveUserPosition(id , x, y);
  }

  removeUser(socket);
}catch (error){
  console.log('onEnd 오류');
}
};
