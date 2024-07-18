import { Image } from "../images/index.type";

export type ImageObject<T> = T extends Image ? T : never;
