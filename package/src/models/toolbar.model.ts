import type { MouseEvent, ChangeEvent } from "react";
import { fabric } from "fabric";

// Types
import type { TOOLBAR_CONST_KEY } from "../shared/enums";
import type { Align, Direction, ObjectVariant } from "../types";
// Helpers
import { Helper } from "../shared/lib/helpers";
// Handlers
import { useCanvasCtxHandler, useToolbarCtxHandler, useVideoCtxHandler } from "../shared/handlers";
// Models
import { TextInteractiveModel } from "../models";

class ToolbarModel {
  videoCtx: ReturnType<typeof useVideoCtxHandler>;
  canvasCtx: ReturnType<typeof useCanvasCtxHandler>;
  toolbarCtx: ReturnType<typeof useToolbarCtxHandler>;

  private _valueHelper: Helper;

  constructor(
    videoCtx: ReturnType<typeof useVideoCtxHandler>,
    canvasCtx: ReturnType<typeof useCanvasCtxHandler>,
    toolbarCtx: ReturnType<typeof useToolbarCtxHandler>
  ) {
    this._valueHelper = new Helper();
    this.videoCtx = videoCtx;
    this.canvasCtx = canvasCtx;
    this.toolbarCtx = toolbarCtx;
  }

  handleChangePixel = (e: MouseEvent<HTMLButtonElement>) => {
    const { id, value } = e.target as HTMLButtonElement;
    if (id !== "pixel" || !value) return;
    const pixel = Number(value);

    this.toolbarCtx.onchangeValue?.(id as TOOLBAR_CONST_KEY, pixel);
    this.canvasCtx.canvas?.updatePixel(pixel);
  };

  handleChangeEditorSize = (e: MouseEvent<HTMLButtonElement>) => {
    const { id, value } = e.target as HTMLButtonElement;
    const [w, h] = value.split("_");
    if (!w || !h) return;
    const width = Number(w);
    const height = Number(h);

    this.toolbarCtx.onchangeValue?.(id as TOOLBAR_CONST_KEY, { w: width, h: height });
    this.canvasCtx.canvas?.updateWh("w", width);
    this.canvasCtx.canvas?.updateWh("h", height);
    this.canvasCtx.canvas?.clearCanvas();
  };

  handleChangeObjectType = (e: MouseEvent<HTMLButtonElement>) => {
    const { id, value } = e.target as HTMLButtonElement;
    this.toolbarCtx.onchangeValue?.(id as TOOLBAR_CONST_KEY, this.toolbarCtx.selectedOptions?.type === "image" ? undefined : value);

    const interactiveText = new TextInteractiveModel("텍스트를 입력", {
      left: this.toolbarCtx.selectedOptions?.object.coord.x,
      top: this.toolbarCtx.selectedOptions?.object.coord.y,
      width: 120,
      height: 320,
      fontSize: this.toolbarCtx.selectedOptions?.font.size || 14,
      fill: this.toolbarCtx.selectedOptions?.font.color,
      fontWeight: this.toolbarCtx.selectedOptions?.font.bold,
      underline: this.toolbarCtx.selectedOptions?.font.underLine,
      fontFamily: this.toolbarCtx.selectedOptions?.font.family,
      backgroundColor: this.toolbarCtx.selectedOptions?.object.style.background,
    });

    const textObject = this.canvasCtx.canvas?.createObjectByType(value as ObjectVariant, "텍스트입력", {
      id: this._valueHelper.getUid(),
      left: this.toolbarCtx.selectedOptions?.object.coord.x,
      top: this.toolbarCtx.selectedOptions?.object.coord.y,
      width: this.toolbarCtx.selectedOptions?.object.size.w,
      height: this.toolbarCtx.selectedOptions?.object.size.h,
      fontSize: this.toolbarCtx.selectedOptions?.font.size || 14,
      fill: this.toolbarCtx.selectedOptions?.font.color,
      fontWeight: this.toolbarCtx.selectedOptions?.font.bold,
      underline: this.toolbarCtx.selectedOptions?.font.underLine,
      fontFamily: this.toolbarCtx.selectedOptions?.font.family,
      backgroundColor: this.toolbarCtx.selectedOptions?.object.style.background,
      selectionBorderColor: this.toolbarCtx.selectedOptions?.object.style.border.color,
    });

    if (textObject) {
      this.canvasCtx.canvas?.add(textObject as fabric.Object);
      this.toolbarCtx.onchangeValue?.(id as TOOLBAR_CONST_KEY, undefined);
    }
  };

  handleChangeFontBold = (e: MouseEvent<HTMLButtonElement>) => {
    if (!this.canvasCtx.canvas) return;
    const { id, value } = e.target as HTMLButtonElement;
    const targetValue = Number(value) === 700 ? 400 : 700;
    if (this.canvasCtx.canvas.selectedObjects) {
      this.checkFunctionAfterExecute(this.toolbarCtx.onchangeObjectFontBold, this.canvasCtx.canvas, targetValue);
    }
    this.checkFunctionAfterExecute(this.toolbarCtx.onchangeValue, id as TOOLBAR_CONST_KEY, { ...this.toolbarCtx.selectedOptions?.font, bold: targetValue });
  };

  handleChangeFontSize = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!this.canvasCtx.canvas) return;
    const { id, value } = e.target;
    const targetValue = Number(value);
    if (this.canvasCtx.canvas.selectedObjects) {
      this.checkFunctionAfterExecute(this.toolbarCtx.onchangeObjectFontSize, this.canvasCtx.canvas, targetValue);
    }
    this.checkFunctionAfterExecute(this.toolbarCtx.onchangeValue, id as TOOLBAR_CONST_KEY, { ...this.toolbarCtx.selectedOptions?.font, size: targetValue });
  };

  handleChangeFontUnderline = (e: MouseEvent<HTMLButtonElement>) => {
    const { id, value } = e.target as HTMLButtonElement;
    const targetValue = Number(value) === 1 ? false : true;
    if (this.canvasCtx.canvas!.selectedObjects) {
      this.checkFunctionAfterExecute(this.toolbarCtx.onchangeObjectFontUnderline, this.canvasCtx.canvas!, targetValue);
    }
    this.checkFunctionAfterExecute(this.toolbarCtx.onchangeValue, id as TOOLBAR_CONST_KEY, {
      ...this.toolbarCtx.selectedOptions?.font,
      underLine: targetValue,
    });
  };

  handleChangeFontAlign = (e: MouseEvent<HTMLButtonElement>) => {
    const { id, value } = e.target as HTMLButtonElement;
    const [font, align] = id.split("_");
    if (!font || !align) return;
    if (this.canvasCtx.canvas!.selectedObjects) {
      this.checkFunctionAfterExecute(this.toolbarCtx.onchangeObjectFontAlign, this.canvasCtx.canvas!, value);
    }
    this.checkFunctionAfterExecute(this.toolbarCtx.onchangeValue, font as TOOLBAR_CONST_KEY, { ...this.toolbarCtx.selectedOptions?.font, color: value });
  };

  handleChangeFontColor = (e: MouseEvent<HTMLButtonElement>) => {
    const { id, value } = e.target as HTMLButtonElement;
    const [font, color] = id.split("_");
    if (!font || !color) return;
    if (this.canvasCtx.canvas!.selectedObjects) {
      this.checkFunctionAfterExecute(this.toolbarCtx.onchangeObjectFontColor, this.canvasCtx.canvas!, value);
    }
    this.checkFunctionAfterExecute(this.toolbarCtx.onchangeValue, font as TOOLBAR_CONST_KEY, { ...this.toolbarCtx.selectedOptions?.font, color: value });
  };

  handleChangeFontColorPicker = (color?: string) => {
    if (!color) return;

    if (this.canvasCtx.canvas!.selectedObjects) {
      this.checkFunctionAfterExecute(this.toolbarCtx.onchangeObjectFontColor, this.canvasCtx.canvas!, color);
    }
    this.checkFunctionAfterExecute(this.toolbarCtx.onchangeValue, "font" as TOOLBAR_CONST_KEY, { ...this.toolbarCtx.selectedOptions?.font, color });
  };

  handleClickObjectWidth = (e: MouseEvent<HTMLButtonElement>) => {
    const { id, value } = e.target as HTMLButtonElement;
    const [object, size, wh, dir] = id.split("_");

    console.log(dir);

    let targetWidth = Number(this.toolbarCtx.selectedOptions?.object.size.w);

    if (dir === "up") {
      targetWidth += 1;
    } else if (dir === "down") {
      targetWidth -= 1;
    }

    console.log(targetWidth);
    if (this.canvasCtx.canvas!.selectedObjects) {
      this.checkFunctionAfterExecute(this.toolbarCtx.onchangeObjectWidth, this.canvasCtx.canvas!, value);
    }
    this.checkFunctionAfterExecute(this.toolbarCtx.onchangeValue, object as TOOLBAR_CONST_KEY, {
      ...this.toolbarCtx.selectedOptions?.object,
      size: { ...this.toolbarCtx.selectedOptions?.object.size, w: targetWidth },
    });
  };

  handleClickObjectHeight = (e: MouseEvent<HTMLButtonElement>) => {
    const { id, value } = e.target as HTMLButtonElement;
    const [object, size, wh, dir] = id.split("_");

    let targetHeight = Number(this.toolbarCtx.selectedOptions?.object.size.h);

    if (dir === "up") {
      targetHeight += 1;
    } else if (dir === "down") {
      targetHeight -= 1;
    }

    if (this.canvasCtx.canvas!.selectedObjects) {
      this.checkFunctionAfterExecute(this.toolbarCtx.onchangeObjectHeight, this.canvasCtx.canvas!, value);
    }
    this.checkFunctionAfterExecute(this.toolbarCtx.onchangeValue, object as TOOLBAR_CONST_KEY, {
      ...this.toolbarCtx.selectedOptions?.object,
      size: { ...this.toolbarCtx.selectedOptions?.object.size, h: targetHeight },
    });
  };

  handleChangeObjectSize = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const [object, size, wh] = id.split("_");
    const targetValue = Number(value);

    // 너비 설정
    if (wh === "w") {
      if (this.canvasCtx.canvas!.selectedObjects) {
        this.checkFunctionAfterExecute(this.toolbarCtx.onchangeObjectWidth, this.canvasCtx.canvas!, value);
      }
      this.checkFunctionAfterExecute(this.toolbarCtx.onchangeValue, object as TOOLBAR_CONST_KEY, {
        ...this.toolbarCtx.selectedOptions?.object,
        size: { ...this.toolbarCtx.selectedOptions?.object.size, w: targetValue },
      });
    } else if (wh === "h") {
      if (this.canvasCtx.canvas!.selectedObjects) {
        this.checkFunctionAfterExecute(this.toolbarCtx.onchangeObjectHeight, this.canvasCtx.canvas!, value);
      }
      this.checkFunctionAfterExecute(this.toolbarCtx.onchangeValue, object as TOOLBAR_CONST_KEY, {
        ...this.toolbarCtx.selectedOptions?.object,
        size: { ...this.toolbarCtx.selectedOptions?.object.size, h: targetValue },
      });
    }
  };

  handleChangeObjectCoord = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const [object, size, coord] = id.split("_");
    const targetValue = Number(value);

    // X좌표
    if (coord === "x") {
      if (this.canvasCtx.canvas!.selectedObjects) {
        this.checkFunctionAfterExecute(this.toolbarCtx.onchangeObjectCoordX, this.canvasCtx.canvas!, targetValue);
      }
      this.checkFunctionAfterExecute(this.toolbarCtx.onchangeValue, object as TOOLBAR_CONST_KEY, {
        ...this.toolbarCtx.selectedOptions?.object,
        coord: { ...this.toolbarCtx.selectedOptions?.object.coord, x: targetValue },
      });
    }
    // Y좌표
    else if (coord === "y") {
      if (this.canvasCtx.canvas!.selectedObjects) {
        this.checkFunctionAfterExecute(this.toolbarCtx.onchangeObjectCoordY, this.canvasCtx.canvas!, targetValue);
      }
      this.checkFunctionAfterExecute(this.toolbarCtx.onchangeValue, object as TOOLBAR_CONST_KEY, {
        ...this.toolbarCtx.selectedOptions?.object,
        coord: { ...this.toolbarCtx.selectedOptions?.object.coord, y: targetValue },
      });
    }
  };

  handleChangeObjectBgColor = (e: MouseEvent<HTMLButtonElement>) => {
    const { id, value } = e.target as HTMLButtonElement;
    const [object, style, background, color] = id.split("_");

    if (this.canvasCtx.canvas!.selectedObjects) {
      this.checkFunctionAfterExecute(this.toolbarCtx.onchangeObjectBackgroundColor, this.canvasCtx.canvas!, color);
    }

    this.checkFunctionAfterExecute(this.toolbarCtx.onchangeValue, object as TOOLBAR_CONST_KEY, {
      ...this.toolbarCtx.selectedOptions?.object,
      style: { ...this.toolbarCtx.selectedOptions?.object.style, background: color },
    });
  };

  handleChangeObjectBgColorPicker = (color?: string) => {
    if (!color) return;

    if (this.canvasCtx.canvas!.selectedObjects) {
      this.checkFunctionAfterExecute(this.toolbarCtx.onchangeObjectFontColor, this.canvasCtx.canvas!, color);
    }
    this.checkFunctionAfterExecute(this.toolbarCtx.onchangeValue, "object" as TOOLBAR_CONST_KEY, {
      ...this.toolbarCtx.selectedOptions?.object,
      style: { ...this.toolbarCtx.selectedOptions?.object.style, background: color },
    });
  };

  handleChangeObjectBorderColor = (e: MouseEvent<HTMLButtonElement>) => {
    const { id, value } = e.target as HTMLButtonElement;
    const [object, style, border, color] = id.split("_");

    if (this.toolbarCtx.onchangeValue && typeof this.toolbarCtx.onchangeValue === "function") {
      this.toolbarCtx.onchangeValue(object as TOOLBAR_CONST_KEY, {
        ...this.toolbarCtx.selectedOptions?.object,
        style: {
          ...this.toolbarCtx.selectedOptions?.object.style,
          border: {
            ...this.toolbarCtx.selectedOptions?.object.style.border,
            color,
          },
        },
      });
    }
  };

  handleChangeObjectBorderStyle = (e: MouseEvent<HTMLButtonElement>) => {
    const { id, value } = e.target as HTMLButtonElement;
    const [object, style, border, borderStyle] = id.split("_");

    if (this.toolbarCtx.onchangeValue && typeof this.toolbarCtx.onchangeValue === "function") {
      this.toolbarCtx.onchangeValue(object as TOOLBAR_CONST_KEY, {
        ...this.toolbarCtx.selectedOptions?.object,
        style: {
          ...this.toolbarCtx.selectedOptions?.object.style,
          border: {
            ...this.toolbarCtx.selectedOptions?.object.style.border,
            style: borderStyle,
          },
        },
      });
    }
  };

  handleChangeObjectBorderWidth = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    const [object, border, width] = id.split("_");

    if (this.toolbarCtx.onchangeValue && typeof this.toolbarCtx.onchangeValue === "function") {
      this.toolbarCtx.onchangeValue(object as TOOLBAR_CONST_KEY, {
        ...this.toolbarCtx.selectedOptions?.object,
        style: {
          ...this.toolbarCtx.selectedOptions?.object.style,
          border: {
            ...this.toolbarCtx.selectedOptions?.object.style.border,
            width: Number(value),
          },
        },
      });
    }
  };

  handleChangeObjectSorting = (e: MouseEvent<HTMLButtonElement>) => {
    const { id, value } = e.target as HTMLButtonElement;

    const [obj, align, direction] = id.split("_") as [string, Align, Direction];

    if (!align || !direction) return;

    if (align === "horizon") {
      // Left
      if (direction === "left") {
        const directionList = this.canvasCtx.canvas!.getSelectedAlignDirections();
        console.log(directionList);
      }
      // Right
      else if (direction === "right") {
        const directionList = this.canvasCtx.canvas!.getSelectedAlignDirections();
        console.log(directionList);
      }
      // Center
      else if (direction === "center") {
        const directionList = this.canvasCtx.canvas!.getSelectedAlignDirections();
        console.log(directionList);
      }
    } else if (align === "vertical") {
      // Top
      if (direction === "top") {
        const directionList = this.canvasCtx.canvas!.getSelectedAlignDirections();
        console.log(directionList);
      }
      // Bottom
      else if (direction === "bottom") {
        const directionList = this.canvasCtx.canvas!.getSelectedAlignDirections();
        console.log(directionList);
      }
      // Center
      else if (direction === "center") {
        const directionList = this.canvasCtx.canvas!.getSelectedAlignDirections();
        console.log(directionList);
      }
    }
  };

  private checkFunctionAfterExecute<T extends (...args: any[]) => void>(func: T | undefined, ...args: Parameters<T>) {
    if (func && typeof func === "function") {
      func(...args);
    }
  }
}

export default ToolbarModel;
