import { fabric } from "fabric";
import { useEffect, useRef } from "react";

// Lib
import { Utils } from "../shared/lib/utils";
// Configs
import { ObjectConfigs } from "../configs";
// Types
import type { CanvasModelType } from "../types";
// Models
import { CanvasModel, ImageModel, TextBoxModel } from "../models";
//
import LineLayoutModel from "../models/line-layout.model";
// Handler
import { useCanvasCtxHandler, useFormCtxHandler, useImageCtxHandler, useToolbarCtxHandler, useVmsTabCtxHandler } from "../shared/handlers";

type EditorControllerProps = { editorConfigs?: ObjectConfigs };

const utils = new Utils();

export default function useEditorController({ editorConfigs }: EditorControllerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const canvasCtx = useCanvasCtxHandler();
  const vmsTabCtx = useVmsTabCtxHandler();
  const vmsFormCtx = useFormCtxHandler();
  const imageCtx = useImageCtxHandler();
  const toolbarCtx = useToolbarCtxHandler();

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvasModel = new CanvasModel({
      current: canvasRef.current,
      configs: {
        backgroundColor: "transparent",
        width: toolbarCtx.selectedOptions?.editorSize.w || 500,
        height: toolbarCtx.selectedOptions?.editorSize.h || 500,
      },
      selectedUpdatedFn: toolbarCtx.callbackFn as <T>(objects: T) => void,
    });

    if (!canvasModel) return;

    canvasModel.getCanvasContext();

    canvasModel.updateEditorConfig(editorConfigs);

    // canvasModel.drawBackground();

    canvasCtx.onchange?.addKeydownEventListener(canvasModel as CanvasModelType);
    canvasCtx.onchange?.addMouseEventListener(canvasModel as CanvasModelType);
    canvasCtx.onchange?.addMouseContextMenuEventListener(canvasModel as CanvasModelType);
    const gridSize = 5;

    const { width, height } = canvasModel;
    const pixel = toolbarCtx.selectedOptions?.pixel || 16;

    for (let sw = 1; sw < width!; sw++) {
      // 가로 줄
      if (sw % 2 === 0) {
        canvasModel.add(new fabric.Text(String(sw * pixel), { left: pixel * sw, top: 0, fill: "#fff", fontSize: 8, selectable: false }));
      }

      const ddd = new LineLayoutModel(
        {
          // x1, y1: 선의 시작점의 x좌표와 y좌표.
          // x2, y2: 선의 끝점의 x좌표와 y좌표.
          start: { x1: 0, y1: 10 * sw },
          end: { x2: width!, y2: 10 * sw },
        },
        {
          // Options
          strokeWidth: 0.1,
          strokeDashArray: [0.5, 0.5],
        }
      );

      canvasModel.add(
        new fabric.Line([0, 10 * sw, width!, 10 * sw], {
          stroke: "#fff",
          strokeWidth: 0.1,
          selectable: false,
          strokeDashArray: [0.5, 0.5],
          excludeFromExport: false, // When `true`, object is not exported in OBJECT/JSON
        })
      );
      canvasModel.add(
        new fabric.Line([0, pixel * sw, width!, pixel * sw], {
          stroke: "#fff",
          strokeWidth: 1,
          selectable: false,
          strokeDashArray: [1, 1],
          excludeFromExport: false, // When `true`, object is not exported in OBJECT/JSON
        })
      );
    }

    for (let sh = 1; sh < height!; sh++) {
      //  세로 줄
      if (sh % 2 === 0) {
        canvasModel.add(new fabric.Text(String(sh * pixel), { left: 0, top: pixel * sh, fill: "#fff", fontSize: 8, selectable: false }));
      }
      canvasModel.add(
        new fabric.Line([10 * sh, 0, 10 * sh, height!], {
          stroke: "#fff",
          strokeWidth: 0.1,
          selectable: false,
          strokeDashArray: [0.5, 0.5],
          excludeFromExport: false, // When `true`, object is not exported in OBJECT/JSON
        })
      );
      canvasModel.add(
        new fabric.Line([pixel * sh, 0, pixel * sh, height!], {
          stroke: "#fff",
          strokeWidth: 1,
          selectable: false,
          strokeDashArray: [1, 1],
          excludeFromExport: false, // When `true`, object is not exported in OBJECT/JSON
        })
      );
    }

    canvasCtx.setCanvas(canvasModel as CanvasModelType);
    return () => {
      if (canvasCtx.canvas) {
        canvasCtx.onchange?.removeKeydownEventListener(canvasCtx.canvas);
        canvasCtx.onchange?.removeMouseEventListener(canvasCtx.canvas);
        canvasCtx.onchange?.removeMouseContextMenuEventListener(canvasCtx.canvas);
        canvasCtx.setCanvas(null);
      }
    };
  }, [vmsTabCtx.tab, canvasRef, toolbarCtx.selectedOptions?.editorSize]);

  /** 패칭된 데이터를 Canvas에 적용 */
  useEffect(() => {
    if (vmsFormCtx.vmsFormObjectList && canvasCtx.canvas) {
      const canvasWidth = canvasCtx.canvas.getWidth();
      const canvasHeight = canvasCtx.canvas.getHeight();

      vmsFormCtx.vmsFormObjectList.map((data, _) => {
        if (data._kind === "txt") {
          const objectModel = canvasCtx.canvas?.createObjectByType("textBox", data.style.dsplTxt || "", {
            id: data._id,
            width: data.w,
            height: data.h,
            fill: data.style.fontClr,
            left: data.coordX > canvasWidth! ? 0 : data.coordX,
            top: data.coordY > canvasHeight! ? 0 : data.coordY,
            fontSize: data.style.fontSz,
          });

          canvasCtx.canvas?.add(objectModel as TextBoxModel);
        } else if (data._kind === "pict") {
          utils
            .onLoadImageFromUrl(`data:image/png;base64,${data.style.pictData}`)
            ?.then((image) => {
              const imageModel = new ImageModel(`data:image/png;base64,${data.style.pictData}`, {
                objectId: data._id, // 아이디
                image: image as fabric.Image, // Image 객체
                width: data.w, // 너비
                height: data.h, // 높이
                left: data.coordX > canvasWidth! ? 0 : data.coordX,
                top: data.coordY > canvasHeight! ? 0 : data.coordY,
                options: data.style,
              });

              canvasCtx.canvas?.add(imageModel);
            })
            .catch((error) => {
              console.error("Error loading image: ", error);
            })
            .finally(() => {
              // canvas.requestRenderAll();
            });
        }
      });

      canvasCtx.setCanvas(canvasCtx.canvas);
      canvasCtx.canvas.renderAll();
    }
  }, [canvasCtx.canvas, canvasCtx.setCanvas, vmsFormCtx.vmsFormObjectList]);

  return { canvasRef };
}
