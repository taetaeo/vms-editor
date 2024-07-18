import type { CanvasModelType, SetActionCanvasModelType } from "../types";
import type { CanvasContextType } from "../components/contexts";
import { useMultiState } from "../shared/hooks";
import { KEY_DOWN_CONST } from "../shared/enums";

export default function useCanvasController(
  canvas: CanvasModelType,
  setCanvas: SetActionCanvasModelType // canvas 상태 추가
) {
  const [eventObject, dispatchEventObject] = useMultiState<CanvasContextType["eventObject"]>({
    menuVisible: false,
    menuPosition: { x: 0, y: 0 },
  });

  const _setEventObject = (name: string, value: unknown) => dispatchEventObject({ name, value });

  const onCloseMenu = () => dispatchEventObject({ name: "menuVisible", value: false });

  const onOpenMenu = () => dispatchEventObject({ name: "menuVisible", value: true });

  const event_handler_key_down = (canvas: CanvasModelType, event: KeyboardEvent) => {
    if (!canvas) {
      return;
    }

    const { key, ctrlKey } = event;

    switch (key) {
      case "Delete":
        canvas.deleteSelectedObjects();
        break;
      case "z":
        if (!ctrlKey) return;

        break;
      default:
        break;
    }
  };

  const event_handler_mouse_down = (canvas: CanvasModelType, event: MouseEvent) => {
    if (event.button === undefined) {
      return null;
    }
    if (event.button === 0) {
      const dropdownMenuEl = document.getElementsByClassName("dropdown-menu-item")[0] as HTMLLIElement;
      const comparedEl = event.target as HTMLElement;

      if (!dropdownMenuEl || !comparedEl) {
        return;
      }

      if (dropdownMenuEl.className !== comparedEl.className) {
        return _onClickMouseLeftDown(canvas, event);
      }
    } else if (event.button === 2) {
      return _onClickMouseRightDown(canvas, event);
    }
  };

  /** 키보드 버튼 감지 */
  const addKeydownEventListener = (canvas: CanvasModelType) => {
    document.addEventListener(KEY_DOWN_CONST.KEY_DOWN, (e) => event_handler_key_down(canvas, e));
  };

  const removeKeydownEventListener = (canvas: CanvasModelType) => {
    document.removeEventListener(KEY_DOWN_CONST.KEY_DOWN, (e) => event_handler_key_down(canvas, e));
  };
  /** 키보드 버튼 감지 */

  /** 마우스 클릭 감지 */
  const addMouseEventListener = (canvas: CanvasModelType) => {
    document.addEventListener("mousedown", (e) => event_handler_mouse_down(canvas, e));
  };

  const removeMouseEventListener = (canvas: CanvasModelType) => {
    document.removeEventListener("mousedown", (e) => event_handler_mouse_down(canvas, e));
  };

  /** 마우스 클릭 감지 */

  /** 마우스 우측 클릭 감지 */
  const addMouseContextMenuEventListener = (canvas: CanvasModelType) => {
    document.addEventListener("contextmenu", (e) => event_handler_mouse_down(canvas, e));
  };

  const removeMouseContextMenuEventListener = (canvas: CanvasModelType) => {
    document.removeEventListener("contextmenu", (e) => event_handler_mouse_down(canvas, e));
  };
  /** 마우스 우측 클릭 감지 */

  const _onClickMouseLeftDown = (canvas: CanvasModelType, event: MouseEvent) => {
    onCloseMenu();
  };

  const _onClickMouseRightDown = (canvas: CanvasModelType, event: MouseEvent) => {
    if (!canvas) {
      return;
    }

    const { target, pageX, pageY, screenX, screenY } = event;
    const canvasContainerEl = document.getElementById("canvas-container");
    const canvasEditorEl = document.getElementsByClassName("upper-canvas")[0];

    if (target === canvasContainerEl || target === canvasEditorEl) {
      event.preventDefault();
      onOpenMenu();
      _setEventObject("menuPosition", { x: pageX, y: pageY });
    }
  };

  const _blockEvent = (event: MouseEvent) => {
    event.preventDefault();
  };

  return {
    canvas,
    setCanvas,
    onchange: {
      keyDown: event_handler_key_down,
      addKeydownEventListener,
      removeKeydownEventListener,
      addMouseEventListener,
      removeMouseEventListener,
      addMouseContextMenuEventListener,
      removeMouseContextMenuEventListener,
    },
    eventObject,
    handler: {
      onCloseMenu,
    },
  };
}
