import type { PropsWithChildren } from "react";
import { CanvasContext, CanvasContextType } from "../contexts";
import { use_canvas_controller } from "@/controllers";

const CanvasProvider = ({ canvas = null, setCanvas = () => {}, children }: PropsWithChildren<Pick<CanvasContextType, "canvas" | "setCanvas">>) => {
  const { canvas: newCanvas, setCanvas: setNewCanvas, onchange } = use_canvas_controller(canvas, setCanvas);
  return <CanvasContext.Provider value={{ canvas: newCanvas, setCanvas: setNewCanvas, onchange }}>{children}</CanvasContext.Provider>;
};

export default CanvasProvider;
