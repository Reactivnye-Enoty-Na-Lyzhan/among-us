export type EmptyRecord = { [key in never]: any };

export type OmitKeys<
  T extends Record<string, unknown>,
  K extends keyof T
> = Omit<T, K>;
