export const enum GameStage {
  MEMORIZATION = "memorization",
  REPRODUCTION = "reproduction",
}

export type GameStatus = {
  stage: GameStage;
  level: number;
};

type Callback = () => void;

export type GameContext = {
  gameStatusRef: React.MutableRefObject<GameStatus>;

  memorizationSequenceRef: React.MutableRefObject<
    number[]
  >;
  expandMemorizationSequence: Callback;

  switchStageType: Callback;
  increaseStageLevel: Callback;
};
