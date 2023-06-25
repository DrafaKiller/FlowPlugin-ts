export type OrElse<T, Else = never> = T extends never ? Else : T;

export type ExtractOr<T, U, Else = never> = OrElse<Extract<T, U>, Else>;

export type Modify<T, R = {}> = Omit<T, keyof R> & R;

export type PromiseOr<T> = T | Promise<T>;
