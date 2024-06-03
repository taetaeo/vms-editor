import { ObjectColors } from "./object-color.type";
import { ObjectBorder } from "./object-border.type";
import { ObjectCoordinate } from "./object-coord.type";
import { ObjectSize } from "./object-size.type";

export type ObjectStyleProps = {
  background: ObjectColors["bg"];
  border: ObjectBorder;
};
/**
 * @description 객체 스타일
 */
export type ObjectOptionStyle = {
  size: ObjectSize;
  coord: ObjectCoordinate;
  style: ObjectStyleProps;
};
