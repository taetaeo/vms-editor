import * as R from "react";
import cn from "classnames";

import { MouseDropDown, InfoBox, Canvas } from "../components/widgets";
import { useCanvasCtxHandler, useEditorCtxHandler, useFormCtxHandler } from "../shared/handlers";

interface Props extends R.HtmlHTMLAttributes<HTMLElement>, R.PropsWithChildren {
  viewClass?: string;
}

const EditorView: R.FC<Props> = ({ className = "vms-editor-canvas-wrapper", viewClass = "", style, children, ...rest }) => {
  const canvasCtx = useCanvasCtxHandler();
  const editorCtx = useEditorCtxHandler();
  const formCtx = useFormCtxHandler();

  return (
    <div className={cn("vms-editor-canvas-wrapper", [className, viewClass])} style={style} {...rest}>
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
