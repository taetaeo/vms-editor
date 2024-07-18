import React, { useEffect } from "react";

// Types
import type { AnyModelListType, AnyToolbarType } from "../types";
// Models
import { CanvasModel, TextBoxModel } from "../models";
// Utils
import { Utils } from "../shared/lib/utils";
// Handler
import { useFormCtxHandler } from "../shared/handlers";
// Hooks
import { useMultiState } from "../shared/hooks";
// Constants
import { TOOLBAR_CONST_KEY } from "../shared/enums";

const utils = new Utils();

export default function useToolbarController<T>() {
  const { selectedData } = useFormCtxHandler();

  const [isActive, setIsActive] = React.useState<boolean>(false);

  const [selectedObjects, setSelectedObjects] = React.useState<AnyModelListType | null>(null);

  const [selectedOptions, setValue] = useMultiState<T>({
    pixel: 16,
    editorSize: { w: 416, h: 320 },
    type: undefined,
    font: { size: 48, color: "#fff", bold: 400, underLine: false, family: "Arial", align: "left" },
    object: { size: { w: 0, h: 0 }, coord: { x: 0, y: 0 }, style: { background: "#000", border: { width: 1, style: "solid", color: "black" } } },
  });

  const onchangeValue = (name: TOOLBAR_CONST_KEY, value: unknown) => setValue({ name, value });

  /**
   * 토글
   * @returns
   */
  const toggle = () => setIsActive((prev) => !prev);

  /**
   * 콜백을 통해서 선택한 객체 가져오기
   * @param objects
   * @returns
   */
  const getSelectedObjectFromCallbackFn = (objects?: AnyModelListType | null) => {
    if (!objects) return;
    setSelectedObjects(objects);
  };

  useEffect(() => {
    const snapshot = selectedOptions as AnyToolbarType<T>;

    if (!selectedData || utils.isEmptyObject(selectedData)) return;

    const { style, w, h } = selectedData;

    if (w !== undefined || h !== undefined) {
      const newSize = { w, h };
      onchangeValue(TOOLBAR_CONST_KEY.object, { ...snapshot.object, size: newSize });
    }

    if (style.fontSz !== undefined) {
      onchangeValue(TOOLBAR_CONST_KEY.FONT, { ...snapshot.font, size: style.fontSz });
    }
  }, [selectedData]);

  /**
   * =================================== < Outer Functions > ===================================
   */

  const onchangeObjectFontBold = <T extends object, I extends object, V extends object>(canvas: CanvasModel<T, I, V>, value: unknown) => {
    _updateStyle("font", "fontWeight", value);
    _rerender(canvas);
  };

  const onchangeObjectFontSize = <T extends object, I extends object, V extends object>(canvas: CanvasModel<T, I, V>, value: unknown) => {
    _updateStyle("font", "fontSize", value);
    _rerender(canvas);
  };

  const onchangeObjectFontUnderline = <T extends object, I extends object, V extends object>(canvas: CanvasModel<T, I, V>, value: unknown) => {
    _updateStyle("font", "underline", value);
    _rerender(canvas);
  };

  const onchangeObjectFontAlign = <T extends object, I extends object, V extends object>(canvas: CanvasModel<T, I, V>, value: unknown) => {
    _updateStyle("font", "textAlign", value);
    _rerender(canvas);
  };

  const onchangeObjectFontColor = <T extends object, I extends object, V extends object>(canvas: CanvasModel<T, I, V>, value: unknown) => {
    _updateStyle("font", "fill", value);
    _rerender(canvas);
  };

  const onchangeObjectBackgroundColor = <T extends object, I extends object, V extends object>(canvas: CanvasModel<T, I, V>, value: unknown) => {
    _updateStyle("object", "backgroundColor", value);
    _rerender(canvas);
  };

  const onchangeObjectBorderWidth = <T extends object, I extends object, V extends object>(canvas: CanvasModel<T, I, V>, value: unknown) => {};

  const onchangeObjectWidth = <T extends object, I extends object, V extends object>(canvas: CanvasModel<T, I, V>, value: unknown) => {
    _updateStyle("object", "width", value);
    _rerender(canvas);
  };

  const onchangeObjectHeight = <T extends object, I extends object, V extends object>(canvas: CanvasModel<T, I, V>, value: unknown) => {
    _updateStyle("object", "height", value);
    _rerender(canvas);
  };

  const onchangeObjectCoordX = <T extends object, I extends object, V extends object>(canvas: CanvasModel<T, I, V>, value: unknown) => {
    _updateStyle("object", "left", value);
    _rerender(canvas);
  };
  const onchangeObjectCoordY = <T extends object, I extends object, V extends object>(canvas: CanvasModel<T, I, V>, value: unknown) => {
    _updateStyle("object", "top", value);
    _rerender(canvas);
  };

  /**
   * =================================== </ Outer Functions > ===================================
   */

  /**
   * =================================== < Inner Functions > ===================================
   */

  const _updateStyle = (type: "font" | "object", key: string, value: unknown) => {
    selectedObjects?.map((object, _) => (object as TextBoxModel).onChangeStyle(type, key, value));
  };

  const _rerender = <T extends object, I extends object, V extends object>(canvas: CanvasModel<T, I, V>) => {
    canvas?.requestRenderAll();
  };

  /**
   * =================================== </ Inner Functions > ===================================
   */

  return {
    isActive,
    toggle,
    selectedOptions,
    onchangeValue,
    callbackFn: getSelectedObjectFromCallbackFn,

    onchangeObjectBackgroundColor,
    onchangeObjectBorderWidth,
    // 텍스트 객체 설정
    onchangeObjectFontBold,
    onchangeObjectFontSize,
    onchangeObjectFontUnderline,
    onchangeObjectFontAlign,
    onchangeObjectFontColor,
    // 일반 객체 설정
    onchangeObjectWidth,
    onchangeObjectHeight,
    onchangeObjectCoordX,
    onchangeObjectCoordY,
  };
}
