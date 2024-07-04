import { addUser } from "../../session/user.session.js";


const initialHandler = async ({ socket, userId, payload }) => {
    try {
      const { deviceId , playerId, latency } = payload;
  
      addUser(socket, deviceId);

        // 유저 정보 응답 생성
        const initialResponse = createResponse(
          HANDLER_IDS.INITIAL,
          RESPONSE_SUCCESS_CODE,
          { userId: user.id },
          deviceId,
        );
        
      socket.write("");
    } catch(error){
    console.log(error);
}
};
export default initialHandler;