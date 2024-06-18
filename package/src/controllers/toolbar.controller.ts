import React, { useEffect } from "react";
import { TOOLBAR_CONST_KEY } from "../enums";
import { AnyModelListType, AnyToolbarType } from "../types";
import { CanvasModel, TextBoxModel } from "../models";
import { useFormContext, useMultiState } from "../functions";
import { Utils } from "@/lib";

export default function useToolbarController<T>() {
  const utils = new Utils();
  const [isActive, setIsActive] = React.useState<boolean>(false);

  const [selectedObjects, setSelectedObjects] = React.useState<AnyModelListType | null>(null);

  const { selectedData } = useFormContext();

  const [selectedOptions, setValue] = useMultiState<T>({
    type: undefined,
    font: {
      size: 48,
      color: "#fff",
      bold: 400,
      underLine: false,
      family: "Arial",
    },
    object: {
      size: { w: 200, h: 200 },
      coord: { x: 500, y: 500 },
      style: {
        background: "#000",
        border: { width: 1, style: "solid", color: "black" },
      },
    },
  });

  /**
   * =======================================================================
   *
   *                             State Functions
   *
   * =======================================================================
   */

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

  /**
   * =======================================================================
   *
   *                               style Change Event
   *
   * =======================================================================
   */

  const onchangeObjectFontBold = <T extends object, I extends object, V extends object>(canvas: CanvasModel<T, I, V>, value: unknown) => {
    private_update_style("font", "fontWeight", value);
    private_rerender(canvas);
  };

  const onchangeObjectFontColor = <T extends object, I extends object, V extends object>(canvas: CanvasModel<T, I, V>, value: unknown) => {
    private_update_style("font", "fill", value);
    private_rerender(canvas);
  };

  const onchangeObjectFontSize = <T extends object, I extends object, V extends object>(canvas: CanvasModel<T, I, V>, value: unknown) => {
    private_update_style("font", "fontSize", value);
    private_rerender(canvas);
  };

  const onchangeObjectFontUnderline = <T extends object, I extends object, V extends object>(canvas: CanvasModel<T, I, V>, value: unknown) => {
    private_update_style("font", "underline", value);
    private_rerender(canvas);
  };

  const onchangeObjectBackgroundColor = <T extends object, I extends object, V extends object>(canvas: CanvasModel<T, I, V>, value: unknown) => {
    private_update_style("object", "backgroundColor", value);
    private_rerender(canvas);
  };

  const onchangeObjectBorderWidth = <T extends object, I extends object, V extends object>(canvas: CanvasModel<T, I, V>, value: unknown) => {};

  const onchangeObjectWidth = <T extends object, I extends object, V extends object>(canvas: CanvasModel<T, I, V>, value: unknown) => {
    private_update_style("object", "width", value);
    private_rerender(canvas);
  };

  const onchangeObjectHeight = <T extends object, I extends object, V extends object>(canvas: CanvasModel<T, I, V>, value: unknown) => {
    private_update_style("object", "height", value);
    private_rerender(canvas);
  };

  const onchangeObjectCoordX = <T extends object, I extends object, V extends object>(canvas: CanvasModel<T, I, V>, value: unknown) => {
    private_update_style("object", "left", value);
    private_rerender(canvas);
  };
  const onchangeObjectCoordY = <T extends object, I extends object, V extends object>(canvas: CanvasModel<T, I, V>, value: unknown) => {
    private_update_style("object", "top", value);
    private_rerender(canvas);
  };

  /**
   * ===================================================================================================================
   *                                          Private Functions
   * ===================================================================================================================
   */

  const private_update_style = (type: "font" | "object", key: string, value: unknown) => {
    selectedObjects?.map((object, _) => (object as TextBoxModel).onChangeStyle(type, key, value));
  };

  const private_rerender = <T extends object, I extends object, V extends object>(canvas: CanvasModel<T, I, V>) => {
    canvas?.requestRenderAll();
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

  return {
    isActive,
    toggle,
    selectedOptions,
    onchangeValue,
    callbackFn: getSelectedObjectFromCallbackFn,

    onchangeObjectBackgroundColor,
    onchangeObjectBorderWidth,
    onchangeObjectFontBold,
    onchangeObjectFontColor,
    onchangeObjectFontSize,
    onchangeObjectFontUnderline,
    onchangeObjectWidth,
    onchangeObjectHeight,
    onchangeObjectCoordX,
    onchangeObjectCoordY,
  };
}
