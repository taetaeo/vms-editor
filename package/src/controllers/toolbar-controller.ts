import React from "react";
import { TOOLBAR_CONST_KEY } from "../enums";
import { ObjectList, ToolbarSelectedOptionConfigs } from "../types";
import { CanvasModel, TextBoxModel } from "../models";
import { useMultiState } from "../functions";

export default function useToolbarController<T>() {
  const [isActive, setIsActive] = React.useState<boolean>(false);

  const [selectedObjects, setSelectedObjects] = React.useState<ObjectList | null>(null);

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
  const getSelectedObjectFromCallbackFn = (objects?: ObjectList | null) => {
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
    // private_onchangeConfigs(canvas, "font", "bold", value);
  };

  const onchangeObjectFontColor = <T extends object, I extends object, V extends object>(canvas: CanvasModel<T, I, V>, value: unknown) => {
    private_update_style("font", "fill", value);
    private_rerender(canvas);
    // private_onchangeConfigs(canvas, "font", "color", value);
  };

  const onchangeObjectFontSize = <T extends object, I extends object, V extends object>(canvas: CanvasModel<T, I, V>, value: unknown) => {
    private_update_style("font", "fontSize", value);
    private_rerender(canvas);
    // private_onchangeConfigs(canvas, "font", "size", value);
  };

  const onchangeObjectFontUnderline = <T extends object, I extends object, V extends object>(canvas: CanvasModel<T, I, V>, value: unknown) => {
    private_update_style("font", "underline", value);
    private_rerender(canvas);
    // private_onchangeConfigs(canvas, "font", "underline", value);
  };

  const onchangeObjectBackgroundColor = <T extends object, I extends object, V extends object>(canvas: CanvasModel<T, I, V>, value: unknown) => {
    private_update_style("object", "backgroundColor", value);
    private_rerender(canvas);
    // private_onchangeConfigs(canvas, "object", "background", value);
  };

  const onchangeObjectBorderWidth = <T extends object, I extends object, V extends object>(canvas: CanvasModel<T, I, V>, value: unknown) => {};

  const onchangeObjectWidth = <T extends object, I extends object, V extends object>(canvas: CanvasModel<T, I, V>, value: unknown) => {
    private_update_style("object", "width", value);
    private_rerender(canvas);
    // private_onchangeConfigs(canvas,'object');
  };

  const onchangeObjectHeight = <T extends object, I extends object, V extends object>(canvas: CanvasModel<T, I, V>, value: unknown) => {
    private_update_style("object", "height", value);
    private_rerender(canvas);
    // private_onchangeConfigs(canvas,'object',value);
  };

  const onchangeObjectCoordX = <T extends object, I extends object, V extends object>(canvas: CanvasModel<T, I, V>, value: unknown) => {
    private_update_style("object", "left", value);
    private_rerender(canvas);
    // private_onchangeConfigs(canvas,'object');
  };
  const onchangeObjectCoordY = <T extends object, I extends object, V extends object>(canvas: CanvasModel<T, I, V>, value: unknown) => {
    private_update_style("object", "top", value);
    private_rerender(canvas);
    // private_onchangeConfigs(canvas,"object",value);
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

  const private_onchangeConfigs = <T extends object, I extends object, V extends object>(
    canvas: CanvasModel<T, I, V>,
    type: "font" | "object",
    key: string,
    value: unknown
  ) => {
    const snapshot = { ...selectedOptions } as ToolbarSelectedOptionConfigs;

    if (type === "font") {
      const newFontStyle = {
        ...snapshot.font,
        [key]: value,
      };
      snapshot.font = newFontStyle;
    } else if (type === "object") {
      const newObjectStyle = {
        ...snapshot.object,

        style: {
          ...snapshot.object.style,
          [key]: value,
        },
      };

      snapshot.object = newObjectStyle;
    }

    canvas.onChangeConfigsOption(snapshot);
  };

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
