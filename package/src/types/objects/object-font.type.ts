import { ObjectColors } from "./object-color.type";

/**
 * @description 폰트 스타일
 */
export type ObjectFontStyle = {
  size?: number;
  color?: ObjectColors["font"];
  bold?: 400 | 700;
  underLine?: boolean;
  family: string;
};
