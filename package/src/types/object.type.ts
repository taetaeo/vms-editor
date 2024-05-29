import { ImageModel, TextBoxModel, TextModel, VideoModel } from "@/models";
import { Border } from "./border.type";
import { Colors } from "./color.type";
import { Coordinate } from "./coord.type";
import { Size } from "./size.type";

export type ObjectType = "rect" | "circle" | "text" | "image" | "video";

export type ObjectStyle = {
  background: Colors["bg"];
  border: Border;
};

/**
 * @description 객체 스타일
 */
export type ObjectOptionStyle = {
  size: Size;
  coord: Coordinate;
  style: ObjectStyle;
};

export type InputObject = TextModel[] | TextBoxModel[] | ImageModel[] | VideoModel[] | null;
