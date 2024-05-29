import { BorderConfigs, ColorConfigs, FontSizeConfigs } from "@/app/configs";
import { FontStyle } from "./font.type";
import { ObjectOptionStyle, ObjectType } from "./object.type";

/**
 * @description 툴바 Config
 */
export type SelectedOptionConfigs = {
  type?: ObjectType;
  font: FontStyle;
  object: ObjectOptionStyle;
};

export type UiConfigs = {
  fontSizeConfigs: FontSizeConfigs;
  colorConfigs: ColorConfigs;
  borderConfigs: BorderConfigs;
};
