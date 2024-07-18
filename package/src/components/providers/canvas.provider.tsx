import type { PropsWithChildren } from "react";

import { useCanvasController } from "../../controllers";
import { CanvasContext, CanvasContextType } from "../contexts";

const CanvasProvider = ({ canvas = null, setCanvas = () => {}, children }: PropsWithChildren<Pick<CanvasContextType, "canvas" | "setCanvas">>) => {
  // Controller
  const { canvas: newCanvas, setCanvas: setNewCanvas, onchange, eventObject, handler } = useCanvasController(canvas, setCanvas);

  return <CanvasContext.Provider value={{ canvas: newCanvas, setCanvas: setNewCanvas, onchange, eventObject, handler }}>{children}</CanvasContext.Provider>;
};

export default CanvasProvider;
