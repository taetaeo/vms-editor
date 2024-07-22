import * as R from "react";

import { classNames as cn } from "../shared/lib/utils";
import { useCanvasCtxHandler, useEditorCtxHandler, useFormCtxHandler } from "../shared/handlers";
import { MouseDropDown, InfoBox } from "../components/widgets";
import { Canvas } from "../components/ui";

interface Props extends R.HtmlHTMLAttributes<HTMLElement>, R.PropsWithChildren {
  viewClass?: string;
}

const EditorView: R.FC<Props> = ({ id = "", className = "vms-editor-canvas-wrap", viewClass = "", style, children, ...rest }) => {
  const canvasCtx = useCanvasCtxHandler();
  const editorCtx = useEditorCtxHandler();
  const formCtx = useFormCtxHandler();

  return (
    <div id="canvas-container" className={cn(className, viewClass)} style={style} {...rest}>
      <MouseDropDown
        isVisible={canvasCtx.eventObject?.menuVisible}
        positionX={canvasCtx.eventObject?.menuPosition.x}
        positionY={canvasCtx.eventObject?.menuPosition.y}
      />

      <InfoBox selectedData={formCtx.selectedData || undefined} />

      <Canvas id="fabric-canvas" ref={editorCtx.canvasRef!} />
    </div>
  );
};

export default EditorView;
