import * as CSS from "csstype";
import { ObjectColors } from "./object-color.type";

export type ObjectBorder = {
  width: number;
  style: CSS.Properties["borderStyle"];
  color: ObjectColors["border"];
};
