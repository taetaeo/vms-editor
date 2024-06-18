import { Dispatch, SetStateAction, createContext } from "react";
//
import { CanvasModelType } from "../types";

export type CanvasContextType = {
  canvas: CanvasModelType;
  setCanvas: Dispatch<SetStateAction<CanvasModelType>>;
  onchange?: {
    keyDown: (cavas: CanvasModelType, event: KeyboardEvent) => void;
    addKeydownEventListener: (canvas: CanvasModelType) => void;
    removeKeydownEventListener: (canvas: CanvasModelType) => void;
  };
};

const CanvasContext = createContext<CanvasContextType>({
  canvas: null,
  setCanvas: () => {},
  onchange: undefined,
});
export default CanvasContext;
