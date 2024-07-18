import { fabric } from "fabric";
import { type FC, type ChangeEvent, type MouseEvent, useRef } from "react";
import uuid from "react-uuid";
import { ColorPicker, ColorPickerChangeEvent } from "primereact/colorpicker";

import { toolbarConfigs } from "@/configs";
// Lib
import { Utils } from "../shared/lib";

// Functions
import { useToolbarCtxHandler, useVideoCtxHandler, useCanvasCtxHandler } from "../shared/handlers";

import { useToggleToolbar, useToggle } from "../shared/hooks";
// Types
import type { Align, Direction, ObjectVariant } from "../types";
// Enums
import { TOOLBAR_CONST_KEY } from "../shared/enums";

import { TextInteractiveModel } from "../models";

const utils = new Utils();

const ToolbarView = () => {
  const videoCtx = useVideoCtxHandler();
  const canvasCtx = useCanvasCtxHandler();
  const toolbarCtx = useToolbarCtxHandler();

  const { pixelActive, frameActive, addActive, textActive, objectActive, previewActive, groupActive, toggle } = useToggleToolbar();

  const { isOpen: isShowFontColor, onToggle: onToggleAboutFontColor } = useToggle();

  const videoInputRef = useRef<HTMLInputElement>(null);

  if (!canvasCtx.canvas) return null;

  const onChangePixel = (e: MouseEvent<HTMLButtonElement>) => {
    const { id, value } = e.target as HTMLButtonElement;

    if (id !== "pixel" || !value) return; // 에외처리

    const pixel = Number(value);

    if (toolbarCtx.onchangeValue && typeof toolbarCtx.onchangeValue === "function") {
      toolbarCtx.onchangeValue(id as TOOLBAR_CONST_KEY, pixel);
    }

    canvasCtx.canvas!.updatePixel(pixel);
  };

  const onChangeEditorSize = (e: MouseEvent<HTMLButtonElement>) => {
    const { id, value } = e.target as HTMLButtonElement;

    const [h, w] = value.split("_");

    if (!h || !w) return;

    const width = Number(w);
    const height = Number(h);

    if (toolbarCtx.onchangeValue && typeof toolbarCtx.onchangeValue === "function") {
      toolbarCtx.onchangeValue(id as TOOLBAR_CONST_KEY, { w: width, h: height });
    }

    canvasCtx.canvas!.updateWh("w", width);
    canvasCtx.canvas!.updateWh("h", height);
    canvasCtx.canvas!.clearCanvas();
  };

  /**글씨 사이즈 설정 */
  const onChangeObjectType = (e: MouseEvent<HTMLButtonElement>) => {
    const { id, value } = e.target as HTMLButtonElement;

    if (toolbarCtx.onchangeValue && typeof toolbarCtx.onchangeValue === "function") {
      toolbarCtx.onchangeValue(id as TOOLBAR_CONST_KEY, toolbarCtx.selectedOptions?.type === "image" ? undefined : value);
    }

    const interactiveText = new TextInteractiveModel("텍스트를 입력", {
      left: toolbarCtx.selectedOptions?.object.coord.x, // x 축
      top: toolbarCtx.selectedOptions?.object.coord.y, // Y축
      width: 120,
      height: 320,
      // minWidth: 120, // 최소 너비 설정
      // minHeight: 320, // 최소 높이 설정

      fontSize: toolbarCtx.selectedOptions?.font.size || 14, // 폰트 사이즈
      fill: toolbarCtx.selectedOptions?.font.color, // 폰트 색상
      fontWeight: toolbarCtx.selectedOptions?.font.bold, // 굵기
      underline: toolbarCtx.selectedOptions?.font.underLine, // 밑줄
      fontFamily: toolbarCtx.selectedOptions?.font.family, // 폰트 스타일
      backgroundColor: toolbarCtx.selectedOptions?.object.style.background, // 배경색
    });

    const textObject = canvasCtx.canvas!.createObjectByType(value as ObjectVariant, "" || "텍스트입력", {
      id: uuid(),
      left: toolbarCtx.selectedOptions?.object.coord.x, // x 축
      top: toolbarCtx.selectedOptions?.object.coord.y, // Y축
      width: toolbarCtx.selectedOptions?.object.size.w, // 너비
      height: toolbarCtx.selectedOptions?.object.size.h, // 높이
      fontSize: toolbarCtx.selectedOptions?.font.size || 14, // 폰트 사이즈
      fill: toolbarCtx.selectedOptions?.font.color, // 폰트 색상
      fontWeight: toolbarCtx.selectedOptions?.font.bold, // 굵기
      underline: toolbarCtx.selectedOptions?.font.underLine, // 밑줄
      fontFamily: toolbarCtx.selectedOptions?.font.family, // 폰트 스타일
      backgroundColor: toolbarCtx.selectedOptions?.object.style.background, // 배경색
      // stroke: selectedOptions?.object.style.border.color,
      // strokeWidth: selectedOptions?.object.style.border.width,
      selectionBorderColor: toolbarCtx.selectedOptions?.object.style.border.color,
      current: value === "video" ? videoInputRef.current : null,
    });

    if (!textObject) return;

    canvasCtx.canvas!.add(textObject as fabric.Object);

    if (toolbarCtx.onchangeValue && typeof toolbarCtx.onchangeValue === "function") {
      toolbarCtx.onchangeValue(id as TOOLBAR_CONST_KEY, undefined);
    }
  };

  /** 글씨 굵기 설정 */
  const onChangeFontBold = (e: MouseEvent<HTMLButtonElement>) => {
    if (!canvasCtx.canvas) return;

    const { id, value } = e.target as HTMLButtonElement;

    const [font, bold] = id.split("_");

    if (!font) return;

    const targetValue = Number(value) == 700 ? 400 : 700;

    if (canvasCtx.canvas.selectedObjects) {
      utils.checkFunctionAfterExecute(toolbarCtx.onchangeObjectFontBold, canvasCtx.canvas, targetValue);
    }

    utils.checkFunctionAfterExecute(toolbarCtx.onchangeValue, font as TOOLBAR_CONST_KEY, { ...toolbarCtx.selectedOptions?.font, bold: targetValue });
  };

  /** 글씨 사이즈 설정 */
  const onChangeFontSize = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!canvasCtx.canvas) return;

    const { id, value } = e.target;

    const [font, size] = id.split("_");

    if (!font) return;

    const targetValue = Number(value);

    if (canvasCtx.canvas.selectedObjects) {
      utils.checkFunctionAfterExecute(toolbarCtx.onchangeObjectFontSize, canvasCtx.canvas, targetValue);
    }

    utils.checkFunctionAfterExecute(toolbarCtx.onchangeValue, font as TOOLBAR_CONST_KEY, { ...toolbarCtx.selectedOptions?.font, size: targetValue });
  };

  /** 글씨 밑줄 설정 */
  const onChangeFontUnderline = (e: MouseEvent<HTMLButtonElement>) => {
    const { id, value } = e.target as HTMLButtonElement;

    const [font, underline] = id.split("_");

    if (!font) return;

    const targetValue = Number(value) === 1 ? false : true;

    if (canvasCtx.canvas!.selectedObjects) {
      utils.checkFunctionAfterExecute(toolbarCtx.onchangeObjectFontUnderline, canvasCtx.canvas!, targetValue);
    }

    utils.checkFunctionAfterExecute(toolbarCtx.onchangeValue, font as TOOLBAR_CONST_KEY, { ...toolbarCtx.selectedOptions?.font, underLine: targetValue });
  };

  /** 글씨 정렬 설정 */
  const onChangeFontAlign = (e: MouseEvent<HTMLButtonElement>) => {
    const { id, value } = e.target as HTMLButtonElement;
    console.log(id, value);

    const [font, align] = id.split("_");

    if (!font || !align) return;

    if (canvasCtx.canvas!.selectedObjects) {
      utils.checkFunctionAfterExecute(toolbarCtx.onchangeObjectFontAlign, canvasCtx.canvas!, value);
    }

    utils.checkFunctionAfterExecute(toolbarCtx.onchangeValue, font as TOOLBAR_CONST_KEY, { ...toolbarCtx.selectedOptions?.font, color: value });
  };

  /** 글자 색상 변경 */
  const onChangeFontColor = (e: MouseEvent<HTMLButtonElement>) => {
    const { id, value } = e.target as HTMLButtonElement;

    const [font, color] = id.split("_");

    if (!font || !color) return;

    if (canvasCtx.canvas!.selectedObjects) {
      utils.checkFunctionAfterExecute(toolbarCtx.onchangeObjectFontColor, canvasCtx.canvas!, value);
    }

    utils.checkFunctionAfterExecute(toolbarCtx.onchangeValue, font as TOOLBAR_CONST_KEY, { ...toolbarCtx.selectedOptions?.font, color: value });
  };

  /**객체 사이즈 설정 */
  const onChangeObjectSize = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    const [object, size, wh] = id.split("_");

    const targetValue = Number(value);

    // 너비 설정
    if (wh === "w") {
      if (canvasCtx.canvas!.selectedObjects) {
        utils.checkFunctionAfterExecute(toolbarCtx.onchangeObjectWidth, canvasCtx.canvas!, value);
      }
      utils.checkFunctionAfterExecute(toolbarCtx.onchangeValue, object as TOOLBAR_CONST_KEY, {
        ...toolbarCtx.selectedOptions?.object,
        size: { ...toolbarCtx.selectedOptions?.object.size, w: targetValue },
      });
    }
    // 높이 설정
    else if (wh === "h") {
      if (canvasCtx.canvas!.selectedObjects) {
        utils.checkFunctionAfterExecute(toolbarCtx.onchangeObjectHeight, canvasCtx.canvas!, value);
      }
      utils.checkFunctionAfterExecute(toolbarCtx.onchangeValue, object as TOOLBAR_CONST_KEY, {
        ...toolbarCtx.selectedOptions?.object,
        size: { ...toolbarCtx.selectedOptions?.object.size, h: targetValue },
      });
    }
  };

  /** 객체 좌표 설정 */
  const onChangeObjectCoord = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    const [object, size, coord] = id.split("_");

    const targetValue = Number(value);
    // X좌표
    if (coord === "x") {
      if (canvasCtx.canvas!.selectedObjects) {
        utils.checkFunctionAfterExecute(toolbarCtx.onchangeObjectCoordX, canvasCtx.canvas!, targetValue);
      }
      utils.checkFunctionAfterExecute(toolbarCtx.onchangeValue, object as TOOLBAR_CONST_KEY, {
        ...toolbarCtx.selectedOptions?.object,
        coord: { ...toolbarCtx.selectedOptions?.object.coord, x: targetValue },
      });
    }
    // Y좌표
    else if (coord === "y") {
      if (canvasCtx.canvas!.selectedObjects) {
        utils.checkFunctionAfterExecute(toolbarCtx.onchangeObjectCoordY, canvasCtx.canvas!, targetValue);
      }
      utils.checkFunctionAfterExecute(toolbarCtx.onchangeValue, object as TOOLBAR_CONST_KEY, {
        ...toolbarCtx.selectedOptions?.object,
        coord: { ...toolbarCtx.selectedOptions?.object.coord, y: targetValue },
      });
    }
  };

  /**객체 배경색 설정 */
  const onChangeObjectBgColor = (e: MouseEvent<HTMLButtonElement>) => {
    const { id, value } = e.target as HTMLButtonElement;

    const [object, style, background, color] = id.split("_");

    if (canvasCtx.canvas!.selectedObjects) {
      utils.checkFunctionAfterExecute(toolbarCtx.onchangeObjectBackgroundColor, canvasCtx.canvas!, color);
    }

    utils.checkFunctionAfterExecute(toolbarCtx.onchangeValue, object as TOOLBAR_CONST_KEY, {
      ...toolbarCtx.selectedOptions?.object,
      style: { ...toolbarCtx.selectedOptions?.object.style, background: color },
    });
  };

  /** 객체 테두리 색상 설정 */
  const onChangeObjectBorderColor = (e: MouseEvent<HTMLButtonElement>) => {
    const { id, value } = e.target as HTMLButtonElement;

    const [object, style, border, color] = id.split("_");

    if (toolbarCtx.onchangeValue && typeof toolbarCtx.onchangeValue === "function") {
      toolbarCtx.onchangeValue(object as TOOLBAR_CONST_KEY, {
        ...toolbarCtx.selectedOptions?.object,
        style: {
          ...toolbarCtx.selectedOptions?.object.style,
          border: {
            ...toolbarCtx.selectedOptions?.object.style.border,
            color,
          },
        },
      });
    }
  };

  /**객체 테두리 스타일 설정 */
  const onChangeObjectBorderStyle = (e: MouseEvent<HTMLButtonElement>) => {
    const { id, value } = e.target as HTMLButtonElement;

    const [object, style, border, borderStyle] = id.split("_");

    if (toolbarCtx.onchangeValue && typeof toolbarCtx.onchangeValue === "function") {
      toolbarCtx.onchangeValue(object as TOOLBAR_CONST_KEY, {
        ...toolbarCtx.selectedOptions?.object,
        style: {
          ...toolbarCtx.selectedOptions?.object.style,
          border: {
            ...toolbarCtx.selectedOptions?.object.style.border,
            style: borderStyle,
          },
        },
      });
    }
  };

  /**객체 테두리 너비 설정 */
  const onChangeObjectBorderWidth = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    const [object, border, width] = id.split("_");

    if (toolbarCtx.onchangeValue && typeof toolbarCtx.onchangeValue === "function") {
      toolbarCtx.onchangeValue(object as TOOLBAR_CONST_KEY, {
        ...toolbarCtx.selectedOptions?.object,
        style: {
          ...toolbarCtx.selectedOptions?.object.style,
          border: {
            ...toolbarCtx.selectedOptions?.object.style.border,
            width: Number(value),
          },
        },
      });
    }
  };

  /**객체 정렬 설정 */
  const onChangeObjectSorting = (e: MouseEvent<HTMLButtonElement>) => {
    const { id, value } = e.target as HTMLButtonElement;

    const [obj, align, direction] = id.split("_") as [string, Align, Direction];

    if (!align || !direction) return;

    if (align === "horizon") {
      // Left
      if (direction === "left") {
        const directionList = canvasCtx.canvas!.getSelectedAlignDirections();
        console.log(directionList);
      }
      // Right
      else if (direction === "right") {
        const directionList = canvasCtx.canvas!.getSelectedAlignDirections();
        console.log(directionList);
      }
      // Center
      else if (direction === "center") {
        const directionList = canvasCtx.canvas!.getSelectedAlignDirections();
        console.log(directionList);
      }
    } else if (align === "vertical") {
      // Top
      if (direction === "top") {
        const directionList = canvasCtx.canvas!.getSelectedAlignDirections();
        console.log(directionList);
      }
      // Bottom
      else if (direction === "bottom") {
        const directionList = canvasCtx.canvas!.getSelectedAlignDirections();
        console.log(directionList);
      }
      // Center
      else if (direction === "center") {
        const directionList = canvasCtx.canvas!.getSelectedAlignDirections();
        console.log(directionList);
      }
    }
  };

  return <div>ToolbarView</div>;
};

export default ToolbarView;
