import { Colors } from "./color.type";

/**
 * @description 폰트 스타일
 */
export type FontStyle = {
  size?: number;
  color?: Colors["font"];
  bold?: 400 | 700;
  underLine?: boolean;
  family: string;
};
