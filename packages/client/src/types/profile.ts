export type ProfileChoice = 'password' | 'data' | 'avatar';

export type IProfileConditionTable = {
  [k in ProfileChoice]: () => JSX.Element;
};
