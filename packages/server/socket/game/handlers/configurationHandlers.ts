import { ColorSelect, GameSocket, SuitColorsType } from '../../../types/socket/game/gameSocket.types';

export const configurationHandlers = (socket: GameSocket) => {
  const selectedColors: SuitColorsType = {
    white: false,
    red: false,
    green: false,
    blue: false,
    yellow: false,
    purple: false,
    aquamarine: false,
    brown: false,
    grey: false,
  };

  const selectColor: ColorSelect = (color, oldColor, callback) => {
    if (oldColor) {
      selectedColors[oldColor] = false;
    }
    
    const chosenColor = selectedColors[color];
    if (!chosenColor) {
      selectedColors[color] = true;
    }

    callback(color);

    socket.broadcast.emit('selectedColors', selectedColors);
  };

  socket.on('colorSelect', selectColor);
};
