export type AnyToolbarType<T> = T extends { object: any; font: any; type: any } ? T : never;
