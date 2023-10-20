export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type DeepNull<T> = T extends object
  ? {
      [P in keyof T]: DeepNull<T[P]> | null;
    }
  : T;
