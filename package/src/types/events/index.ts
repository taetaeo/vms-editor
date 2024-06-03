import { CanvasModel } from "@/models";

export type ChangeHandler = <T extends object, I extends object, V extends object>(canvas: CanvasModel<T, I, V>, value: unknown) => void;
