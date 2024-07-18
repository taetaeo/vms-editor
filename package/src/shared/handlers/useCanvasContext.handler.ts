import { useContext } from "react";

import { CanvasContext } from "../../components/contexts";

export default function useCanvasCtxHandler() {
  const context = useContext(CanvasContext);

  if (!context) {
    throw "canvas context is not provided...";
  }
  return context;
}
