import { useEffect, useRef } from "react";
// Configs
import { ObjectConfigs, canvasConfigs } from "@/configs";
// Context
import { useCanvasContext, useFormContext, useImageSelectorContext, useToolbarContext } from "@/functions";
// Lib
import { Utils } from "@/lib";
// Models
import { CanvasModel, ImageModel, TextBoxModel } from "@/models";
// Types
import { CanvasModelType } from "@/types";

type EditorControllerProps = {
  editorConfigs?: ObjectConfigs;
};

const utils = new Utils();
export default function useEditorController({ editorConfigs }: EditorControllerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { canvas, onchange, setCanvas } = useCanvasContext();
  const { vmsFormObjectList } = useFormContext();
  const { src } = useImageSelectorContext();
  const { callbackFn } = useToolbarContext();

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvasModel = new CanvasModel({
      current: canvasRef.current,
      configs: canvasConfigs.lg,
      selectedUpdatedFn: callbackFn as <T>(objects: T) => void,
    });

    if (!canvasModel) return;

    canvasModel.getCanvasContext();

    canvasModel.updateEditorConfig(editorConfigs);

    onchange?.addKeydownEventListener(canvasModel as CanvasModelType);

    setCanvas(canvasModel as CanvasModelType);
    return () => {
      if (canvas) {
        onchange?.removeKeydownEventListener(canvas);
        canvas.clearCanvas();
        setCanvas(null);
      }
    };
  }, [canvasRef]);

  /** 패칭된 데이터를 Canvas에 적용 */
  useEffect(() => {
    if (vmsFormObjectList && canvas) {
      vmsFormObjectList.map((data, _) => {
        console.log("패칭", data);
        if (data._kind === "txt") {
          const objectModel = canvas.createObjectByType("textBox", data.style.dsplTxt || "", {
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
            .onLoadImageFromUrl(`data:image/png;base64,${data.style.pictData}`)
            ?.then((image) => {
              const imageModel = new ImageModel(`data:image/png;base64,${data.style.pictData}`, {
                objectId: data._id, // 아이디
                image: image as fabric.Image, // Image 객체
                width: data.w, // 너비
                height: data.h, // 높이
                left: data.coordX, // X축
                top: data.coordY, // Y축
                options: data.style,
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
//   useEffect(() => {
//     console.log("변경된 데이터", canvas?.selectedObjects);
//     if (!canvas || !canvas.selectedObjects || canvas.selectedObjects.length === 0) return;
//     const [object, ...rest] = canvas.selectedObjects!;

//     if (!vmsFormObjectList?.length) return;
//     const foundObject = vmsFormObjectList.find((formObject) => formObject._id === (object as any)?.objectId);
//   }, [canvas?.selectedObjects]);

//     useEffect(() => {
//     if (!canvas || utils.isEmptyObject(data.selectedData)) return;

//     const { selectedData } = data;

//     // 선택한 데이터의 아이디와 일치하는 경우에 대해서 필터
//     const targetObject = canvas.getAllObjects().filter((object: AnyObjectType<any>, _) => object.id === selectedData?._id);

//     // 필터된 데이터를 새롭게 활성상태로 변경뒤 랜더링
//     canvas.onChangeActive(targetObject[0] as AnyModelType);

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [data]);

//   useEffect(() => {
//     if (!canvas || utils.isEmptyObject(selectedData)) return;

//     // 선택한 데이터의 아이디와 일치하는 경우에 대해서 필터
//     const targetObject = canvas.getAllObjects().filter((object: AnyObjectType<any>, _) => object.id === selectedData?._id);

//     // 필터된 데이터를 새롭게 활성상태로 변경뒤 랜더링
//     canvas.onChangeActive(targetObject[0] as AnyModelType);
//   }, [selectedData]);
