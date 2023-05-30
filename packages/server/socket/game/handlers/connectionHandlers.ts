import type {
  CreateGame,
  GameSocket,
  JoinGame,
  SetPlayerReady,
  FindGame,
  /*   GameReady, */
  GetPlayers,
} from '../../../types/socket/game/gameSocket.types';

const players: Set<string> = new Set();
const readyPlayers: Set<string> = new Set();

export const connectionHandlers = (socket: GameSocket) => {
  const joinGame: JoinGame = callback => {
    const playerId = Math.floor(Math.random() * 100000000).toString();
    players.add(playerId);
    callback(playerId);
  };

  const createGame: CreateGame = () => {
    console.log('createGame');
  };

  const findGame: FindGame = () => {
    console.log('findGame');
  };

  const setPlayerReady: SetPlayerReady = playerId => {
    readyPlayers.add(playerId);
    console.log('Player: ', playerId);
  };

  const getPlayers: GetPlayers = callback => {
    console.log(players, readyPlayers);
    callback([...readyPlayers.keys()]);
  };

  /*   const broadcastGameReady: GameReady = () => {
    socket.emit('gameReady', [...readyPlayers.keys()] || ['s']);
  }; */

  socket.on('createGame', createGame);
  socket.on('findGame', findGame);
  socket.on('joinGame', joinGame);
  socket.on('playerReady', setPlayerReady);
  socket.on('getPlayers', getPlayers);
};
