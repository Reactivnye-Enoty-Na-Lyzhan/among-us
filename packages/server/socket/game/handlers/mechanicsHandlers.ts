import { Team } from '../../../models/game/team';
import { Game } from '../../../models/game/game';
import { Meeting } from '../../../models/game/metting';
import { NotExistError } from '../../../utils/errors/commonErrors/NotExistError';
import { ErrorMessages } from '../../../utils/errors/errorMessages';
import { MeetingMessages } from '../../../utils/game/MeetingMessages';
import { CIVIL_VICTORY_SCORE } from '../../../utils/constants';
import type {
  AssembleMeeting,
  CompleteTask,
  GameId,
  GameSocket,
  GameSocketNamespace,
  RemoveVote,
  VoteForPlayer,
} from '../../../types/socket/game/gameSocket.types';
import { getVoteResult } from '../../../utils/game/getVoteResult';

export const mechanicsHandlers = (
  socket: GameSocket,
  io: GameSocketNamespace
) => {
  // Организация встречи
  const assembleMeeting: AssembleMeeting = async (gameId, initiatorId) => {
    try {
      const game = await Game.findOne({
        where: {
          id: gameId,
        },
      });

      if (!game) throw new NotExistError(ErrorMessages.gameNotExist);

      const meeting = await game.getMeeting();
      const param = await game.getParam();

      const meetingUnfreezeTime =
        meeting.lastMeeting.getTime() + param.interval * 1000;

      if (meeting.isProccessing) {
        socket.emit('onUnavaliableMeeting', MeetingMessages.proccessing);
        return;
      }

      if (meeting.meetingCount >= param.meetings) {
        socket.emit('onUnavaliableMeeting', MeetingMessages.count);
        return;
      }

      if (Date.now() < meetingUnfreezeTime) {
        socket.emit('onUnavaliableMeeting', MeetingMessages.interval);
        return;
      }

      await meeting.update({
        isProccessing: true,
      });

      io.to(gameId.toString()).emit('onEmergencyMeeting', initiatorId);

      // Выравниваем время до завершения голосования
      setTimeout(() => {
        io.to(gameId.toString()).emit('onLastSecondsMeeting');
      }, (param.discussion - 3) * 1000);

      // Информируем о завершении голосования
      setTimeout(() => {
        handleFinishMeeting(gameId);
      }, param.discussion * 1000);
    } catch (err: unknown) {
      console.log(err);
    }
  };

  // Обработчик завершения голосования
  const handleFinishMeeting = async (gameId: GameId) => {
    try {
      const meeting = await Meeting.findOne({
        where: {
          gameId,
        },
      });

      if (!meeting) throw new NotExistError(ErrorMessages.meetingNotFound);

      const result = getVoteResult(meeting.results);

      if (result) {
        io.to(gameId.toString()).emit('onFinishMeeting', result);
      } else {
        io.to(gameId.toString()).emit('onFinishMeeting');
      }

      await meeting.update({
        isProccessing: false,
        results: {},
        votedList: [],
        lastMeeting: new Date(),
        meetingCount: meeting.meetingCount + 1,
      });
    } catch (err: unknown) {
      console.log(err);
    }
  };

  // Добавление голоса //  По результатм, если нет переввеса, сообщение, что собрание не состоялось
  const voteForPlayer: VoteForPlayer = async (
    gameId,
    playerId,
    oldTargetId,
    newTargetId,
    callback
  ) => {
    try {
      const meeting = await Meeting.findOne({
        where: {
          gameId,
        },
      });

      if (!meeting) throw new NotExistError(ErrorMessages.meetingNotFound);

      const votedResults = meeting.results[newTargetId];

      // Список проголосовавших
      const votedList = meeting.votedList;

      // Если ранее голосовал - убираем голос
      if (oldTargetId) {
        meeting.results[oldTargetId] -= 1;
      }

      // Обновляем результаты голосования для новой цели
      meeting.results[newTargetId] = votedResults ? votedResults + 1 : 1;

      // Если игрока нет в списке голосовавших - добавляем
      if (!votedList.includes(playerId)) {
        votedList.push(playerId);
        meeting.votedList = votedList;
      }

      meeting.changed('results', true);
      meeting.changed('votedList', true);
      await meeting.save();

      callback(meeting.votedList);
      socket.broadcast.to(gameId.toString()).emit('onVote', meeting.votedList);
    } catch (err: unknown) {
      console.log(err);
    }
  };

  // Снятие голоса
  const removeVote: RemoveVote = async (
    gameId,
    playerId,
    targetPlayerId,
    callback
  ) => {
    try {
      const meeting = await Meeting.findOne({
        where: {
          gameId,
        },
      });

      if (!meeting) throw new NotExistError(ErrorMessages.meetingNotFound);

      // Убираем проголосовавшего из массива проголосовавших
      const votedList = meeting.votedList;
      const filteredVotedList = votedList.filter(player => player !== playerId);

      meeting.votedList = filteredVotedList;

      // Обновляем таблицу результатов
      meeting.results[targetPlayerId] -= 1;
      meeting.changed('results', true);
      meeting.changed('votedList', true);
      await meeting.save();

      callback(meeting.votedList);
      socket.broadcast.to(gameId.toString()).emit('onVote', meeting.votedList);
    } catch (err: unknown) {
      console.log(err);
    }
  };

  // Выполнение задачи (мини-игры)
  const completeTask: CompleteTask = async gameId => {
    try {
      const civilTeam = await Team.findOne({
        where: {
          gameId,
        },
      });

      if (!civilTeam) throw new NotExistError(ErrorMessages.gameNotExist);

      if (civilTeam.score >= CIVIL_VICTORY_SCORE) {
        io.to(gameId.toString()).emit('onGameEnd', 'civil');
        const game = await Game.findOne({
          where: {
            id: gameId,
          },
        });

        if (!game) throw new NotExistError(ErrorMessages.gameNotExist);

        await game.update({
          status: 'finished',
        });
      }
    } catch (err: unknown) {
      console.log(err);
    }
  };

  socket.on('assembleMeeting', assembleMeeting);
  socket.on('voteForPlayer', voteForPlayer);
  socket.on('removeVote', removeVote);
  socket.on('completeTask', completeTask);
};
