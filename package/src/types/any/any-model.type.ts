import { ImageModel, TextBoxModel, TextModel, VideoModel } from "../../models";

export type AnyModelType = TextModel | TextBoxModel | ImageModel | VideoModel;
export type AnyModelListType = AnyModelType[] | fabric.Object[];
