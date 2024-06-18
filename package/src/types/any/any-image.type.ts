import { Image } from "../images";

export type ImageObject<T> = T extends Image ? T : never;
