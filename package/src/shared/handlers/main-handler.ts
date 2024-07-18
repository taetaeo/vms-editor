import * as R from "react";
import useVideoCtxHandler from "./useVideoContext.handler";
import useToolbarCtxHandler from "./useToolbarContext.handler";
import useImageCtxHandler from "./useImageContext.handler";
import useFormCtxHandler from "./useFormContext.handler";
import useCanvasCtxHandler from "./useCanvasContext.handler";
import useEditorCtxHandler from "./useEditorContext.handler";

export default function useVmsContextHandler() {
  const videoCtx = useVideoCtxHandler();
  const toolbarCtx = useToolbarCtxHandler();
  const imageCtx = useImageCtxHandler();
  const formCtx = useFormCtxHandler();
  const editorCtx = useEditorCtxHandler();
  const canvasCtx = useCanvasCtxHandler();

  return {
    videoCtx,
    toolbarCtx,
    imageCtx,
    formCtx,
    editorCtx,
    canvasCtx,
  };
}
