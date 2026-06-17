type Primitive = string | number | boolean | null | undefined;

type WidenStrings<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? WidenStrings<U>[]
    : T extends object
      ? { [K in keyof T]: WidenStrings<T[K]> }
      : T;

export type { WidenStrings };

export type DeepStringKey<T, Prefix extends string = ''> = T extends Primitive
  ? Prefix
  : T extends readonly unknown[]
    ? never
    : T extends Record<string, unknown>
      ? {
          [K in keyof T & string]: DeepStringKey<T[K], Prefix extends '' ? K : `${Prefix}.${K}`>;
        }[keyof T & string]
      : never;
