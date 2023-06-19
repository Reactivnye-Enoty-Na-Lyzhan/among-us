import type { ChatMessage } from '../../../models/chat/chatMessage';
import type { Namespace, Socket } from 'socket.io';

export type GameParams = {
  discussion: number;
  players: number;
  impostors: number;
  interval: number;
  meetings: number;
};

export type GameStatus = 'init' | 'preparing' | 'active' | 'finished';

export type GameRole = 'impostor' | 'civil';

export type SuitColorsType = {
  [k in (typeof suitsColors)[number]]: boolean;
};

export const suitsColors = [
  'white',
  'red',
  'purple',
  'aquamarine',
  'green',
  'yellow',
  'blue',
  'brown',
  'grey',
] as const;

export type GameId = number;

export type AssembleMeeting = (gameId: GameId, initiatorId: number) => void;

export type OnEmergencyMeeting = (initiatorId: number) => void;

export type GetPlayers = (
  gameId: GameId,
  callback: (players: number) => void
) => void;

export type SelectedColors = (
  newColor: keyof SuitColorsType,
  oldColor: keyof SuitColorsType | null
) => void;

export type GetSelectedColors = (
  gameId: GameId,
  callback: (selectedColors: SuitColorsType) => void
) => void;

export type UnselectColor = (
  gameId: GameId,
  color: keyof SuitColorsType
) => void;

export type SetSocketPlayer = (gameId: GameId, playerId: number) => void;

export type GameReady = (players: IPlayer[]) => void;

export type CompleteTask = (gameId: GameId) => void;

export type KillPlayer = (
  gameId: GameId,
  targetId: number,
  fromMeeting?: boolean
) => void;

export type EndMove = (id: string) => void;

export type JoinGame = (gameId: GameId) => void;

export type CreateGame = () => void;

export type FindGame = () => void;

export type PlayerJoin = () => void;

export type LeaveGame = (gameId: GameId) => void;

export type OnLeaveGame = () => void;

export type OnGameEnd = (role: PlayerRoleType) => void;

export type OnPlayerKill = (playerId: number, fromMeeting?: boolean) => void;

export type SetPlayerRating = (
  playerId: number,
  status: PlayerRoleType
) => void;

export type SelectColor = (
  gameId: number | null,
  color: keyof SuitColorsType,
  oldColor: keyof SuitColorsType | null,
  callback: (newColor: keyof SuitColorsType) => void
) => void;

interface IMoveParams {
  id: string;
  x: number;
  y: number;
}

interface IMoveServerParams extends IMoveParams {
  gameId: GameId;
}

export type MoveServer = (params: IMoveParams) => void;
export type MessageType = Pick<ChatMessage, 'id' | 'text' | 'authorId'>;

export type Move = (params: IMoveParams) => void;

interface ISendMessageParams {
  chatId: number;
  gameId: number;
  playerId: number;
  message: string;
}

export type SendMessage = (params: ISendMessageParams) => void;

export type OnGetMessage = (message: MessageType) => void;

export type GetMessages = (
  chatId: number,
  callback: (messages: MessageType[]) => void
) => void;

export type OnUnavaliableMeeting = (reason: string) => void;

export type FinishMeeting = (gameId: GameId) => void;

export type OnFinishMeeting = (playerId?: number) => void;

export type OnLastSecondsMeeting = () => void;

export type MoveClient = (params: IMoveServerParams) => void;

export type MeetingResults = {
  [k: number]: number;
};

export type MeetingVotedList = number[];

export type VoteForPlayer = (
  gameId: GameId,
  playerId: number,
  oldTargetId: number | null,
  newTargetId: number,
  callback: (votedList: number[]) => void
) => void;

export type RemoveVote = (
  gameId: GameId,
  playerId: number,
  targetPlayerId: number,
  callback: (votedList: number[]) => void
) => void;

export type OnVote = (votedList: number[]) => void;

type PlayerCoordinates = {
  x: number;
  y: number;
};

export type ReturnToGame = (
  gameId: GameId,
  playerId: number,
  callback: (coordinates: PlayerCoordinates) => void
) => void;

export type OnSyncPlayerPosition = (
  playerId: number,
  callback: (coordinates: PlayerCoordinates) => void
) => void;

// Broadcasting
export interface IGameServerToClientEvents {
  move: MoveServer;
  endMove: EndMove;
  selectedColors: SelectedColors;
  killPlayer: KillPlayer;
  onGameReady: GameReady;
  onEmergencyMeeting: OnEmergencyMeeting;
  onFinishMeeting: OnFinishMeeting;
  onPlayerJoin: PlayerJoin;
  onLeaveGame: OnLeaveGame;
  onGameEnd: OnGameEnd;
  onPlayerKill: OnPlayerKill;
  onGetMessage: OnGetMessage;
  onUnavaliableMeeting: OnUnavaliableMeeting;
  onLastSecondsMeeting: OnLastSecondsMeeting;
  onVote: OnVote;
  onSyncPlayerPosition: OnSyncPlayerPosition;
}

// Receiving Event
export interface IGameClienToServerEvents {
  createGame: CreateGame;
  findGame: FindGame;
  joinGame: JoinGame;
  leaveGame: LeaveGame;
  move: MoveClient;
  endMove: EndMove;
  selectColor: SelectColor;
  getSelectedColors: GetSelectedColors;
  unselectColor: UnselectColor;
  killPlayer: KillPlayer;
  completeTask: CompleteTask;
  setSocketPlayer: SetSocketPlayer;
  getPlayersAmount: GetPlayers;
  assembleMeeting: AssembleMeeting;
  finishMeeting: FinishMeeting;
  setPlayerRating: SetPlayerRating;
  sendMessage: SendMessage;
  getMessages: GetMessages;
  voteForPlayer: VoteForPlayer;
  removeVote: RemoveVote;
  returnToGame: ReturnToGame;
}

// Inter-server
export interface IGameInterServerEvents {
  ping: () => void;
}

type PlayerRoleType = 'impostor' | 'civil';

export interface IPlayer {
  id: number | null;
  alive: boolean;
  color: keyof SuitColorsType;
  lastPosition: {
    x: number;
    y: number;
  };
  role: PlayerRoleType;
  score: number;
}

// Socket Data
export interface IGameSocketData {
  name: string;
  age: number;
}

export type GameSocketNamespace = Namespace<
  IGameClienToServerEvents,
  IGameServerToClientEvents,
  IGameInterServerEvents,
  IGameSocketData
>;
export type GameSocket = Socket<
  IGameClienToServerEvents,
  IGameServerToClientEvents,
  IGameInterServerEvents,
  IGameSocketData
>;
