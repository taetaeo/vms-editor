type Id = string | number | undefined | null;
export type AnyObjectType<T> = T extends { id: Id; objectId: Id } ? T : never;
