declare type NestedKeys<
  T,
  Depth extends number[] = []
> = Depth["length"] extends 6
  ? never
  : {
      [K in Extract<keyof T, string>]: NonNullable<T[K]> extends object
        ? K | `${K}.${string & NestedKeys<NonNullable<T[K]>, [...Depth, 1]>}`
        : K;
    }[Extract<keyof T, string>];

declare type NestedRequired<T> = T extends object
  ? {
      [K in keyof T]-?: T[K] extends object
        ? NestedRequired<NonNullable<T[K]>>
        : NonNullable<T[K]>;
    }
  : T;

//? Extract values of "P" properties from objects in the maps array
declare type ArrayKeys<T, P extends string> = T extends {
  [key in P]: infer K;
}[]
  ? K
  : never;

type TValue = string | number | boolean | object | null;

type TAmountValue = string | number | null;
