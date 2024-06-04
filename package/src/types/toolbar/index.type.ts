import { ObjectOptionStyle } from "../../types/objects/index.type";
import { ObjectFontStyle } from "../../types/objects/object-font.type";
import { ObjectVariant } from "../../types/objects/object-variant.type";

/**
 * @description Toolbar Configs's type
 */
export type ToolbarSelectedOptionConfigs = {
  type: ObjectVariant;
  font: ObjectFontStyle;
  object: ObjectOptionStyle;
};
