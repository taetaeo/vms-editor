import type { Dispatch, SetStateAction } from "react";
import { CanvasModel } from "../../models";
import { ObjectConfigsImageObject, ObjectConfigsTextObject, ObjectConfigsVideoObject } from "../../configs";

export type CanvasModelType = CanvasModel<ObjectConfigsTextObject, ObjectConfigsImageObject, ObjectConfigsVideoObject> | null;
export type SetActionCanvasModelType = Dispatch<SetStateAction<CanvasModelType>>;
