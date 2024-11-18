export type ClassProperties<T> = { [P in keyof T]: T[P] };

export type DtoConstructor<T> = new (properties: ClassProperties<T>) => object;
