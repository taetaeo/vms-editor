import type { ChangeEvent, MouseEvent } from "react";
import * as R from "react";
import { fabric } from "fabric";

// Types
import type { Align, Direction, ObjectVariant } from "../types";
// Handlers
import { useToolbarCtxHandler, useVideoCtxHandler, useCanvasCtxHandler } from "../shared/handlers";
// Models
import { TextInteractiveModel } from "../models";
// Lib
import { Utils } from "../shared/lib/utils";
// Helpers
import { Helper } from "../shared/lib/helpers";
// Hooks
import { useToggle } from "../shared/hooks";
// Components
import { ColorPicker } from "../components/widgets";
// Enums
import { TOOLBAR_CONST_KEY } from "../shared/enums";

const utils = new Utils();
const valueHelper = new Helper();

interface Props extends R.HtmlHTMLAttributes<HTMLElement>, R.PropsWithChildren {}

const ToolbarView: R.FC<Props> = () => {
  const videoCtx = useVideoCtxHandler();
  const canvasCtx = useCanvasCtxHandler();
  const toolbarCtx = useToolbarCtxHandler();

  const { isOpen: isShowFontColorPicker, onToggle: toggleFontColorPicker } = useToggle();
  const { isOpen: isShowObjColorPicker, onToggle: toggleObjectColorPicker } = useToggle();

  const videoInputRef = R.useRef<HTMLInputElement>(null);

  if (!canvasCtx.canvas) return null;

  const handleChangePixel = (e: MouseEvent<HTMLButtonElement>) => {
    const { id, value } = e.target as HTMLButtonElement;

    if (id !== "pixel" || !value) return; // 에외처리

    const pixel = Number(value);

    if (toolbarCtx.onchangeValue && typeof toolbarCtx.onchangeValue === "function") {
      toolbarCtx.onchangeValue(id as TOOLBAR_CONST_KEY, pixel);
    }

    canvasCtx.canvas!.updatePixel(pixel);
  };

  const handleChangeEditorSize = (e: MouseEvent<HTMLButtonElement>) => {
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
  const handleChangeObjectType = (e: MouseEvent<HTMLButtonElement>) => {
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
      id: valueHelper.getUid(),
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
  const handleChangeFontBold = (e: MouseEvent<HTMLButtonElement>) => {
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
  const handleChangeFontSize = (e: ChangeEvent<HTMLSelectElement>) => {
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
  const handleChangeFontUnderline = (e: MouseEvent<HTMLButtonElement>) => {
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
  const handleChangeFontAlign = (e: MouseEvent<HTMLButtonElement>) => {
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
  const handleChangeFontColor = (e: MouseEvent<HTMLButtonElement>) => {
    const { id, value } = e.target as HTMLButtonElement;

    const [font, color] = id.split("_");

    if (!font || !color) return;

    if (canvasCtx.canvas!.selectedObjects) {
      utils.checkFunctionAfterExecute(toolbarCtx.onchangeObjectFontColor, canvasCtx.canvas!, value);
    }

    utils.checkFunctionAfterExecute(toolbarCtx.onchangeValue, font as TOOLBAR_CONST_KEY, { ...toolbarCtx.selectedOptions?.font, color: value });
  };

  /**객체 사이즈 설정 */
  const handleChangeObjectSize = (e: ChangeEvent<HTMLInputElement>) => {
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
  const handleChangeObjectCoord = (e: ChangeEvent<HTMLInputElement>) => {
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
  const handleChangeObjectBgColor = (e: MouseEvent<HTMLButtonElement>) => {
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
  const handleChangeObjectBorderColor = (e: MouseEvent<HTMLButtonElement>) => {
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
  const handleChangeObjectBorderStyle = (e: MouseEvent<HTMLButtonElement>) => {
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
  const handleChangeObjectBorderWidth = (e: ChangeEvent<HTMLInputElement>) => {
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
  const handleChangeObjectSorting = (e: MouseEvent<HTMLButtonElement>) => {
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

  return (
    <div>
      {/* 객체 추가 버튼 Start */}
      <div className="vms-editor-flx">
        <button id="type" value="textBox" onClick={handleChangeObjectType}>
          텍스트 추가하기
        </button>
        <button id="type" value="image" onClick={handleChangeObjectType}>
          이미지 추가하기
        </button>
        <button id="type" value="video" onClick={handleChangeObjectType}>
          동영상 추가하기
        </button>
      </div>
      {/* 객체 추가 버튼 End */}

      {/* 텍스트 스타일 Start */}
      <div className="vms-editor-flx">
        <button id="font_bold" value={toolbarCtx.selectedOptions?.font.bold} onClick={handleChangeFontBold}>
          굵기
        </button>
        <button id="font_underline" value={Number(toolbarCtx.selectedOptions?.font.underLine)} onClick={handleChangeFontUnderline}>
          밑줄
        </button>
        <select id="font_size" value={toolbarCtx.selectedOptions?.font.size} onChange={handleChangeFontSize}>
          {Object.values(toolbarCtx.toolbarUiConfig?.fontSizes || []).map((fontSize, index) => (
            <option key={`${fontSize}-${index}`} value={fontSize}>
              {fontSize ? fontSize : 0}
            </option>
          ))}
        </select>
      </div>
      {/* 텍스트 스타일 End */}

      {/* 정렬 스타일 Start*/}
      <div className="vms-editor-flx">
        <button id="font_align" value="left" onClick={handleChangeFontAlign}>
          왼쪽 정렬
        </button>
        <button id="font_align" value="center" onClick={handleChangeFontAlign}>
          가운데 정렬
        </button>
        <button id="font_align" value="right" onClick={handleChangeFontAlign}>
          오른쪽 정렬
        </button>
      </div>
      {/* 정렬 스타일 End */}

      {/* 텍스트 색상 설정 Start */}
      <div className="vms-editor-flx">
        {Object.values(toolbarCtx.toolbarUiConfig?.colors || []).map((color, index) => {
          // [더보기] x
          if (color !== "more") {
            return (
              <button key={`font_color-${index}`} id={`font_${color}`} value={color} onClick={handleChangeFontColor}>
                {color}
              </button>
            );
          }
          // [더보기] o
          else {
            return (
              <button key={`font_color_${index}`} onClick={toggleFontColorPicker}>
                더보기
              </button>
            );
          }
        })}
      </div>

      {/* 텍스트 색상 설정 End */}

      {/* 객체 사이즈 설정 Start */}
      <div className="vms-editor-flx">
        <label htmlFor="object_size_w">
          너비
          <input
            type="number"
            name="object_size_w"
            id="object_size_w"
            value={Number(toolbarCtx.selectedOptions?.object.size.w)}
            onChange={handleChangeObjectSize}
            min={0} // 최소값 설정
            max={2000} // 최대값 설정
            step={1} // 단계 설정
          />
          <span>{toolbarCtx.selectedOptions?.object.size.w + " px"}</span>
        </label>

        <label htmlFor="object_size_h">
          높이
          <input
            type="number"
            name="object_size_h"
            id="object_size_h"
            value={Number(toolbarCtx.selectedOptions?.object.size.h)}
            onChange={handleChangeObjectSize}
            min={0} // 최소값 설정
            max={2000} // 최대값 설정
            step={1} // 단계 설정
          />
          <span>{toolbarCtx.selectedOptions?.object.size.h + " px"}</span>
        </label>
      </div>
      {/* 객체 사이즈 설정 End */}

      {/* 객체 이동 설정 Start*/}
      <div className="vms-editor-flx">
        <label htmlFor="object_coord_x">
          수평 이동
          <input
            type="number"
            name="object_coord_x"
            id="object_coord_x"
            value={Number(toolbarCtx.selectedOptions?.object.coord.x)}
            onChange={handleChangeObjectCoord}
            min={0} // 최소값 설정
            max={2000} // 최대값 설정
            step={1} // 단계 설정
          />
          <span>{toolbarCtx.selectedOptions?.object.coord.x + " px"}</span>
        </label>

        <label htmlFor="object_coord_y">
          수직 이동
          <input
            type="range"
            name="object_coord_y"
            id="object_coord_y"
            value={Number(toolbarCtx.selectedOptions?.object.coord.y)}
            onChange={handleChangeObjectCoord}
            min={0} // 최소값 설정
            max={2000} // 최대값 설정
            step={1} // 단계 설정
          />
          <span>{toolbarCtx.selectedOptions?.object.coord.y + " px"}</span>
        </label>
      </div>
      {/* 객체 이동 설정 End*/}

      {/* 객체 채우기 - 색상  Start*/}
      <div className="vms-editor-flx">
        {Object.values(toolbarCtx.toolbarUiConfig?.colors || []).map((color, index) => {
          // [더보기] x
          if (color !== "more") {
            return (
              <button key={`bg_color_${index}`} id={`object_style_background_${color}`} value={color} onClick={handleChangeObjectBgColor}>
                {color}
              </button>
            );
          }
          // [더보기] o
          else {
            return (
              <button key={`font_color_${index}`} onClick={toggleObjectColorPicker}>
                더보기
              </button>
            );
          }
        })}
      </div>
      {/* 객체 채우기 - 색상  End*/}

      {/* 객체 테두리 - 색상 Start */}
      <div className="vms-editor-flx">
        {Object.values(toolbarCtx.toolbarUiConfig?.colors || []).map((color, index) => {
          return (
            <button key={`border_color_${index}`} id={`object_style_border_${color}`} value={color} onClick={handleChangeObjectBorderColor}>
              {color}
            </button>
          );
        })}
      </div>

      <div className="vms-editor-flx">
        {Object.values(toolbarCtx.toolbarUiConfig?.borders || []).map((border, index) => {
          return (
            <button key={`border_style_${index}`} id={`object_style_border_${border}`} onClick={handleChangeObjectBorderStyle}>
              {border}
            </button>
          );
        })}
      </div>
      {/* 객체 테두리 - 색상 End */}

      {/* 객체 테두리 - 두께 Start */}
      <div className="vms-editor-flx">
        <label htmlFor="">
          설정
          <input
            type="number"
            name="object_border_width"
            id="object_border_width"
            inputMode="numeric"
            value={toolbarCtx.selectedOptions?.object.style.border.width || 1}
            min={0}
            max={10}
            onChange={handleChangeObjectBorderWidth}
          />
          <span>{toolbarCtx.selectedOptions?.object.style.border.width + " px"}</span>
        </label>
      </div>
      {/* 객체 테두리 - 두께 End */}

      {/* 객체 정렬 Start */}
      <div className="vms-editor-flx">
        <button id="object_horizon_left" value="left" onClick={handleChangeObjectSorting}>
          수평 왼쪽 정렬
        </button>
        <button id="object_horizon_right" value="right" onClick={handleChangeObjectSorting}>
          수평 오른쪽 정렬
        </button>
        <button id="object_horizon_center" value="center" onClick={handleChangeObjectSorting}>
          수평 가운데 정렬
        </button>
        <button id="object_vertical_top" value="top" onClick={handleChangeObjectSorting}>
          수직 위 정렬
        </button>
        <button id="object_vertical_bottom" value="bottom" onClick={handleChangeObjectSorting}>
          수직 아래 정렬
        </button>
        <button id="object_vertical_center" value="center" onClick={handleChangeObjectSorting}>
          수직 가운데 정렬
        </button>
      </div>
      {/* 객체 정렬 End */}

      {/* {isShowFontColorPicker && (
        <ColorPicker type="chrome" initialColor={toolbarCtx.selectedOptions?.font.color!} onColorChange={handleChangeFontColorPicker} />
      )}

      {isShowObjColorPicker && (
        <ColorPicker type="chrome" initialColor={toolbarCtx.selectedOptions?.object.style.background!} onColorChange={handleChangeObjectBgColorPicker} />
      )} */}

      <video ref={videoCtx.videoRef} style={{ display: "none" }} />
    </div>
  );
};

export default ToolbarView;
