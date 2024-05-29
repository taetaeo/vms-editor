import * as CSS from "csstype";

type Colors = {
  bg: CSS.Properties["backgroundColor"];
  font: CSS.Properties["color"];
  border: CSS.Properties["borderColor"];
};

type Border = {
  width: number;
  style: CSS.Properties["borderStyle"];
  color: Colors["border"];
};

/**
 * @description 객체 유형
 */
export type ObjectType = "rect" | "circle" | "text" | "image" | "video";

/**
 * @description 사이즈
 */
export type Size = {
  w: number;
  h: number;
};
/**
 * @description 좌표
 */
export type Coordinate = {
  x: number;
  y: number;
};

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
/**
 * @description 폰트 스타일
 */
export type FontStyle = {
  size?: number;
  color?: Colors["font"];
  bold?: 400 | 700;
  underLine?: boolean;
};
/**
 * @description 툴바 Config
 */
export type SelectedOptionConfigs = {
  type: ObjectType;
  font: FontStyle;
  object: ObjectOptionStyle;
};

// export type GroupOptionConfigs = {

// }

/**
 * @description Context의 상태관리 Key의 객체 타입
 */

export enum STATE_KEY {
  type = "type",
  FONT = "font",
  object = "object",
}
