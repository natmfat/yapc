export type Nullable<T> = T | null;

export type Defined<T, U extends keyof T> = Omit<T, U> & {
  [Key in U]: NonNullable<T[Key]>;
};
