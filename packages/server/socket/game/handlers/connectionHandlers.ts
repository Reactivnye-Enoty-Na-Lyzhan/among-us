import type {
  GameSocket,
  SetPlayerReady,
  /*   GameReady, */
  GetPlayers,
  JoinGame,
} from '../../../types/socket/game/gameSocket.types';

const players: Set<string> = new Set();
const readyPlayers: Set<string> = new Set();

export const connectionHandlers = (socket: GameSocket) => {
  // @ts-ignore
  const joinGame: JoinGame = (gameId, callback) => {
    socket.join(gameId.toSting());
    callback(gameId);
  };

  const setPlayerReady: SetPlayerReady = playerId => {
    readyPlayers.add(playerId);
    console.log('Player: ', playerId);
  };

  const getPlayers: GetPlayers = callback => {
    console.log(players, readyPlayers);
    callback([...readyPlayers.keys()]);
  };

  socket.on('joinGame', joinGame);
  socket.on('playerReady', setPlayerReady);
  socket.on('getPlayers', getPlayers);
};
