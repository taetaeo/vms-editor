import { ObjectOptionStyle } from "../objects/index.type";
import { ObjectFontStyle } from "../objects/object-font.type";
import { ObjectVariant } from "../objects/object-variant.type";
import { ObjectSize } from "../objects/object-size.type";

/**
 * @description Toolbar Configs's type
 */
export type ToolbarSelectedOptionConfigs = {
  pixel: number;
  editorSize: ObjectSize;
  type: ObjectVariant;
  font: ObjectFontStyle;
  object: ObjectOptionStyle;
};
