import { useEffect, useRef } from "react";
// Configs
import { type ObjectConfigs, canvasConfigs } from "../configs";
// Context
import { useCanvasContext, useFormContext, useToolbarContext } from "../functions";
// Models
import { CanvasModel, ImageModel, TextBoxModel } from "../models";
import { CanvasModelType } from "../types";
import { Utils } from "../lib";

type EditorControllerProps = {
  editorConfigs?: ObjectConfigs;
};

const utils = new Utils();
export default function useEditorController({ editorConfigs }: EditorControllerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { canvas, onchange, setCanvas } = useCanvasContext();
  const { vmsFormObjectList } = useFormContext();
  const { callbackFn } = useToolbarContext();

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!canvas) return;
    onchange?.keyDown(canvas, event);
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvasModel = new CanvasModel({
      current: canvasRef.current,
      configs: canvasConfigs.lg,
      selectedUpdatedFn: callbackFn as <T>(objects: T) => void,
    });

    if (!canvasModel) return;

    canvasModel.getCanvasContext();

    canvasModel.onSettingConfig(editorConfigs);

    onchange?.addKeydownEventListener(canvasModel as CanvasModelType);

    setCanvas(canvasModel as CanvasModelType);
    return () => {
      if (canvas) {
        onchange?.removeKeydownEventListener(canvas);
        canvas.onDismissCanvas();
        setCanvas(null);
      }
    };
  }, [canvasRef]);

  useEffect(() => {
    if (vmsFormObjectList && canvas) {
      vmsFormObjectList.map((data, _) => {
        if (data._kind === "txt") {
          const objectModel = canvas.onCreateObject("textBox", data.style.dsplTxt || "", {
            id: data._id,
            width: data.w,
            height: data.h,
            fill: data.style.fontClr,
            left: data.coordX,
            top: data.coordY,
            fontSize: data.style.fontSz,
          });
          canvas.add(objectModel as TextBoxModel);
        } else if (data._kind === "pict") {
          utils
            .createImageFromUrl(`data:image/png;base64,${data.style.pictData}`)
            ?.then((image) => {
              const imageModel = new ImageModel(`data:image/png;base64,${data.style.pictData}`, {
                objectId: data._id,
                image: image as fabric.Image,
                width: data.w,
                height: data.h,
                left: data.coordX,
                top: data.coordY,
                ...data.style,
              });

              canvas.add(imageModel);
            })
            .catch((error) => {
              console.error("Error loading image: ", error);
            })
            .finally(() => {
              canvas.requestRenderAll();
            });
        }
      });

      setCanvas(canvas);
      canvas.renderAll();
    }
  }, [canvas, setCanvas, vmsFormObjectList]);

  return {
    canvasRef,
  };
}
