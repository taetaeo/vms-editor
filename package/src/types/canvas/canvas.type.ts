import { ImageModel, TextBoxModel, TextModel, VideoModel } from "models";

export type CanvasObject = fabric.Object;
export type AnyObject = TextModel | TextBoxModel | ImageModel | VideoModel;
export type ObjectList = AnyObject[] | CanvasObject[];
