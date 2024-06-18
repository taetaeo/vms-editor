import { useContext } from "react";
//
import { CanvasContext } from "../contexts";

export default function useCanvasContext() {
  const context = useContext(CanvasContext);

  if (!context) {
    throw "canvas context is not provided...";
  }
  return context;
}
