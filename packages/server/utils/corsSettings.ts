interface ICorsSettings {
  origin: string[],
}

export const corsSettings: ICorsSettings = {
  origin: [
    `http://localhost:${process.env.CLIENT_PORT || 3001}`,
  ]
};
