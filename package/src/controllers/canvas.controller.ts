import { useEffect } from "react";
import { CanvasModelType, SetActionCanvasModelType } from "../types";
import { KEY_DOWN_CONST } from "../enums";
//

export default function useCanvasController(
  canvas: CanvasModelType,
  setCanvas: SetActionCanvasModelType // canvas 상태 추가
) {
  const event_handler_key_down = (canvas: CanvasModelType, event: KeyboardEvent) => {
    const { key } = event;

    if (!canvas) return;

    switch (key) {
      case "Delete":
        canvas.onDeleteSelectedObjects();
        break;
      default:
        break;
    }
  };

  const addKeydownEventListener = (canvas: CanvasModelType) => {
    document.addEventListener(KEY_DOWN_CONST.KEY_DOWN, (e) => event_handler_key_down(canvas, e));
  };

  const removeKeydownEventListener = (canvas: CanvasModelType) => {
    document.removeEventListener(KEY_DOWN_CONST.KEY_DOWN, (e) => event_handler_key_down(canvas, e));
  };

  return {
    canvas,
    setCanvas,
    onchange: {
      keyDown: event_handler_key_down,
      addKeydownEventListener,
      removeKeydownEventListener,
    },
  };
}
