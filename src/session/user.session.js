import { userSessions } from './sessions.js';
import User from '../classes/models/user.class.js';

const userGameIdMap = new Map(); // userId를 키로 gameId를 값으로 가짐

export const addUser = (id, socket) => {
  const user = new User(id, socket);
  userSessions.push(user);
  return user;
};

export const removeUser = (socket) => {
  const index = userSessions.findIndex((user) => user.socket === socket);
  if (index !== -1) {
    const removedUser = userSessions.splice(index, 1)[0];
    const userId = removedUser.id;
    userGameIdMap.delete(userId); // 유저와 게임 ID 매핑 제거
    return removedUser;
  }
};

export const getUserById = (id) => {
  return userSessions.find((user) => user.id === id);
};

export const getUserBySocket = (socket) => {
  return userSessions.find((user) => user.socket === socket);
};

export const getNextSequence = (id) => {
  const user = getUserById(id);
  if (user) {
    return user.getNextSequence();
  }
  return null;
};

export const setUserGameId = (userId, gameId) => {
  userGameIdMap.set(userId, gameId);
  console.log(`Set gameId ${gameId} for userId ${userId}`);
};

export const getUserGameId = (userId) => {
  return userGameIdMap.get(userId);
};

export const removeUserGameId = (userId) => {
  userGameIdMap.delete(userId);
};
