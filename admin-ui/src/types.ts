export type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> };

export type Nullable<T> = T | null;

export type ExtractKeys<T> = keyof { [K in keyof T & string as `${K}.${keyof T[K] & string}`]: T[K] };
