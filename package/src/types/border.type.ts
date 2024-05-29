import * as CSS from "csstype";
import { Colors } from "./color.type";

export type Border = {
  width: number;
  style: CSS.Properties["borderStyle"];
  color: Colors["border"];
};
