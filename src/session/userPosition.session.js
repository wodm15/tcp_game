import pools from '../db/database.js';
import CustomError from '../utils/error/customError.js';
import { ErrorCodes } from '../utils/error/errorCodes.js';

export const saveUserPosition = async (id, x, y) =>{
    const query = `
    INSERT INTO user_positions (id, x, y) 
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE x = VALUES(x), y = VALUES(y);
 `;
 

    try {
        const [result] = await pools.USER_DB.query(query , [id ,x, y]);
        return result;
    } catch (error){
        throw new CustomError(ErrorCodes.USER_NOT_FOUND , '유저의 마지막 위치 저장 오류 발생');
    }
}